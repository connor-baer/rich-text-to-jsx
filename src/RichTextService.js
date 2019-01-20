/* eslint-disable no-use-before-define */
import React from 'react';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

import cx from './lib/cx';
import get from './lib/get';
import isEmpty from './lib/is-empty';

const defaultOptions = {
  blocks: {},
  inlines: {},
  createElement: React.createElement
};

const blockElements = {
  [BLOCKS.EMBEDDED_ENTRY]: true
};

const inlineElements = {
  [INLINES.ASSET_HYPERLINK]: true,
  [INLINES.ENTRY_HYPERLINK]: true,
  [INLINES.EMBEDDED_ENTRY]: true
};

const tagMap = {
  [BLOCKS.PARAGRAPH]: 'p',
  [BLOCKS.HEADING_1]: 'h1',
  [BLOCKS.HEADING_2]: 'h2',
  [BLOCKS.HEADING_3]: 'h3',
  [BLOCKS.HEADING_4]: 'h4',
  [BLOCKS.HEADING_5]: 'h5',
  [BLOCKS.HEADING_6]: 'h6',
  [BLOCKS.UL_LIST]: 'ul',
  [BLOCKS.OL_LIST]: 'ol',
  [BLOCKS.LIST_ITEM]: 'li',
  [BLOCKS.QUOTE]: 'blockquote',
  [BLOCKS.HR]: 'hr',
  [INLINES.HYPERLINK]: 'a',
  [MARKS.BOLD]: 'strong',
  [MARKS.ITALIC]: 'em',
  [MARKS.UNDERLINE]: 'u',
  [MARKS.CODE]: 'code'
};

function getOverride(type, overrides) {
  const tag = tagMap[type];
  return overrides[tag] || overrides[type];
}

function getTag(type, overrides) {
  const override = getOverride(type, overrides);

  if (override) {
    return typeof override === 'function' ? override : override.component;
  }

  return tagMap[type];
}

function getProps(type, overrides, data = {}) {
  const override = getOverride(type, overrides);

  if (!override || override === 'function') {
    return data;
  }

  const overrideProps = override.props || {};
  return {
    ...overrideProps,
    ...data,
    className: cx(data.className, overrideProps.className) || undefined
  };
}

function DefaultBlock(props) {
  console.log(props);
  return (
    <div style={{ color: 'white', backgroundColor: 'red' }}>
      No custom component defined.
    </div>
  );
}

function DefaultInline(props) {
  console.log(props);
  return (
    <span style={{ color: 'white', backgroundColor: 'red' }}>
      No custom component defined.
    </span>
  );
}

export default function richTextToJsx(doc, options = {}) {
  return nodeListToJsx(doc.content, { ...defaultOptions, ...options });
}

function nodeListToJsx(nodes, options) {
  return nodes.map((node, key) => nodeToJsx(node, options, key));
}

function nodeToJsx(node = {}, options, key) {
  const { nodeType, data = {}, value, content, marks } = node;
  const { createElement, blocks, inlines } = options;

  if (!nodeType) {
    // TODO: Figure out what to return when passed an unrecognized node type.
    return '';
  }

  const isTextElement = nodeType === 'text';

  if (isTextElement) {
    if (isEmpty(marks)) {
      return value;
    }

    return marks.reduce((children, mark, markKey) => {
      const tag = getTag(mark.type, inlines);

      if (!tag) {
        return children;
      }

      const props = getProps(mark.type, inlines, {
        ...data,
        key: `${key}${markKey}`
      });
      return createElement(tag, props, children);
    }, value);
  }

  const isBlockElement = blockElements[nodeType];
  const isInlineElement = inlineElements[nodeType];
  const isCustomElement = isBlockElement || isInlineElement;

  if (isCustomElement) {
    const { fields, sys } = data.target;
    const contentType = get(sys, 'contentType.sys.id');
    const overrides = isBlockElement ? blocks : inlines;
    const DefaultElement = isBlockElement ? DefaultBlock : DefaultInline;
    const tag = getTag(contentType, overrides) || DefaultElement;
    const props = getProps(contentType, blocks, { ...fields, sys, key });
    return createElement(tag, props, content);
  }

  const tag = getTag(nodeType, blocks) || DefaultBlock;
  const { uri: href, ...rest } = data;
  const props = getProps(nodeType, blocks, { ...rest, href });
  return createElement(tag, { ...props, key }, nodeListToJsx(content, options));
}

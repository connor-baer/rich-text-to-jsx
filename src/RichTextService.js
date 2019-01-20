/* eslint-disable no-use-before-define */
import React from 'react';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

import cx from './lib/cx';
import get from './lib/get';
import isEmpty from './lib/is-empty';

import UnknownElement from './components/UnknownElement';
import BlockElement from './components/BlockElement';
import InlineElement from './components/InlineElement';

export const defaultOptions = {
  blocks: {},
  inlines: {},
  createElement: React.createElement
};

const blockCustomNodes = {
  [BLOCKS.EMBEDDED_ENTRY]: true
};

const inlineCustomNodes = {
  [INLINES.ASSET_HYPERLINK]: true,
  [INLINES.ENTRY_HYPERLINK]: true,
  [INLINES.EMBEDDED_ENTRY]: true
};

const tagMap = {
  [BLOCKS.HEADING_1]: 'h1',
  [BLOCKS.HEADING_2]: 'h2',
  [BLOCKS.HEADING_3]: 'h3',
  [BLOCKS.HEADING_4]: 'h4',
  [BLOCKS.HEADING_5]: 'h5',
  [BLOCKS.HEADING_6]: 'h6',
  [BLOCKS.PARAGRAPH]: 'p',
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

function getElement(type, overrides) {
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
    type,
    className: cx(data.className, overrideProps.className)
  };
}

function getFields(data) {
  return get(data, 'target.fields');
}

function getSys(data) {
  return get(data, 'target.sys');
}
function getContentType(data) {
  return get(data, 'target.contentType');
}

export default function richTextToJsx(doc, options = {}) {
  if (!doc) {
    return null;
  }
  return nodeListToJsx(doc.content, { ...defaultOptions, ...options });
}

export function nodeListToJsx(nodes, options) {
  if (isEmpty(nodes)) {
    return null;
  }
  return nodes.map((node, key) => nodeToJsx(node, options, key));
}

export function nodeToJsx(node = {}, options = {}, key) {
  const { nodeType } = node;

  if (!nodeType) {
    return unknownNodeToJsx(node, options, key);
  }

  const isTextNode = nodeType === 'text';

  if (isTextNode) {
    return textNodeToJsx(node, options, key);
  }

  const isCustomBlockNode = blockCustomNodes[nodeType];
  const isCustomInlineNode = inlineCustomNodes[nodeType];
  const isCustomNode = isCustomBlockNode || isCustomInlineNode;

  if (isCustomNode) {
    return customNodeToJsx(node, options, key, isCustomBlockNode);
  }

  return parentNodeToJsx(node, options, key);
}

export function unknownNodeToJsx(node, options, key) {
  const { data, content } = node;
  const { blocks, inlines, createElement } = options;
  const fields = getFields(data);
  const sys = getSys(data);
  const contentType = getContentType(data);
  const props = getProps(
    contentType,
    { ...blocks, ...inlines },
    { ...fields, sys, key }
  );
  return createElement(UnknownElement, props, content);
}

export function textNodeToJsx(node, options, key) {
  const { data = {}, value, marks } = node;
  const { createElement, inlines } = options;

  if (isEmpty(marks)) {
    return value;
  }

  return marks.reduce((children, mark, markKey) => {
    const tag = getElement(mark.type, inlines);

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

export function customNodeToJsx(node, options, key, isBlockNode) {
  const { data, content } = node;
  const { blocks, inlines, createElement } = options;

  const contentType = getContentType(data);

  const overrides = isBlockNode ? blocks : inlines;
  const DefaultElement = isBlockNode ? BlockElement : InlineElement;
  const tag = getElement(contentType, overrides) || DefaultElement;
  const props = getProps(contentType, blocks, { ...data.target, key });

  const children = isEmpty(content)
    ? undefined
    : nodeListToJsx(content, options);

  return createElement(tag, props, children);
}

export function parentNodeToJsx(node, options, key) {
  const { data, content, nodeType } = node;
  const { blocks, createElement } = options;

  const tag = getElement(nodeType, blocks) || BlockElement;
  const { uri: href, ...rest } = data;
  const props = getProps(nodeType, blocks, { ...rest, href });

  const children = isEmpty(content)
    ? undefined
    : nodeListToJsx(content, options);

  return createElement(tag, { ...props, key }, children);
}

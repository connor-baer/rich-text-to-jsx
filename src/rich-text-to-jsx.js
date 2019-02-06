/* eslint-disable no-use-before-define */
import React from 'react';
import { BLOCKS, INLINES, MARKS, helpers } from '@contentful/rich-text-types';

import cx from './lib/cx';
import get from './lib/get';
import isEmpty from './lib/is-empty';

import UnknownElement from './components/UnknownElement';
import BlockElement from './components/BlockElement';
import InlineElement from './components/InlineElement';
import AssetLink from './components/AssetLink';
import Image from './components/Image';
import Video from './components/Video';
import Audio from './components/Audio';

export const defaultOptions = {
  overrides: {},
  createElement: React.createElement
};

const assetElementMap = {
  image: Image,
  video: Video,
  audio: Audio
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

const entryMap = {
  [BLOCKS.EMBEDDED_ENTRY]: true,
  [INLINES.ENTRY_HYPERLINK]: true,
  [INLINES.EMBEDDED_ENTRY]: true
};

const assetMap = {
  [BLOCKS.EMBEDDED_ASSET]: true,
  [INLINES.ASSET_HYPERLINK]: true
};

function isEntryNode(node) {
  return entryMap[node.nodeType];
}

function isAssetNode(node) {
  return assetMap[node.nodeType];
}

export default function richTextToJsx(richText, options = {}) {
  if (!richText) {
    return null;
  }
  return nodeListToJsx(richText.content, { ...defaultOptions, ...options });
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

  if (helpers.isText(node)) {
    return textNodeToJsx(node, options, key);
  }

  if (isEntryNode(node)) {
    return entryNodeToJsx(node, options, key);
  }

  if (isAssetNode(node)) {
    return assetNodeToJsx(node, options, key);
  }

  return parentNodeToJsx(node, options, key);
}

export function unknownNodeToJsx(node, options, key) {
  const { data, content } = node;
  const { createElement } = options;
  const props = { ...data.target, key };

  const children = isEmpty(content)
    ? undefined
    : nodeListToJsx(content, options);

  return createElement(UnknownElement, props, children);
}

export function textNodeToJsx(node, options, key) {
  const { data = {}, value, marks } = node;
  const { overrides, createElement } = options;

  if (isEmpty(marks)) {
    return value;
  }

  return marks.reduce((children, mark, markKey) => {
    const element = getElement(mark.type, overrides);

    if (!element) {
      return children;
    }

    const props = getProps(mark.type, overrides, {
      ...data,
      key: `${key}${markKey}`
    });
    return createElement(element, props, children);
  }, value);
}

export function entryNodeToJsx(node, options, key) {
  const { data, content, nodeType } = node;
  const { overrides, createElement } = options;

  const contentType = get(data, 'target.contentType');

  if (!contentType) {
    return unknownNodeToJsx(node, options, key);
  }

  const elementOverrides = overrides[nodeType];

  const DefaultElement = helpers.isBlock(node) ? BlockElement : InlineElement;
  const element = getElement(contentType, elementOverrides) || DefaultElement;

  const props = getProps(nodeType, elementOverrides, {
    ...data.target,
    key
  });

  const children = isEmpty(content)
    ? undefined
    : nodeListToJsx(content, options);

  return createElement(element, props, children);
}

export function assetNodeToJsx(node, options, key) {
  const { data, content, nodeType } = node;
  const { overrides, createElement } = options;

  const mimeTypeGroup = get(data, 'target.file.contentType', '').split('/')[0];

  if (!mimeTypeGroup) {
    return unknownNodeToJsx(node, options, key);
  }

  const elementOverrides = overrides[nodeType];

  const BlockAsset = assetElementMap[mimeTypeGroup];
  const DefaultAsset = helpers.isBlock(node) ? BlockAsset : AssetLink;

  const element = getElement(mimeTypeGroup, elementOverrides) || DefaultAsset;

  if (!element) {
    return unknownNodeToJsx(node, options, key);
  }

  const props = getProps(nodeType, elementOverrides, {
    ...data.target,
    key
  });

  const children = isEmpty(content)
    ? undefined
    : nodeListToJsx(content, options);

  return createElement(element, props, children);
}

export function parentNodeToJsx(node, options, key) {
  const { data, content, nodeType } = node;
  const { overrides, createElement } = options;

  const element = getElement(nodeType, overrides) || BlockElement;

  const { uri: href, ...rest } = data;
  const props = getProps(nodeType, overrides, { ...rest, href, key });

  const children = isEmpty(content)
    ? undefined
    : nodeListToJsx(content, options);

  return createElement(element, props, children);
}

export function getElement(type, overrides) {
  const override = getOverride(type, overrides);

  if (override) {
    return typeof override === 'function' ? override : override.component;
  }

  return tagMap[type];
}

export function getProps(type, overrides, data = {}) {
  const override = getOverride(type, overrides);

  if (isEmpty(override) || typeof override === 'function') {
    return data;
  }

  const overrideProps = override.props || {};
  return {
    ...overrideProps,
    ...data,
    className: cx(data.className, overrideProps.className)
  };
}

export function getOverride(type, overrides = {}) {
  const tag = tagMap[type];

  return overrides[tag] || overrides[type];
}

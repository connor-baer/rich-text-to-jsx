/* eslint-disable no-use-before-define */
import React from 'react';
import {
  BLOCKS,
  INLINES,
  MARKS,
  helpers,
  Document,
  Node,
  Text,
  Block,
  Inline,
} from '@contentful/rich-text-types';

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
import { NodeType, Options, Override, Overrides } from './types';
import { isFunction } from './lib/type-checks';

export const defaultOptions: Options = {
  overrides: {},
  createElement: React.createElement,
};

const assetElementMap = {
  image: Image,
  video: Video,
  audio: Audio,
};

const tagMap: Partial<Record<NodeType, string>> = {
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
  [MARKS.CODE]: 'code',
};

const entryMap: Partial<Record<NodeType, boolean>> = {
  [BLOCKS.EMBEDDED_ENTRY]: true,
  [INLINES.ENTRY_HYPERLINK]: true,
  [INLINES.EMBEDDED_ENTRY]: true,
};

const assetMap: Partial<Record<NodeType, boolean>> = {
  [BLOCKS.EMBEDDED_ASSET]: true,
  [INLINES.ASSET_HYPERLINK]: true,
};

function isEntryNode(node: Node): node is Block | Inline {
  return !!entryMap[node.nodeType];
}

function isAssetNode(node: Node): node is Block | Inline {
  return !!assetMap[node.nodeType];
}

export default function richTextToJsx(
  richText: Document,
  options: Partial<Options> = {},
) {
  if (!richText) {
    return null;
  }
  return nodeListToJsx(richText.content, { ...defaultOptions, ...options });
}

export function nodeListToJsx(nodes: Node[], options: Options) {
  if (isEmpty(nodes)) {
    return null;
  }
  return nodes.map((node, key) => nodeToJsx(node, options, key));
}

export function nodeToJsx(
  node: Node,
  options: Options,
  key: number,
): JSX.Element | string {
  if (!node || node.nodeType) {
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

export function unknownNodeToJsx(node: Node, options: Options, key: number) {
  const { data, content } = node;
  const { createElement } = options;
  const props = { ...data.target, key };

  const children = isEmpty(content)
    ? undefined
    : nodeListToJsx(content, options);

  return createElement(UnknownElement, props, children);
}

export function textNodeToJsx(
  node: Text,
  options: Options,
  key: number,
): JSX.Element | string {
  const { data = {}, value, marks } = node;
  const { overrides, createElement } = options;

  if (isEmpty(marks)) {
    const element = getElement('text', overrides);

    if (!element) {
      return value;
    }

    const props = getProps('text', overrides, {
      ...data,
      key,
    });
    return createElement(element, props, value);
  }

  return marks.reduce<JSX.Element | string>((children, mark, markKey) => {
    const element = getElement(mark.type, overrides);

    if (!element) {
      return children;
    }

    const props = getProps(mark.type, overrides, {
      ...data,
      key: `${key}${markKey}`,
    });
    return createElement(element, props, children);
  }, value);
}

export function entryNodeToJsx(
  node: Block | Inline,
  options: Options,
  key: number,
) {
  const { data, content, nodeType } = node;
  const { overrides, createElement } = options;

  const contentType = get(data, 'target.sys.contentType.sys.id');

  if (!contentType) {
    return unknownNodeToJsx(node, options, key);
  }

  const elementOverrides = overrides[nodeType];

  const DefaultElement = helpers.isBlock(node) ? BlockElement : InlineElement;
  const element = getElement(contentType, elementOverrides) || DefaultElement;

  const props = getProps(nodeType, elementOverrides, {
    ...data.target,
    key,
  });

  const children = isEmpty(content)
    ? undefined
    : nodeListToJsx(content, options);

  return createElement(element, props, children);
}

export function assetNodeToJsx(
  node: Block | Inline,
  options: Options,
  key: number,
) {
  const { data, content, nodeType } = node;
  const { overrides, createElement } = options;

  const mimeType = get(data, 'target.fields.file.contentType', '');
  const mimeTypeGroup = mimeType.split('/')[0];

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
    key,
  });

  const children = isEmpty(content)
    ? undefined
    : nodeListToJsx(content, options);

  return createElement(element, props, children);
}

export function parentNodeToJsx(node: Node, options: Options, key: number) {
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

export function getElement(type: string, overrides: Overrides) {
  const override = getOverride(type, overrides);

  if (override) {
    return isFunction(override) ? override : override.component;
  }

  return tagMap[type];
}

export function getProps(type: string, overrides: Overrides, data = {}) {
  const override = getOverride(type, overrides);

  if (isEmpty(override) || isFunction(override)) {
    return data;
  }

  const overrideProps = override.props || {};
  return {
    ...overrideProps,
    ...data,
    className: cx(data.className, overrideProps.className),
  };
}

export function getOverride(
  type: string,
  overrides: Overrides = {},
): Override | undefined {
  const tag = tagMap[type];

  return (tag && overrides[tag]) || overrides[type];
}

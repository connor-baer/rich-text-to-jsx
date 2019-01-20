import React from 'react';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

import richTextToJsx, * as RichTextService from './rich-text-to-jsx';
import {
  createDocument,
  paragraph,
  text,
  bold,
  boldAndItalic,
  unorderedList,
  hr,
  embeddedAsset,
  embeddedEntryBlock,
  embeddedEntryInline,
  entryHyperlink,
  assetHyperlink
} from '../__fixtures__';

describe('Rich text to JSX', () => {
  const options = RichTextService.defaultOptions;
  const Override = () => <div />;

  describe('richTextToJsx', () => {
    it('should parse and render rich text into JSX', () => {
      const richText = createDocument([paragraph]);
      const actual = richTextToJsx(richText);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('nodeListToJsx', () => {
    it('should render the nodes', () => {
      const actual = RichTextService.nodeListToJsx([text], options);
      expect(actual).not.toBeNull();
    });

    it('should return null if there are no nodes', () => {
      const actual = RichTextService.nodeListToJsx([], options);
      expect(actual).toBeNull();
    });
  });

  describe('unknownNodeToJsx', () => {
    it('should render an unknown element', () => {
      const actual = RichTextService.unknownNodeToJsx(paragraph, options);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('textNodeToJsx', () => {
    it('should render a text node', () => {
      const actual = RichTextService.textNodeToJsx(text, options);
      expect(actual).toMatchSnapshot();
    });

    it('should render a text node with a mark', () => {
      const actual = RichTextService.textNodeToJsx(bold, options);
      expect(actual).toMatchSnapshot();
    });

    it('should render a text node with multiple marks', () => {
      const actual = RichTextService.textNodeToJsx(boldAndItalic, options);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('customNodeToJsx', () => {
    it.skip('should render an embedded asset', () => {
      const overrides = {
        'image/jpg': { [BLOCKS.EMBEDDED_ASSET]: Override }
      };
      const actual = RichTextService.customNodeToJsx(embeddedAsset, {
        ...options,
        overrides
      });
      expect(actual).toMatchSnapshot();
    });

    it.skip('should render an asset hyperlink', () => {
      const overrides = {
        route: { [INLINES.ASSET_HYPERLINK]: Override }
      };
      const actual = RichTextService.customNodeToJsx(assetHyperlink, {
        ...options,
        overrides
      });
      expect(actual).toMatchSnapshot();
    });

    it('should render an embedded entry block', () => {
      const overrides = {
        page: { [BLOCKS.EMBEDDED_ENTRY]: Override }
      };
      const actual = RichTextService.customNodeToJsx(embeddedEntryBlock, {
        ...options,
        overrides
      });
      expect(actual).toMatchSnapshot();
    });

    it('should render an embedded entry inline', () => {
      const overrides = {
        page: { [INLINES.EMBEDDED_ENTRY]: Override }
      };
      const actual = RichTextService.customNodeToJsx(embeddedEntryInline, {
        ...options,
        overrides
      });
      expect(actual).toMatchSnapshot();
    });

    it('should render an entry hyperlink', () => {
      const overrides = {
        route: { [INLINES.ENTRY_HYPERLINK]: Override }
      };
      const actual = RichTextService.customNodeToJsx(entryHyperlink, {
        ...options,
        overrides
      });
      expect(actual).toMatchSnapshot();
    });
  });

  describe('parentNodeToJsx', () => {
    it('should render a node and its children', () => {
      const actual = RichTextService.parentNodeToJsx(unorderedList, options);
      expect(actual).toMatchSnapshot();
    });

    it('should render a node without children', () => {
      const actual = RichTextService.parentNodeToJsx(hr, options);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('getElement', () => {
    it('should return the override component', () => {
      const type = 'foo';
      const overrides = { foo: Override };
      const actual = RichTextService.getElement(type, overrides);
      expect(actual).toBe(Override);
    });

    it('should return the nested override component', () => {
      const type = 'foo';
      const overrides = { foo: { component: Override } };
      const actual = RichTextService.getElement(type, overrides);
      expect(actual).toBe(Override);
    });

    it('should return an HTML tag if no override matches', () => {
      const type = BLOCKS.PARAGRAPH;
      const overrides = { foo: { component: Override } };
      const actual = RichTextService.getElement(type, overrides);
      expect(actual).toBe('p');
    });

    it('should return undefined if the type does not match anything', () => {
      const type = 'unknown';
      const overrides = { foo: { component: Override } };
      const actual = RichTextService.getElement(type, overrides);
      expect(actual).toBeUndefined();
    });
  });

  describe('getProps', () => {
    it('should return the node data', () => {
      const type = 'foo';
      const overrides = {};
      const data = { bar: 'baz' };
      const actual = RichTextService.getProps(type, overrides, data);
      expect(actual).toEqual({ bar: 'baz' });
    });

    it('should return the override data', () => {
      const type = 'foo';
      const overrides = { foo: { props: { fizz: 'buzz' } } };
      const data = {};
      const actual = RichTextService.getProps(type, overrides, data);
      expect(actual).toEqual({ fizz: 'buzz' });
    });

    it('should merge the node and override data', () => {
      const type = 'foo';
      const overrides = { foo: { props: { fizz: 'buzz', bar: 'buh' } } };
      const data = { bar: 'baz' };
      const actual = RichTextService.getProps(type, overrides, data);
      expect(actual).toEqual({ bar: 'baz', fizz: 'buzz' });
    });

    it('should join the node and override class names', () => {
      const type = 'foo';
      const overrides = { foo: { props: { className: 'buzz' } } };
      const data = { className: 'baz' };
      const actual = RichTextService.getProps(type, overrides, data);
      expect(actual).toEqual({ className: 'baz buzz' });
    });
  });

  describe('getOverride', () => {
    it('should return override by the tag name', () => {
      const type = BLOCKS.PARAGRAPH;
      const overrides = { p: 'foo' };
      const actual = RichTextService.getOverride(type, overrides);
      expect(actual).toBe('foo');
    });

    it('should return override by the node type', () => {
      const type = BLOCKS.PARAGRAPH;
      const overrides = { [BLOCKS.PARAGRAPH]: 'foo' };
      const actual = RichTextService.getOverride(type, overrides);
      expect(actual).toBe('foo');
    });
  });
});

<div align="center">

# rich-text-to-jsx <!-- omit in TOC -->

JSX renderer for the Contentful rich text field type

[![npm version](https://badge.fury.io/js/%40madebyconnor%2Frich-text-to-jsx.svg)](https://badge.fury.io/js/%40madebyconnor%2Frich-text-to-jsx) [![Build Status](https://travis-ci.org/connor-baer/rich-text-to-jsx.svg?branch=master)](https://travis-ci.org/connor-baer/rich-text-to-jsx) [![codecov](https://codecov.io/gh/connor-baer/rich-text-to-jsx/branch/master/graph/badge.svg)](https://codecov.io/gh/connor-baer/rich-text-to-jsx)

</div>

<!-- TOC -->

- [Installation](#installation)
- [Usage](#usage)
  - [Parsing Options](#parsing-options)
    - [options.inlines - Override Any HTML Tag's Representation](#optionsinlines---override-any-html-tags-representation)
    - [options.createElement - Custom React.createElement behavior](#optionscreateelement---custom-reactcreateelement-behavior)
  - [Getting the smallest possible bundle size](#getting-the-smallest-possible-bundle-size)
  - [Usage with Preact](#usage-with-preact)
- [Using The Compiler Directly](#using-the-compiler-directly)
- [Changelog](#changelog)

<!-- /TOC -->

---

`rich-text-to-jsx` is inspired by [markdown-to-jsx](https://github.com/probablyup/markdown-to-jsx). Notably, this package offers the following additional benefits:

- Any HTML tags rendered by the compiler and/or `<React>` component can be overridden to include additional
  props or even a different HTML representation entirely.

All this clocks in at around 4 kB gzipped.

Requires React >= 0.14.

## Installation

Install `@madebyconnor/rich-text-to-jsx` with your favorite package manager.

```shell
# yarn
yarn add @madebyconnor/rich-text-to-jsx
# npm
npm i @madebyconnor/rich-text-to-jsx
```

## Usage

`@madebyconnor/rich-text-to-jsx` exports a React component for easy JSX composition:

ES6-style usage\*:

```jsx
import React from 'react';
import { render } from 'react-dom';
import { RichText } from '@madebyconnor/rich-text-to-jsx';

const richText = {
  data: {},
  content: [
    {
      data: {},
      content: [
        {
          data: {},
          marks: [],
          value: 'Hello world!',
          nodeType: 'text'
        }
      ],
      nodeType: 'paragraph'
    }
  ],
  nodeType: 'document'
};

render(<RichText richText={richText} />, document.body);

/*
    renders:

    <p>Hello world!</p>
 */
```

### Parsing Options

_TODO: Explain difference between blocks and inlines._

#### options.inlines - Override Any HTML Tag's Representation

Pass the `options.inlines` prop to the compiler or a `<React>` component to seamlessly revise the rendered representation of any HTML tag. You can choose to change the component itself, add/change props, or both.

```jsx
import React from 'react';
import { render } from 'react-dom';
import { RichText } from '@madebyconnor/rich-text-to-jsx';
import { BLOCKS } from '@contentful/rich-text-types';

// Surprise, it's a div instead!
const MyParagraph = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

[BLOCKS.PARAGRAPH]: {
      component: Text,
      props: {
        noMargin: true,
        size
      }
    },

render(
  <RichText
    richText={{ ... }}
    blocks={{
      [BLOCKS.PARAGRAPH]: {
        component: MyParagraph,
        props: {
          className: 'foo'
        }
      }
    }}
  />,
  document.body
);

/*
    renders:

    <div class="foo">
        Hello World
    </div>
 */
```

If you only wish to provide a component override, a simplified syntax is available:

```js
{
  blocks: {
    [BLOCKS.PARAGRAPH]: MyParagraph
  }
}
```

Any conflicts between passed `props` and the specific properties above will be resolved in favor of `@madebyconnor/rich-text-to-jsx`'s code. `classNames` are merged automatically.

#### options.createElement - Custom React.createElement behavior

Sometimes, you might want to override the `React.createElement` default behavior to hook into the rendering process before the JSX gets rendered. This might be useful to add extra children or modify some props based on runtime conditions. The function mirrors the `React.createElement` function, so the params are [`type, [props], [...children]`](https://reactjs.org/docs/react-api.html#createelement):

```jsx
import React from 'react';
import { render } from 'react-dom';
import { RichText } from '@madebyconnor/rich-text-to-jsx';

render(
  <RichText
    richText={{ ... }}
      createElement={(type, props, children) => (
        <div className="parent">
          {React.createElement(type, props, children)}
        </div>
      )}
  />,
  document.body
);
```

### Getting the smallest possible bundle size

Many development conveniences are placed behind `process.env.NODE_ENV !== "production"` conditionals. When bundling your app, it's a good idea to replace these code snippets such that a minifier (like uglify) can sweep them away and leave a smaller overall bundle.

Here are instructions for some of the popular bundlers:

- [webpack](https://webpack.js.org/guides/production/#specify-the-environment)
- [browserify plugin](https://github.com/hughsk/envify)
- [parcel](https://parceljs.org/production.html)
- [fuse-box](http://fuse-box.org/plugins/replace-plugin#notes)

### Usage with Preact

Everything will work just fine! Simply [Alias `react` to `preact-compat`](https://github.com/developit/preact-compat#usage-with-webpack) like you probably already are doing.

## Using The Compiler Directly

If desired, the compiler function is a "named" export on the `@madebyconnor/rich-text-to-jsx` module:

```jsx
import React from 'react';
import { render } from 'react-dom';
import { richTextToJsx } from '@madebyconnor/rich-text-to-jsx';

const richText = {{ ... }}

render(richTextToJsx(richText, document.body);
```

It accepts the following arguments:

```js
richTextToJsx(richText: string, options: object?)
```

## Changelog

See [Github Releases](https://github.com/connor-baer/rich-text-to-jsx/releases).

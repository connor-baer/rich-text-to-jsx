/* eslint-disable max-len */
export function createDocument(content) {
  return {
    data: {},
    nodeType: 'document',
    content
  };
}

export const headingOne = {
  data: {},
  content: [
    {
      data: {},
      marks: [],
      value: 'This is a first-level heading',
      nodeType: 'text'
    }
  ],
  nodeType: 'heading-1'
};

export const headingThree = {
  data: {},
  content: [
    {
      data: {},
      marks: [],
      value: 'This is a third-level heading',
      nodeType: 'text'
    }
  ],
  nodeType: 'heading-3'
};

export const text = {
  data: {},
  marks: [],
  value: 'This is normal text.',
  nodeType: 'text'
};

export const bold = {
  data: {},
  marks: [
    {
      type: 'bold'
    }
  ],
  value: 'This is bold text.',
  nodeType: 'text'
};

export const italic = {
  data: {},
  marks: [
    {
      type: 'italic'
    }
  ],
  value: 'This is italic text.',
  nodeType: 'text'
};

export const underline = {
  data: {},
  marks: [
    {
      type: 'underline'
    }
  ],
  value: 'This is underlined text.',
  nodeType: 'text'
};

export const hyperlink = {
  data: {
    uri: 'https://acme.com'
  },
  content: [
    {
      data: {},
      marks: [],
      value: 'This is a hyperlink.',
      nodeType: 'text'
    }
  ],
  nodeType: 'hyperlink'
};

export const boldAndItalic = {
  data: {},
  marks: [
    {
      type: 'bold'
    },
    {
      type: 'italic'
    }
  ],
  value: 'This is bold and italic text.',
  nodeType: 'text'
};

export const paragraph = {
  data: {},
  content: [text, bold, italic, underline, hyperlink],
  nodeType: 'paragraph'
};

export const blockquote = {
  data: {},
  content: [paragraph],
  nodeType: 'blockquote'
};

export const listItem = {
  data: {},
  content: [paragraph],
  nodeType: 'list-item'
};

export const unorderedList = {
  data: {},
  content: [listItem, listItem, listItem],
  nodeType: 'unordered-list'
};

export const hr = {
  data: {},
  content: [],
  nodeType: 'hr'
};

const asset = {
  id: '4fgGUXCJXWOQUAEQqCS8MW',
  updatedAt: '2019-01-14T04:57:27.049Z',
  title: 'Random photo from Unsplash.com',
  file: {
    url: 'https://source.unsplash.com/random/800x500',
    details: {
      size: 240963,
      image: {
        width: 800,
        height: 500
      }
    },
    fileName: 'random-unsplash.jpg',
    contentType: 'image/jpg'
  }
};

const entry = {
  id: '32v7TZ7YQEaugOeew4SymY',
  contentType: 'page',
  updatedAt: '2019-01-18T14:37:30.221Z',
  slug: 'about',
  title: 'Title: About Acme Corp'
};

export const embeddedAsset = {
  data: {
    target: asset
  },
  content: [],
  nodeType: 'embedded-asset-block'
};

export const assetHyperlink = {
  data: {
    target: asset
  },
  content: [
    {
      data: {},
      marks: [],
      value: 'ham hock',
      nodeType: 'text'
    }
  ],
  nodeType: 'asset-hyperlink'
};

export const entryHyperlink = {
  data: {
    target: {
      id: '32v7TZ7YQEaugOeew4SymY',
      contentType: 'route',
      updatedAt: '2019-01-18T14:37:30.221Z',
      slug: 'about'
    }
  },
  content: [
    {
      data: {},
      marks: [],
      value: 'This is a link to an entry.',
      nodeType: 'text'
    }
  ],
  nodeType: 'entry-hyperlink'
};

export const embeddedEntryInline = {
  data: {
    target: entry
  },
  content: [],
  nodeType: 'embedded-entry-inline'
};

export const embeddedEntryBlock = {
  data: {
    target: entry
  },
  content: [],
  nodeType: 'embedded-entry-block'
};

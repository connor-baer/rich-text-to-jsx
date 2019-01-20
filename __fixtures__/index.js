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

export const paragraph = {
  data: {},
  content: [text, bold, italic, underline],
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

export const embeddedAsset = {
  data: {
    target: {
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
    }
  },
  content: [],
  nodeType: 'embedded-asset-block'
};

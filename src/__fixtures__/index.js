import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

/* eslint-disable max-len */
export function createDocument(content) {
  return {
    data: {},
    nodeType: 'document',
    content,
  };
}

export const headingOne = {
  data: {},
  content: [
    {
      data: {},
      marks: [],
      value: 'This is a first-level heading',
      nodeType: 'text',
    },
  ],
  nodeType: BLOCKS.HEADING_1,
};

export const headingThree = {
  data: {},
  content: [
    {
      data: {},
      marks: [],
      value: 'This is a third-level heading',
      nodeType: 'text',
    },
  ],
  nodeType: BLOCKS.HEADING_3,
};

export const text = {
  data: {},
  marks: [],
  value: 'This is normal text.',
  nodeType: 'text',
};

export const bold = {
  data: {},
  marks: [
    {
      type: MARKS.BOLD,
    },
  ],
  value: 'This is bold text.',
  nodeType: 'text',
};

export const italic = {
  data: {},
  marks: [
    {
      type: MARKS.ITALIC,
    },
  ],
  value: 'This is italic text.',
  nodeType: 'text',
};

export const underline = {
  data: {},
  marks: [
    {
      type: MARKS.UNDERLINE,
    },
  ],
  value: 'This is underlined text.',
  nodeType: 'text',
};

export const hyperlink = {
  data: {
    uri: 'https://acme.com',
  },
  content: [
    {
      data: {},
      marks: [],
      value: 'This is a hyperlink.',
      nodeType: 'text',
    },
  ],
  nodeType: INLINES.HYPERLINK,
};

export const boldAndItalic = {
  data: {},
  marks: [
    {
      type: MARKS.BOLD,
    },
    {
      type: MARKS.ITALIC,
    },
  ],
  value: 'This is bold and italic text.',
  nodeType: 'text',
};

export const paragraph = {
  data: {},
  content: [text, bold, italic, underline, hyperlink],
  nodeType: BLOCKS.PARAGRAPH,
};

export const blockquote = {
  data: {},
  content: [paragraph],
  nodeType: BLOCKS.QUOTE,
};

export const listItem = {
  data: {},
  content: [paragraph],
  nodeType: BLOCKS.LIST_ITEM,
};

export const unorderedList = {
  data: {},
  content: [listItem, listItem, listItem],
  nodeType: BLOCKS.UL_LIST,
};

export const hr = {
  data: {},
  content: [],
  nodeType: BLOCKS.HR,
};

export const table = {
  nodeType: BLOCKS.TABLE,
  data: {},
  content: [
    {
      nodeType: BLOCKS.TABLE_ROW,
      data: {},
      content: [
        {
          nodeType: BLOCKS.TABLE_HEADER_CELL,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  data: {},
                  marks: [],
                  value: 'A 1',
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.TABLE_HEADER_CELL,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  data: {},
                  marks: [],
                  value: 'B 1',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      nodeType: BLOCKS.TABLE_ROW,
      data: {},
      content: [
        {
          nodeType: BLOCKS.TABLE_CELL,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  data: {},
                  marks: [],
                  value: 'A 2',
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.TABLE_CELL,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  data: {},
                  marks: [],
                  value: 'B 2',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const assetLink = {
  sys: {
    id: '9mpxT4zsRi6Iwukey8KeM',
    link: 'Link',
    type: 'Asset',
  },
};

export const image = {
  sys: {
    id: '4fgGUXCJXWOQUAEQqCS8MW',
    updatedAt: '2019-01-14T04:57:27.049Z',
  },
  fields: {
    title: 'Random photo from Unsplash.com',
    file: {
      url: 'https://source.unsplash.com/random/800x500',
      details: {
        size: 240963,
        image: {
          width: 800,
          height: 500,
        },
      },
      fileName: 'random-unsplash.jpg',
      contentType: 'image/jpg',
    },
  },
};

export const video = {
  sys: {
    id: '4fgGUXCJXWOQUAEQqCS8MW',
    updatedAt: '2019-01-14T04:57:27.049Z',
  },
  fields: {
    title: 'Example video from YouTube',
    file: {
      url: 'https://youtube.com/example.mp4',
      details: {
        size: 2409638,
        video: {
          width: 1920,
          height: 1080,
        },
      },
      fileName: 'example.mp4',
      contentType: 'video/mp4',
    },
  },
};

export const audio = {
  sys: {
    id: '4fgGUXCJXWOQUAEQqCS8MW',
    updatedAt: '2019-01-14T04:57:27.049Z',
  },
  fields: {
    title: 'Example audio from Spotify',
    file: {
      url: 'https://spotify.com/example.mp3',
      details: {
        size: 24096,
      },
      fileName: 'example.mp3',
      contentType: 'audio/mp3',
    },
  },
};

export const embeddedImage = {
  data: {
    target: image,
  },
  content: [],
  nodeType: BLOCKS.EMBEDDED_ASSET,
};

export const embeddedVideo = {
  data: {
    target: video,
  },
  content: [],
  nodeType: BLOCKS.EMBEDDED_ASSET,
};

export const embeddedAudio = {
  data: {
    target: audio,
  },
  content: [],
  nodeType: BLOCKS.EMBEDDED_ASSET,
};

export const assetHyperlink = {
  data: {
    target: image,
  },
  content: [
    {
      data: {},
      marks: [],
      value: 'ham hock',
      nodeType: 'text',
    },
  ],
  nodeType: INLINES.ASSET_HYPERLINK,
};

export const entryLink = {
  sys: {
    id: '9mpxT4zsRi6Iwukey8KeM',
    link: 'Link',
    linkType: 'Entry',
  },
};

const entry = {
  sys: {
    id: '32v7TZ7YQEaugOeew4SymY',
    contentType: { sys: { id: 'page' } },
    updatedAt: '2019-01-18T14:37:30.221Z',
  },
  fields: {
    slug: 'about',
    title: 'Title: About Acme Corp',
  },
};

export const entryHyperlink = {
  data: {
    target: entry,
  },
  content: [
    {
      data: {},
      marks: [],
      value: 'This is a link to an entry.',
      nodeType: 'text',
    },
  ],
  nodeType: INLINES.ENTRY_HYPERLINK,
};

export const embeddedEntryInline = {
  data: {
    target: entry,
  },
  content: [],
  nodeType: INLINES.EMBEDDED_ENTRY,
};

export const embeddedEntryBlock = {
  data: {
    target: entry,
  },
  content: [],
  nodeType: BLOCKS.EMBEDDED_ENTRY,
};

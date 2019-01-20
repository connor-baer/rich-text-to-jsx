/* eslint-disable import/prefer-default-export, max-len */
export const richText = {
  data: {},
  content: [
    {
      data: {},
      content: [
        {
          data: {},
          marks: [],
          value: 'Simple rich text supports ',
          nodeType: 'text'
        },
        {
          data: {},
          marks: [
            {
              type: 'bold'
            }
          ],
          value: 'bold',
          nodeType: 'text'
        },
        {
          data: {},
          marks: [],
          value: ' & ',
          nodeType: 'text'
        },
        {
          data: {},
          marks: [
            {
              type: 'italic'
            }
          ],
          value: 'italic',
          nodeType: 'text'
        },
        {
          data: {},
          marks: [],
          value: ' text, ',
          nodeType: 'text'
        },
        {
          data: {
            uri: 'https://sumup.com'
          },
          content: [
            {
              data: {},
              marks: [],
              value: 'links',
              nodeType: 'text'
            }
          ],
          nodeType: 'hyperlink'
        },
        {
          data: {},
          marks: [],
          value: ', and line breaks.',
          nodeType: 'text'
        }
      ],
      nodeType: 'paragraph'
    },
    {
      data: {},
      content: [
        {
          data: {},
          marks: [],
          value:
            'It does not support headers, images, tables, and other block-level elements.',
          nodeType: 'text'
        }
      ],
      nodeType: 'paragraph'
    }
  ],
  nodeType: 'document'
};

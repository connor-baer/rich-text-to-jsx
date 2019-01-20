import richTextToJsx from './RichTextService';
import { createDocument, paragraph } from '../__fixtures__';

describe('RichTextService', () => {
  describe('richTextToJsx', () => {
    it('should parse and render rich text into JSX', () => {
      const richText = createDocument([paragraph]);
      const actual = richTextToJsx(richText);
      expect(actual).toMatchInlineSnapshot(`
Array [
  <p>
    This is normal text.
    <strong>
      This is bold text.
    </strong>
    <em>
      This is italic text.
    </em>
    <u>
      This is underlined text.
    </u>
  </p>,
]
`);
    });
  });
});

import richTextToJsx, * as RichTextService from './RichTextService';
import {
  createDocument,
  paragraph,
  text,
  bold,
  boldAndItalic
} from '../__fixtures__';

describe('RichTextService', () => {
  const options = RichTextService.defaultOptions;
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
    <a
      href="https://acme.com"
    >
      This is a hyperlink.
    </a>
  </p>,
]
`);
    });
  });

  describe('textNodeToJsx', () => {
    it('should render a text node', () => {
      const actual = RichTextService.textNodeToJsx(text, options);
      expect(actual).toMatchInlineSnapshot(`"This is normal text."`);
    });

    it('should render a text node with a mark', () => {
      const actual = RichTextService.textNodeToJsx(bold, options);
      expect(actual).toMatchInlineSnapshot(`
<strong>
  This is bold text.
</strong>
`);
    });

    it('should render a text node with multiple marks', () => {
      const actual = RichTextService.textNodeToJsx(boldAndItalic, options);
      expect(actual).toMatchInlineSnapshot(`
<em>
  <strong>
    This is bold and italic text.
  </strong>
</em>
`);
    });
  });
});

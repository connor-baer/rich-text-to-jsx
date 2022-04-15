import { Document } from '@contentful/rich-text-types';

import richTextToJsx from '../../rich-text-to-jsx';

export interface RichTextProps {
  /**
   * The Contentful rich text AST to be parsed and rendered.
   */
  richText: Document;
  /**
   * Map block types to React components, e.g. `p` -> `<Text />`
   * The React component is passed all HTML attributes as props.
   * By default, block types are mapped to the corresponding HTML tags.
   */
  blocks: object;
  /**
   * Override an HTML tag with a React component, e.g. `a` -> `<Link />`
   * The React component is passed all HTML attributes as props.
   */
  inlines: object;
  /**
   * A function create and return a new React element.
   * Defaults to React.createElement()
   */
  createElement: Function;
}

/**
 * Parse and render Contentful rich text to JSX.
 */
const RichText = ({ richText, ...options }) => richTextToJsx(richText, options);

export default RichText;

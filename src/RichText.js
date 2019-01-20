import PropTypes from 'prop-types';
import richTextToJsx from './RichTextService';

/**
 * Parse and render Contentful rich text to JSX.
 */
const RichText = ({ children, ...options }) => richTextToJsx(children, options);

RichText.propTypes = {
  /**
   * The Contentful rich text AST to be parsed and rendered.
   */
  children: PropTypes.object,
  /**
   * Map block types to React components, e.g. `p` -> `<Text />`
   * The React component is passed all HTML attributes as props.
   * By default, block types are mapped to the corresponding HTML tags.
   */
  blocks: PropTypes.object,
  /**
   * Override an HTML tag with a React component, e.g. `a` -> `<Link />`
   * The React component is passed all HTML attributes as props.
   */
  inlines: PropTypes.object,
  /**
   * A function create and return a new React element.
   * Defaults to React.createElement()
   */
  createElement: PropTypes.func
};

/**
 * @component
 */
export default RichText;

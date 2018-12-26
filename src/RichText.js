import PropTypes from 'prop-types';
import richTextToJsx from './RichTextService';

/**
 * Describe RichText here.
 */
const RichText = ({ children, ...options }) => {
  const jsx = richTextToJsx(children, options);
  return jsx;
};

RichText.propTypes = {
  /**
   * A consice description of the example prop.
   */
  blocks: PropTypes.object,
  inlines: PropTypes.object,
  createElement: PropTypes.func
};

RichText.defaultProps = {};

/**
 * @component
 */
export default RichText;

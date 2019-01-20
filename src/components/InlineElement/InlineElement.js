import React from 'react';

/**
 * Default fallback element for inline nodes.
 * Renders a prominent warning in development.
 */
function InlineElement(props) {
  const { type, children } = props;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug(`Unknown inline node type "${type}"`, props);
    return (
      <div style={{ color: 'white', backgroundColor: 'red' }}>
        {`Unknown inline node type "${type}" Check the console for more info.`}
        {children}
      </div>
    );
  }
  return children || null;
}

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const PropTypes = require('prop-types');

  InlineElement.propTypes = {
    /**
     * The node, mark or element type
     */
    type: PropTypes.string,
    /**
     * The element children.
     */
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ])
  };
}

/**
 * @component
 */
export default InlineElement;

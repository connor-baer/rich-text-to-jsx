import React from 'react';

/**
 * Default fallback element for block level nodes.
 * Renders a prominent warning in development.
 */
function BlockElement(props) {
  const { type, children } = props;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug(`Unknown block  node type "${type}"`, props);
    return (
      <div style={{ color: 'white', backgroundColor: 'red' }}>
        {`Unknown block node type "${type}" Check the console for more info.`}
        {children}
      </div>
    );
  }
  return children || null;
}

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const PropTypes = require('prop-types');

  BlockElement.propTypes = {
    /**
     * The node, mark or element type
     */
    type: PropTypes.string,
    /**
     * The element children.
     */
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
  };
}

/**
 * @component
 */
export default BlockElement;

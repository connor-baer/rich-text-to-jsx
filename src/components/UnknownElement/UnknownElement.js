import React from 'react';

/**
 * Default element when the node type is unknown.
 * Renders a prominent warning in development.
 */
function UnknownElement(props) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug(`Node type is undefined`, props);

    return (
      <div style={{ color: 'white', backgroundColor: 'red' }}>
        Nodetype is undefined. Check the console for more info.
        {props.children}
      </div>
    );
  }

  return props.children || null;
}

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const PropTypes = require('prop-types');

  UnknownElement.propTypes = {
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
export default UnknownElement;

import React, { Fragment } from 'react';

/**
 * Default fallback element for block level nodes.
 * Renders a prominent warning in development.
 */
function BlockElement(props) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('Unknown block  node type', props);
    return (
      <Fragment>
        <span style={{ color: 'white', backgroundColor: 'red' }}>
          Unknown block node type.
        </span>
        {props.children}
      </Fragment>
    );
  }
  return props.children || null;
}

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const PropTypes = require('prop-types');

  BlockElement.propTypes = {
    /**
     * The element children.
     */
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  };
}

/**
 * @component
 */
export default BlockElement;

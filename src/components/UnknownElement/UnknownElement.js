import React, { Fragment } from 'react';

/**
 * Default element when the node type is unknown.
 * Renders a prominent warning in development.
 */
function UnknownElement(props) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug(`Node type is undefined`, props);

    return (
      <Fragment>
        <span style={{ color: 'white', backgroundColor: 'red' }}>
          Node type is undefined
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

  UnknownElement.propTypes = {
    /**
     * The element children.
     */
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
  };
}

/**
 * @component
 */
export default UnknownElement;

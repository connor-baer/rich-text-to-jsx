import React, { Fragment } from 'react';

/**
 * Default fallback element for inline nodes.
 * Renders a prominent warning in development.
 */
function InlineElement(props) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug(`Unknown inline node type`, props);
    return (
      <Fragment>
        <span style={{ color: 'white', backgroundColor: 'red' }}>
          Unknown inline node type
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

  InlineElement.propTypes = {
    /**
     * The element children.
     */
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
  };
}

/**
 * @component
 */
export default InlineElement;

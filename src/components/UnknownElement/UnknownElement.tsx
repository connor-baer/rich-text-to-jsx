import React, { Fragment } from 'react';

export interface UnknownElementProps {
  /**
   * The element children.
   */
  children?: JSX.Element;
}

/**
 * Default element when the node type is unknown.
 * Renders a prominent warning in development.
 */
export default function UnknownElement(
  props: UnknownElementProps,
): JSX.Element | null {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('Node type is undefined', props);

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

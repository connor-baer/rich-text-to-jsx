import React, { Fragment } from 'react';

export interface BlockElementProps {
  /**
   * The element children.
   */
  children?: JSX.Element;
}

/**
 * Default fallback element for block level nodes.
 * Renders a prominent warning in development.
 */
export default function BlockElement(
  props: BlockElementProps,
): JSX.Element | null {
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

import React, { Fragment } from 'react';

export interface InlineElementProps {
  /**
   * The element children.
   */
  children?: JSX.Element;
}

/**
 * Default fallback element for inline nodes.
 * Renders a prominent warning in development.
 */
export default function InlineElement(
  props: InlineElementProps,
): JSX.Element | null {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('Unknown inline node type', props);
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

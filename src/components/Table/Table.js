import React from 'react';

/**
 * Default element for tables.
 */
function Table({ children }) {
  return (
    <table>
      <tbody>{children}</tbody>
    </table>
  );
}

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const PropTypes = require('prop-types');

  Table.propTypes = {
    /**
     * The table rows and cells
     */
    children: PropTypes.node,
  };
}

/**
 * @component
 */
export default Table;

import React from 'react';

/**
 * Default element for inline asset nodes.
 * Renders a download link for the asset.
 */
function AssetLink({ fields, children }) {
  const { file, title } = fields;
  return (
    <a href={file.url} download>
      {children || title}
    </a>
  );
}

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const PropTypes = require('prop-types');

  AssetLink.propTypes = {
    fields: PropTypes.shape({
      /**
       * The file meta data, including the source URL
       */
      file: PropTypes.shape({
        url: PropTypes.string,
      }),
      /**
       * The asset title
       */
      title: PropTypes.string,
    }),
    /**
     * The children (when the node is a hyperlink)
     */
    children: PropTypes.any,
  };
}

/**
 * @component
 */
export default AssetLink;

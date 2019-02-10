import React from 'react';

/**
 * Default element for images.
 * Renders a responsive image.
 */
function Image({ fields }) {
  const { file, title } = fields;
  return (
    <img
      src={file.url}
      alt={title}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
}

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const PropTypes = require('prop-types');

  Image.propTypes = {
    fields: PropTypes.shape({
      /**
       * The file meta data, including the source URL
       */
      file: PropTypes.shape({
        url: PropTypes.string
      }),
      /**
       * The asset title
       */
      title: PropTypes.string
    })
  };
}

/**
 * @component
 */
export default Image;

import React from 'react';

/**
 * Default element for videos.
 * Renders a responsive video player.
 */
function Video({ fields }) {
  const { file } = fields;
  /* eslint-disable jsx-a11y/media-has-caption */
  return (
    <video
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      controls
    >
      <source src={file.url} type={file.contentType} />
      <p>
        Your browser does not support HTML5 video. Here is a{' '}
        <a href={file.url} download>
          link to the video
        </a>{' '}
        instead.
      </p>
    </video>
  );
}

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const PropTypes = require('prop-types');

  Video.propTypes = {
    fields: PropTypes.shape({
      /**
       * The file meta data, including the source URL
       */
      file: PropTypes.shape({
        url: PropTypes.string
      })
    })
  };
}

/**
 * @component
 */
export default Video;

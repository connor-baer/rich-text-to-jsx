import React from 'react';

/**
 * Default element for audio files.
 * Renders a responsive audio player.
 */
function Audio({ file }) {
  /* eslint-disable jsx-a11y/media-has-caption */
  return (
    <audio
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      controls
    >
      <source src={file.url} type={file.contentType} />
      <p>
        Your browser does not support HTML5 audio. Here is a{' '}
        <a href={file.url} download>
          link to the audio file
        </a>{' '}
        instead.
      </p>
    </audio>
  );
}

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const PropTypes = require('prop-types');

  Audio.propTypes = {
    /**
     * The file meta data, including the source URL
     */
    file: PropTypes.shape({
      url: PropTypes.string
    })
  };
}

/**
 * @component
 */
export default Audio;

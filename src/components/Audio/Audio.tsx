import React from 'react';

export interface AudioProps {
  fields: {
    /**
     * The file meta data, including the source URL
     */
    file: {
      contentType: string;
      url: string;
    };
  };
}
/**
 * Default element for audio files.
 * Renders a responsive audio player.
 */
export default function Audio({ fields }: AudioProps): JSX.Element {
  const { file } = fields;
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

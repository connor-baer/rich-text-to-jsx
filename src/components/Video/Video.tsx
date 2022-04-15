import React from 'react';

export interface VideoProps {
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
 * Default element for videos.
 * Renders a responsive video player.
 */
export default function Video({ fields }: VideoProps): JSX.Element {
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

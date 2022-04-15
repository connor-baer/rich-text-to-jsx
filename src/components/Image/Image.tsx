import React from 'react';

export interface ImageProps {
  fields: {
    /**
     * The file meta data, including the source URL
     */
    file: {
      url: string;
    };
    /**
     * The asset title
     */
    title: string;
  };
}

/**
 * Default element for images.
 * Renders a responsive image.
 */
export default function Image({ fields }: ImageProps): JSX.Element {
  const { file, title } = fields;
  return (
    <img
      src={file.url}
      alt={title}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
}

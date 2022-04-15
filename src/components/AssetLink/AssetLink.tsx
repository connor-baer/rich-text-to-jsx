import React, { ReactNode } from 'react';

export interface AssetLinkProps {
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
  /**
   * The children (when the node is a hyperlink)
   */
  children: ReactNode;
}

/**
 * Default element for inline asset nodes.
 * Renders a download link for the asset.
 */
export default function AssetLink({
  fields,
  children,
}: AssetLinkProps): JSX.Element {
  const { file, title } = fields;
  return (
    <a href={file.url} download>
      {children || title}
    </a>
  );
}

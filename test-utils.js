import { render } from '@testing-library/react';

export * from '@testing-library/react';

export function create(...args) {
  const { container } = render(...args);
  return container.children.length > 1 ? container : container.firstChild;
}

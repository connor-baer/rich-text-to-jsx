import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import React, { ComponentType } from 'react';

type Component = ComponentType;
type Props = Record<string, unknown>;

export type NodeType = BLOCKS | INLINES | MARKS | string;

export type Override = Component | { component: Component; props: Props };

export type Overrides = Partial<Record<NodeType, Override>>;

export type Options = {
  // TODO:
  overrides: Overrides;
  // TODO: Write description
  createElement: typeof React.createElement;
};

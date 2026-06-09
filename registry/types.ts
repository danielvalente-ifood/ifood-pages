import type { ComponentType } from 'react';

export interface ComponentVariant {
  id: string;
  label: string;
  description: string;
  config?: Record<string, unknown>;
}

export interface ComponentSchemaField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'video' | 'list' | 'boolean' | 'select';
  options?: string[];
}

export interface RegistryEntry {
  type: string;
  label: string;
  category: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
  defaults: Record<string, unknown>;
  variants: ComponentVariant[];
  schema: ComponentSchemaField[];
}

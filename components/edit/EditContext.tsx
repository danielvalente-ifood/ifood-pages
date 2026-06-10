'use client';

import { createContext, useContext } from 'react';

export interface EditContextValue {
  /** modo edição (iframe do CMS com ?edit=true) */
  editMode: boolean;
  /** id do bloco atual (provido por bloco no BlockRenderer) */
  blockId: string;
  /** envia uma edição de texto pro CMS: path relativo ao data do bloco */
  emit: (path: string, value: string) => void;
  /** pede troca de imagem pro CMS (abre a biblioteca/upload) */
  requestImage: (path: string) => void;
}

const noop = () => {};

const EditContext = createContext<EditContextValue>({
  editMode: false,
  blockId: '',
  emit: noop,
  requestImage: noop,
});

export function EditProvider({
  value,
  children,
}: {
  value: EditContextValue;
  children: React.ReactNode;
}) {
  return <EditContext.Provider value={value}>{children}</EditContext.Provider>;
}

export function useEdit(): EditContextValue {
  return useContext(EditContext);
}

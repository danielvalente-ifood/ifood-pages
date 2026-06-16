'use client';

import { useEdit } from './EditContext';

interface EditableImageProps {
  /** path do campo de imagem no data do bloco (ex: 'image', 'cards.1.image') */
  path: string;
  /** URL da imagem (vazio = mostra placeholder) */
  src?: string;
  alt?: string;
  /** classe aplicada na <img> quando há src */
  className?: string;
  /** classe aplicada no container de placeholder quando não há src */
  placeholderClassName?: string;
  /** conteúdo do placeholder (ex: ícone) */
  placeholder?: React.ReactNode;
}

/**
 * Imagem editável inline. Em edit mode, duplo-clique pede a troca de imagem
 * ao CMS (abre biblioteca/upload). Mantém o mesmo elemento (img ou div de
 * placeholder) pra não quebrar o layout/estilo do componente.
 */
export function EditableImage({
  path,
  src,
  alt = '',
  className,
  placeholderClassName,
  placeholder,
}: EditableImageProps) {
  const { editMode, requestImage } = useEdit();

  const editProps = editMode
    ? {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onDoubleClick: (e: any) => {
          e.stopPropagation();
          requestImage(path);
        },
        'data-edit-image': path,
        title: 'Duplo-clique para trocar a imagem',
        style: { cursor: 'pointer' as const },
      }
    : {};

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} loading="lazy" {...editProps} />;
  }

  return (
    <div className={placeholderClassName} aria-hidden="true" {...editProps}>
      {placeholder}
    </div>
  );
}

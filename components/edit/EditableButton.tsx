'use client';

import { useRef, useState } from 'react';
import { useEdit } from './EditContext';
import { Button, type ButtonProps } from '@/components/Button/Button';

interface EditableButtonProps extends ButtonProps {
  /** Caminho do campo de texto no data do bloco (ex: 'ctas.0.text') */
  path: string;
}

/**
 * Botão com texto editável inline no iframe do editor.
 * - Fora de edit mode: renderiza <Button> normalmente.
 * - Em edit mode: duplo-clique no texto ativa contentEditable; confirma no blur/Enter.
 */
export function EditableButton({ path, label = '', href, ...rest }: EditableButtonProps) {
  const { editMode, emit } = useEdit();
  const spanRef = useRef<HTMLSpanElement>(null);
  const editingRef = useRef(false);
  const [editing, setEditing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!editMode) {
    return <Button label={label} href={href} {...rest} />;
  }

  const startEdit = () => {
    editingRef.current = true;
    setEditing(true);
    const el = spanRef.current;
    requestAnimationFrame(() => {
      if (!el) return;
      el.focus();
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    });
  };

  const commit = () => {
    if (spanRef.current) emit(path, spanRef.current.innerText.trim() || label);
  };

  return (
    <Button
      label={label}
      href={undefined}
      {...rest}
      onClick={(e) => {
        // impede navegação em modo de edição
        e.preventDefault();
      }}
    >
      <span
        ref={spanRef}
        contentEditable={editing}
        suppressContentEditableWarning
        data-edit-path={path}
        style={{
          cursor: editing ? 'text' : hovered ? 'pointer' : 'inherit',
          outline: '1px solid',
          outlineColor: editing
            ? 'rgba(255,255,255,0.5)'
            : hovered
            ? 'rgba(255,255,255,0.3)'
            : 'transparent',
          outlineOffset: 2,
          borderRadius: 4,
          background: editing ? 'rgba(255,255,255,0.1)' : 'transparent',
          transition: 'outline-color 90ms ease-out, background 120ms ease',
          minWidth: 4,
          display: 'inline',
        }}
        onMouseEnter={() => !editing && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onDoubleClick={(e) => {
          e.stopPropagation();
          if (!editing) startEdit();
        }}
        onInput={() => {
          if (debounceRef.current) clearTimeout(debounceRef.current);
          debounceRef.current = setTimeout(commit, 200);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.blur();
          }
          if (e.key === 'Escape') e.currentTarget.blur();
        }}
        onPaste={(e) => {
          e.preventDefault();
          const text = e.clipboardData.getData('text/plain');
          document.execCommand('insertText', false, text);
        }}
        onBlur={() => {
          if (debounceRef.current) clearTimeout(debounceRef.current);
          editingRef.current = false;
          setEditing(false);
          commit();
        }}
      >
        {label}
      </span>
    </Button>
  );
}

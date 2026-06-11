'use client';

import { useEffect, useRef, useState, type ElementType } from 'react';
import { useEdit } from './EditContext';

interface EditableProps {
  /** path do campo no data do bloco (ex: 'title.0', 'description', 'cards.2.title') */
  path: string;
  /** valor atual do texto */
  value: string;
  /** tag a renderizar (default span) */
  as?: ElementType;
  /** permite quebra de linha (Enter) — default false (Enter confirma) */
  multiline?: boolean;
  className?: string;
}

/**
 * Texto editável inline no iframe do editor.
 * - Fora de edit mode: renderiza o texto normalmente (SSR-friendly).
 * - Em edit mode: duplo-clique liga contentEditable; o texto do DOM é gerido
 *   imperativamente (não reconciliado pelo React) pra não resetar o caret
 *   durante a digitação. Confirma no blur/Enter, emitindo (debounced) pro CMS.
 */
export function Editable({ path, value, as = 'span', multiline = false, className }: EditableProps) {
  const { editMode, emit } = useEdit();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const editingRef = useRef(false);
  const [editing, setEditing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mantém o texto do DOM em sync com o value enquanto NÃO está editando.
  useEffect(() => {
    if (!editMode) return;
    const el = ref.current;
    if (el && !editingRef.current && el.innerText !== value) {
      el.innerText = value ?? '';
    }
  }, [value, editMode]);

  const Tag = as;

  if (!editMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  const startEdit = () => {
    editingRef.current = true;
    setEditing(true);
    const el = ref.current;
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
    if (ref.current) emit(path, ref.current.innerText);
  };

  return (
    <Tag
      ref={ref}
      className={className}
      data-edit-path={path}
      contentEditable={editing}
      suppressContentEditableWarning
      style={{
        cursor: editing ? 'text' : 'pointer',
        // outline sempre presente em 1px solid; só a COR muda → transição suave
        // e sem o "piscar" causado por trocar de 'none' pra dashed/solid.
        outline: '1px solid',
        outlineColor: editing
          ? 'rgba(127,127,127,0.55)'
          : hovered
          ? 'rgba(127,127,127,0.40)'
          : 'transparent',
        outlineOffset: 3,
        background: editing ? 'rgba(127,127,127,0.08)' : 'transparent',
        borderRadius: 6,
        transition: 'outline-color 90ms ease-out, background 120ms ease',
      }}
      onMouseEnter={() => !editing && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onDoubleClick={(e: any) => {
        e.stopPropagation();
        if (!editing) startEdit();
      }}
      onInput={() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(commit, 200);
      }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onKeyDown={(e: any) => {
        if (!multiline && e.key === 'Enter') {
          e.preventDefault();
          e.currentTarget.blur();
        }
        if (e.key === 'Escape') e.currentTarget.blur();
      }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onPaste={(e: any) => {
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
    />
  );
}

'use client';

import { Icon } from '@/components/Icon/Icon';
import styles from './Button.module.css';

/* ============================================================
   Button — componente de botão padrão iFood Pages
   Figma: node 10-3513

   variant: 'fill' | 'stroke' | 'empty'
   color:   'dark'  → dark bg fill / dark border stroke / dark text
            'light' → white bg fill / white border stroke / white text
   content: 'text'       → só texto
            'text-icon'  → texto + chevron direito
            'icon-text'  → chevron esquerdo + texto
            'icon'        → só ícone (circular)
   ============================================================ */

export interface ButtonProps {
  /** Estilo visual do botão */
  variant?: 'fill' | 'stroke' | 'empty';
  /** Esquema de cor */
  color?: 'dark' | 'light';
  /** Layout do conteúdo */
  content?: 'text' | 'text-icon' | 'icon-text' | 'icon';
  /** Rótulo do botão */
  label?: string;
  /** URL — renderiza como <a> se fornecido */
  href?: string;
  /** Callback de clique */
  onClick?: (e: React.MouseEvent) => void;
  /** Classes CSS adicionais */
  className?: string;
  /** Estado desabilitado */
  disabled?: boolean;
  /**
   * Nome do ícone da biblioteca fixa (/public/icons).
   * Padrão: 'chevron-right' (text-icon/icon) · 'chevron-left' (icon-text)
   */
  icon?: string;
  /** Tipo HTML do elemento button */
  type?: 'button' | 'submit' | 'reset';
}

/** Ícone padrão para o lado direito (text-icon / icon) */
const ICON_RIGHT = 'chevron-right';
/** Ícone padrão para o lado esquerdo (icon-text / back) */
const ICON_LEFT = 'chevron-left';

/** Mapeia variant + color → classe CSS */
const VARIANT_CLASS: Record<string, string> = {
  'fill-dark': styles.fillDark,
  'fill-light': styles.fillLight,
  'stroke-dark': styles.strokeDark,
  'stroke-light': styles.strokeLight,
  'empty-dark': styles.emptyDark,
  'empty-light': styles.emptyLight,
};

export function Button({
  variant = 'fill',
  color = 'dark',
  content = 'text',
  label = 'Button',
  href,
  onClick,
  className,
  disabled,
  icon,
  type = 'button',
}: ButtonProps) {
  const isIconOnly = content === 'icon';
  const hasGap = content !== 'text';

  const variantClass = VARIANT_CLASS[`${variant}-${color}`] ?? styles.fillDark;
  const sizeClass = isIconOnly ? styles.sizeIcon : styles.sizeMd;
  const gapClass = hasGap ? styles.withGap : '';

  const classes = [styles.btn, sizeClass, gapClass, variantClass, className]
    .filter(Boolean)
    .join(' ');

  const leftIcon = icon ?? ICON_LEFT;
  const rightIcon = icon ?? ICON_RIGHT;

  const inner = (
    <>
      {content === 'icon-text' && <Icon name={leftIcon} size={24} />}
      {!isIconOnly && <span>{label}</span>}
      {(content === 'text-icon' || content === 'icon') && <Icon name={rightIcon} size={24} />}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-disabled={disabled}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
}

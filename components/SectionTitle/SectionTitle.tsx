'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import Badge from '@/components/Badge/Badge';
import { Editable } from '@/components/edit/Editable';
import styles from './SectionTitle.module.css';

export interface SectionTitleData {
  badge?: string;
  title: string[];
  description?: string;
  align?: 'center' | 'left';
  theme?: 'light' | 'dark';
}

const defaultData: SectionTitleData = {
  badge: 'A Plataforma Conectada',
  title: ['Um produto para cada momento da sua jornada'],
  description: 'Cada produto foi construído para funcionar sozinho — e brilhar junto.',
  align: 'center',
  theme: 'light',
};

interface SectionTitleProps {
  data?: SectionTitleData;
}

export default function SectionTitle({ data }: SectionTitleProps) {
  const { ref, isVisible } = useScrollReveal();
  const d = data ?? defaultData;
  const isDark = d.theme === 'dark';

  return (
    <section
      ref={ref}
      aria-label="Título de seção"
      className={`${styles.section} ${isDark ? styles.dark : ''} scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className={`${styles.inner} ${d.align === 'left' ? styles.left : ''}`}>
        {d.badge && <Badge text={d.badge} editPath="badge" />}
        {d.title?.length > 0 && (
          <Editable
            as="h2"
            className={styles.title}
            path="title.0"
            value={(d.title ?? []).join(' ')}
          />
        )}
        {d.description && (
          <Editable
            as="p"
            className={styles.description}
            path="description"
            value={d.description}
            multiline
          />
        )}
      </div>
    </section>
  );
}

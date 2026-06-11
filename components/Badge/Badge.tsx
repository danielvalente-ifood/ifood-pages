import { Editable } from '@/components/edit/Editable';
import styles from './Badge.module.css';

interface BadgeProps {
  text: string;
  /** quando definido, o texto vira editável inline (duplo-clique) com esse path */
  editPath?: string;
}

export default function Badge({ text, editPath }: BadgeProps) {
  return (
    <div className={styles.badge}>
      {editPath ? <Editable as="span" path={editPath} value={text} /> : <span>{text}</span>}
    </div>
  );
}

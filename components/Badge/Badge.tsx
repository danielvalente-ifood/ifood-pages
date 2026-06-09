import styles from './Badge.module.css';

interface BadgeProps {
  text: string;
}

export default function Badge({ text }: BadgeProps) {
  return (
    <div className={styles.badge}>
      <span>{text}</span>
    </div>
  );
}

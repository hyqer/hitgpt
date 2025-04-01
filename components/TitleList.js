import Link from 'next/link';
import styles from '../styles/TitleList.module.css';

export default function TitleList({ titles }) {
  return (
    <div className={styles.list}>
      {titles.map((title, index) => (
        <Link key={index} href={`/article/${encodeURIComponent(title)}`} passHref>
          <div className={styles.item}>
            <h3>{title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
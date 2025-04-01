import Link from 'next/link';
import styles from '../styles/ArticleView.module.css';

export default function ArticleView({ title, content, related }) {
  return (
    <div className={styles.article}>
      <h1 className={styles.title}>{title}</h1>
      <div 
        className={styles.content} 
        dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} 
      />
      
      {related && related.length > 0 && (
        <div className={styles.related}>
          <h3>You might also like:</h3>
          <ul>
            {related.map((item, index) => (
              <li key={index}>
                <Link href={`/article/${encodeURIComponent(item)}`}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
import styles from '../styles/Pagination.module.css';

export default function Pagination({ page, setPage }) {
  return (
    <div className={styles.pagination}>
      <button 
        onClick={() => setPage(p => Math.max(1, p - 1))} 
        disabled={page === 1}
      >
        Previous
      </button>
      <span>Page {page}</span>
      <button onClick={() => setPage(p => p + 1)}>
        Next
      </button>
    </div>
  );
}
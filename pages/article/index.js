import { useState, useEffect } from 'react';
import axios from 'axios';
import TitleList from '../components/TitleList';
import Pagination from '../components/Pagination';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    const fetchTitles = async () => {
      setLoading(true);
      try {
        const response = await axios.post('/api/generate', {
          type: 'titles',
          page
        });
        setTitles(response.data.titles);
      } catch (error) {
        console.error('Failed to fetch titles:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTitles();
  }, [page]);
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>HitGPT</h1>
        <p className={styles.description}>
          Discover interesting content - no typing, just clicking!
        </p>
        
        {loading ? (
          <div className={styles.loading}>Loading titles...</div>
        ) : (
          <>
            <TitleList titles={titles} />
            <Pagination page={page} setPage={setPage} />
          </>
        )}
      </main>
    </div>
  );
}
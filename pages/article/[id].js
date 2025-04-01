import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleView from '../../components/ArticleView';
import styles from '../../styles/Article.module.css';

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // 首先获取标题
        const titleResponse = await axios.get(`/api/title?id=${id}`);
        const title = titleResponse.data.title;
        
        // 然后获取文章内容
        const articleResponse = await axios.post('/api/generate', {
          type: 'article',
          title
        });
        
        setArticle({
          title,
          content: articleResponse.data.content,
          related: articleResponse.data.related
        });
      } catch (error) {
        console.error('Failed to fetch article:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticle();
  }, [id]);
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {loading ? (
          <div className={styles.loading}>Generating article...</div>
        ) : article ? (
          <ArticleView 
            title={article.title} 
            content={article.content} 
            related={article.related} 
          />
        ) : (
          <div className={styles.error}>Article not found</div>
        )}
      </main>
    </div>
  );
}
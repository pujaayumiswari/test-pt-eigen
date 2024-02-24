import React, { useEffect, useState } from 'react';
import { Layout, Typography } from 'antd';
import { useParams } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

interface Article {
  author: string;
  title: string;
  description: string;
  publishedAt: string;
  content: string;
  urlToImage: string;
}

interface Params {
  url: string;
  [key: string]: string | undefined;
}

export default function BlogDetail() {
  const { url } = useParams<Params>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=tesla&from=2024-01-24&sortBy=publishedAt?url=${encodeURIComponent(url)}&apiKey=c290a4af7bee461389f677177294a020`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch article data');
        }
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          setArticle(data.articles[0]);
        } else {
          throw new Error('Article not found');
        }
      } catch (error) {
        console.error('Error fetching article data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchArticle();
  }, [url]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!article) {
    return <div>Article not found</div>; 
  }

  return (
    <>
      <Layout>
        <Header className="header">
          <Title
            level={3}
            style={{
              color: 'white',
              textAlign: 'center',
              marginTop: '15px',
            }}
          >
            Yumi's Blog
          </Title>
        </Header>
      </Layout>

      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-content">
          <Title>{article.title}</Title>
          <Paragraph>{article.description}</Paragraph>
          <Paragraph strong>Author: {article.author}</Paragraph>
          <Paragraph strong>Published At: {article.publishedAt}</Paragraph>
          <img src={article.urlToImage} alt="Article" style={{ maxWidth: '100%', height: 'auto' }} />
          <Paragraph>{article.content}</Paragraph>
        </div>
      </Content>
    </>
  );
}

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
  url: string;
}

interface Params {
  id: string;
}

export default function BlogDetail() {
  const { id } = useParams<Params>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=tesla&from=2024-01-24&sortBy=publishedAt&apiKey=c290a4af7bee461389f677177294a020`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch article data');
        }
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          const foundArticle = data.articles.find((article: Article) => article.url === id);
          if (foundArticle) {
            setArticle(foundArticle);
          } else {
            throw new Error('Article not found');
          }
        } else {
          throw new Error('No articles found');
        }
      } catch (error) {
        console.error('Error fetching article data:', error.message);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

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


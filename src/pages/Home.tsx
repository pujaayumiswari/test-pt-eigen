import React, { useEffect, useState } from 'react';
import { Layout, Typography, Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom'; 


const { Header, Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;

interface Article {
  id: string;
  author: string;
  title: string;
  description: string;
  publishedAt: string;
  content: string;
  url: string;
  urlToImage: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://newsapi.org/v2/everything?q=tesla&from=2024-01-24&sortBy=publishedAt&apiKey=c290a4af7bee461389f677177294a020'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
          <h1>Latest Articles</h1>
          <Row gutter={[16, 16]}>
            {articles.map((article, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={8} xl={8}>
                <Link to={`/blogdetail/${encodeURIComponent(article.url)}`} style={{ textDecoration: 'none' }}>
                  <Card
                    hoverable
                    style={{ height: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                    cover={<img alt="article" src={article.urlToImage} style={{ height: '200px' }} />}
                  >
                    <Meta title={article.title} description={article.description} />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </>
  );
}

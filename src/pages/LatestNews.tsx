import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LatestNewsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 80px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: clamp(24px, 12vw, 72px);
  margin: 0 auto;
  color: var(--text-color);
`;

const NewsItemContainer = styled(Link)`
  width: 80%;
  max-width: 100%;
  margin: 20px 0;
  padding: 20px;
  border-radius: 25px;
  border: 1px solid var(--text-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-color);
  transition: transform 0.3s, box-shadow 0.3s;
  text-decoration: none;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

const NewsText = styled.div`
  font-size: clamp(16px, 2.5vw, 20px);
  line-height: 1.5;
  color: var(--text-color);
  max-width: 80%;
`;

const NewsDate = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--text-color);
  display: flex;
  justify-content: flex-start;
  font-size: clamp(14px, 2vw, 18px);
`;

const NewsImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-left: 20px;
  border: 1px solid var(--text-color);

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
  }
`;

const NoNewsMessage = styled.div`
  font-size: clamp(18px, 3vw, 24px);
  color: var(--text-color);
  margin-top: 5vw;
  text-align: center;
`;

interface NewsItem {
  id: number;
  date: string;
  title: string;
  image?: string;
}

const LatestNews: React.FC = () => {
  const newsList: NewsItem[] = [];

  return (
    <LatestNewsContainer>
      <Header>
        <Title>Latest News</Title>
      </Header>
      {newsList.length > 0 ? (
        newsList.map((news) => (
          <NewsItemContainer key={news.id} to={`/news/${news.id}`}>
            <NewsText>
              <NewsDate>{news.date}</NewsDate>
              <div>{news.title}</div>
            </NewsText>
            {news.image && <NewsImage src={news.image} alt="News image" />}
          </NewsItemContainer>
        ))
      ) : (
        <NoNewsMessage>
          暫無最新消息，快去喝杯咖啡再回來看看吧！
        </NoNewsMessage>
      )}
    </LatestNewsContainer>
  );
};

export default LatestNews;

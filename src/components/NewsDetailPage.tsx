import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// Styled component for content offset
const NewsDetailContainer = styled.div`
  position: relative;
  top: 80px; /* Adjust this value based on the height of your navigation bar */
  padding: 20px;
`;

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <NewsDetailContainer>
      <h1>News Detail Page</h1>
      <p>Displaying details for news item with ID: {id}</p>
      {/* 根據 ID 顯示具體新聞內容 */}
    </NewsDetailContainer>
  );
};

export default NewsDetailPage;

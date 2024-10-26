// components/TransitionLayout.tsx

import React from 'react';
import styled, { keyframes } from 'styled-components';
import ArrowImage from '../assets/arrow.svg';

// 定義淡入效果動畫
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 定義容器樣式
const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: left;
  position: relative;
`;

// 定義文字容器樣式
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-right: 50px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    align-items: center;
    margin-right: 0;
  }
`;

// 定義標題樣式
const Title = styled.h1`
  font-size: clamp(40px, 8vw, 90px);
  animation: ${fadeIn} 1.5s ease-out;
  font-family: 'Arial', sans-serif;
  margin-bottom: 10px;
  color: var(--text-color);

  @media (max-width: 768px) {
    margin-bottom: 5px;
  }
`;

// 定義子標題樣式
const Subtitle = styled.h2`
  font-size: clamp(20px, 5vw, 40px);
  color: var(--link-hover-color);
  animation: ${fadeIn} 2s ease-out;
  font-family: 'Arial', sans-serif;
`;

// 定義箭頭圖示樣式
const Arrow = styled.img`
  width: clamp(30px, 4vw, 50px);
  height: auto;
  margin-top: clamp(30px, 8vw, 90px);
  transform: scaleY(1.5);

  @media (max-width: 800px) {
    display: none;
  }
`;

// 定義佈局組件
interface TransitionLayoutProps {
  title: string;
  subtitle: string;
}

const TextTransitionLayout: React.FC<TransitionLayoutProps> = ({ title, subtitle }) => {
  return (
    <LayoutContainer>
      <TextContainer>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </TextContainer>
      <Arrow src={ArrowImage} alt="Arrow" />
    </LayoutContainer>
  );
};

export default TextTransitionLayout;

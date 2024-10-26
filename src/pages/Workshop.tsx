/*
  Workshop Component
  Provides information about the game development workshop offered by Counterspell Taiwan.
  Updated to use CSS variables for colors and background.
*/

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import JoinButton from '../components/JoinButton';
import LearnBox from '../components/LearnBox';
import BackgroundHorizontal from '../assets/workshop-background-horizontal.png';
import BackgroundVertical from '../assets/workshop-background-vertical.png';

const WorkshopContainer = styled.div<{ backgroundImage: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 2rem 2rem 2rem;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--background-color);
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 800px) {
    padding: 100px 1rem 1rem 1rem;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: white;
  text-align: center;
  margin-top: 5rem;
  margin-bottom: 0.5rem;
  font-family: Audiowide,serif;

  @media (max-width: 800px) {
    font-size: 2rem;
    margin-top: 1rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 2.5rem;
  color: white;
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 800px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const EventInfoBox = styled.div`
  text-align: center;
  color: white;
  font-weight: bold;
  margin-top: 1rem;
  font-size: 1.5rem;

  p {
    font-family: Arial, sans-serif;
    margin: 0.5rem 0;
  }

  @media (max-width: 800px) {
    font-size: 1.2rem;
    margin-top: 0.5rem;
  }
`;

const Workshop: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState(BackgroundHorizontal);

  useEffect(() => {
    const updateBackground = () => {
      // 根據螢幕比例判斷直向或橫向
      const isVertical = window.innerHeight > window.innerWidth;
      setBackgroundImage(isVertical ? BackgroundVertical : BackgroundHorizontal);
    };

    // 初始判斷背景
    updateBackground();

    // 螢幕調整時重新判斷背景
    window.addEventListener('resize', updateBackground);

    // 清除事件監聽
    return () => window.removeEventListener('resize', updateBackground);
  }, []);

  return (
    <WorkshopContainer backgroundImage={backgroundImage}>
      <Content>
        <Title>Counterspell Taiwan</Title>
        <SubTitle>遊戲入門開發工作坊</SubTitle>
        <EventInfoBox>
          <p>活動時間: 待定</p>
          <p>地點: 台北市</p>
        </EventInfoBox>
        <JoinButton />
      </Content>
      <LearnBox />
    </WorkshopContainer>
  );
};

export default Workshop;

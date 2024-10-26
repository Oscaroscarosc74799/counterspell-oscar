// EventInformation.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import GameDevImage from '../assets/game-dev.png';
import EventTypeImage from '../assets/event-type.png';
import { ContainerTitle as Title } from './common/StyledComponents';

// TypeScript Interfaces
interface EventData {
  title: string;
  content: string;
  imageUrl: string;
}

interface EventItemProps {
  data: EventData;
  index: number;
}

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 60vh;
  align-items: flex-start;
  padding: 2rem;
  margin-bottom: 10vw;
  background-color: var(--background-color);
  position: relative;
  box-sizing: border-box; /* 防止內容超出 */

  @media (max-width: 1024px) {
    min-height: 50vh;
    padding: 1.5rem;
    margin-bottom: 8vw;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    padding: 1rem;
    margin-bottom: 5vw;
    align-items: center; /* 置中內容 */
  }

  @media (max-width: 480px) {
    min-height: 40vh;
    padding: 0.8rem;
    margin-bottom: 4vw;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  padding-left: 5%;
  display: flex;
  flex-direction: column;
  text-align: left;
  position: relative;
  box-sizing: border-box; /* 防止內容超出 */

  @media (max-width: 800px) {
    padding-left: 0;
    margin-top: 1rem;
    text-align: center; /* 置中內容 */
  }

  @media (max-width: 480px) {
    margin-top: 0.8rem;
  }
`;

const Number = styled.div<{ isHidden: boolean }>`
  font-size: 4rem;
  font-family: 'Gobold High Bold', Arial, sans-serif;
  color: transparent;
  -webkit-text-stroke: 0.1rem #ffffff;
  position: absolute;
  top: 0;
  left: 2.5%;

  @media (max-width: 1024px) {
    font-size: 3.5rem;
  }

  @media (max-width: 800px) {
    display: ${({ isHidden }) => (isHidden ? 'none' : 'block')};
  }

  @media (max-width: 768px) {
    left: 0;
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const TitleContainer = styled.div`
  margin-top: 5vw;

  @media (max-width: 1024px) {
    margin-top: 4vw;
  }

  @media (max-width: 800px) {
    margin-top: 2.5vw;
  }

  @media (max-width: 480px) {
    margin-top: 2vw;
  }
`;

const Content = styled.div`
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  margin-top: 1.5rem;
  word-wrap: break-word; /* 防止長字串超出 */

  @media (max-width: 1024px) {
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    margin-top: 1.3rem;
  }

  @media (max-width: 800px) {
    font-size: clamp(1rem, 1.8vw, 1.3rem);
    margin-top: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: clamp(0.9rem, 1.5vw, 1.2rem);
    margin-top: 1rem;
  }

  & a {
    color: var(--link-color);
    text-decoration: none;
    font-size: 1em;
  }

  & a:hover {
    color: var(--link-hover-color);
    text-decoration: underline;
  }

  & strong {
    font-weight: bold;
  }

  & em {
    font-style: italic;
  }
`;

const ImageContainer = styled.div<{ isHidden: boolean }>`
  flex: 1;
  display: ${({ isHidden }) => (isHidden ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  padding: 1rem;
  box-sizing: border-box; /* 防止內容超出 */

  @media (max-width: 1024px) {
    padding: 0.8rem;
  }

  @media (max-width: 800px) {
    padding: 0.6rem;
    margin-top: 1rem;
    display: none; /* 隱藏圖片 */
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
    margin-top: 0.8rem;
  }

  img {
    width: 80%;
    max-width: 100%; /* 防止圖片超出 */
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }

    @media (max-width: 1024px) {
      width: 85%;
    }

    @media (max-width: 800px) {
      width: 100%;
      margin-top: 1rem;
    }

    @media (max-width: 480px) {
      width: 100%;
      margin-top: 0.8rem;
    }
  }
`;

// EventItem Component: Renders individual event information
const EventItem: React.FC<EventItemProps> = ({ data, index }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container>
      <TextContainer>
        <Number isHidden={isSmallScreen}>{index + 1}</Number>
        <TitleContainer>
          <Title>{data.title}</Title>
          <Content>
            <ReactMarkdown>{data.content}</ReactMarkdown>
          </Content>
        </TitleContainer>
      </TextContainer>
      <ImageContainer isHidden={isSmallScreen}>
        <img src={data.imageUrl} alt={data.title} />
      </ImageContainer>
    </Container>
  );
};

// Main Component: Renders a list of EventItem components
const EventInformation: React.FC = () => {
  const eventData: EventData[] = [
    {
      title: '比賽主題',
      content:
        '這場黑客松的主題是「遊戲開發」，希望參賽者在創意與技術的碰撞中創造出精彩的作品。',
      imageUrl: GameDevImage,
    },
    {
      title: '比賽型式',
      content:
        '這是一場以遊戲開發為主題的馬拉松式創作比賽。參賽者將在30小時內，自由組隊（3至6人一隊），從頭開始設計、編程和完成一款遊戲作品。比賽現場會有導師支援，並安排相關課程，幫助參賽者解決技術問題和提升創作能力。',
      imageUrl: EventTypeImage,
    },
  ];

  return (
    <div>
      {eventData.map((data, index) => (
        <EventItem key={index} data={data} index={index} />
      ))}
    </div>
  );
};

export default EventInformation;

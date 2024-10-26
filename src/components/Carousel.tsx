// Carousel.tsx
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { ContainerTitle } from "./common/StyledComponents.tsx";

// Types
interface Card {
  id: number;
  amount: string;
  awardName: string;
  peopleCount: number;
}

interface CarouselProps {
  cards: Card[];
}

// Styled Components

// Wrapper for the entire carousel
const CarouselWrapper = styled.div`
  text-align: left;
  padding: 5vw;
  min-width: 100vw;
  margin: 5vh 0;

  @media (max-width: 768px) {
    padding: 4vw;
    margin: 4vh 0;
  }

  @media (max-width: 500px) { /* 調整斷點至500px */
    padding: 3.5vw;
    margin: 3.5vh 0;
  }
`;

// Container for title and carousel
const CarouselContainer = styled.div`
  width: 65%;
  height: 60vh;
  margin: 20vh auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 1024px) {
    width: 80%;
    height: 50vh;
    margin: 8vh auto;
  }

  @media (max-width: 768px) {
    width: 90%;
    height: 45vh;
    margin: 6vh auto;
  }

  @media (max-width: 500px) { /* 新增500px斷點 */
    width: 100%;
    height: 35vh; /* 減少高度以適應小螢幕 */
    margin: 20vw auto;
  }
`;

// Container for all cards
const CardsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
  perspective: 1000px;
`;

// Individual card wrapper with dynamic positioning
const CardWrapper = styled.div<{ position: CardPosition }>`
  position: absolute;
  transition: transform 0.5s ease, opacity 0.5s ease;
  left: 50%;
  transform: translateX(-50%);

  ${(props) => {
    switch (props.position) {
      case 'center':
        return css`
          transform: translateX(-50%) scale(1.15);
          opacity: 1;
          z-index: 3;
          visibility: visible;
        `;
      case 'left':
        return css`
          transform: translateX(calc(-50% - 20vw)) scale(0.9); /* 拉近距離 */
          opacity: 0.8;
          z-index: 2;
          visibility: visible;
        `;
      case 'right':
        return css`
          transform: translateX(calc(-50% + 20vw)) scale(0.9); /* 拉近距離 */
          opacity: 0.8;
          z-index: 2;
          visibility: visible;
        `;
      default:
        return css`
          transform: translateX(-50%) scale(0.8);
          opacity: 0;
          z-index: 1;
          visibility: hidden;
        `;
    }
  }}

  @media (max-width: 1024px) {
  ${(props) => {
    switch (props.position) {
      case 'left':
        return css`
          transform: translateX(calc(-50% - 15vw)) scale(0.85); /* 調整拉近距離 */
        `;
      case 'right':
        return css`
          transform: translateX(calc(-50% + 15vw)) scale(0.85); /* 調整拉近距離 */
        `;
      default:
        return '';
    }
  }}
}

  @media (max-width: 768px) {
    ${(props) => {
      switch (props.position) {
        case 'left':
          return css`
            transform: translateX(calc(-50% - 10vw)) scale(0.8); /* 調整拉近距離 */
          `;
        case 'right':
          return css`
            transform: translateX(calc(-50% + 10vw)) scale(0.8); /* 調整拉近距離 */
          `;
        default:
          return '';
      }
    }}
  }

  @media (max-width: 500px) { /* 新增500px斷點 */
    ${(props) => {
      switch (props.position) {
        case 'left':
          return css`
            transform: translateX(calc(-50% - 7vw)) scale(0.75); /* 調整拉近距離 */
          `;
        case 'right':
          return css`
            transform: translateX(calc(-50% + 7vw)) scale(0.75); /* 調整拉近距離 */
          `;
        default:
          return '';
      }
    }}
  }
`;

// Styled card component
const StyledCard = styled.div<{ backgroundColor: string }>`
  width: 25vw;
  height: 70vh;
  padding: 1vw;
  border-radius: 1.5rem;
  box-shadow: 0 0.8rem 1.6rem rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.backgroundColor};
  color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.5s, opacity 0.5s;

  @media (max-width: 1024px) {
    width: 45vw;
    height: 50vh;
    padding: 1.5vw;
  }

  @media (max-width: 768px) {
    width: 50vw;
    height: 50vh;
    padding: 1.2vw;
  }

  @media (max-width: 500px) { /* 調整500px斷點 */
    width: 60vw;
    height: 35vh; /* 減少高度 */
    padding: 1vw;
  }
`;

// Header section of the card
const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2vh;

  @media (max-width: 500px) { /* 調整500px斷點 */
    margin-bottom: 1.5vh;
  }
`;

// Amount displayed on the card
const CardAmount = styled.h2`
  font-size: 4rem;
  font-weight: bold;
  margin: 0;

  @media (max-width: 1024px) {
    font-size: 3.5rem;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 500px) { /* 調整500px斷點 */
    font-size: 2.5rem;
  }
`;

// Award name displayed on the card
const CardAwardName = styled.h3`
  font-size: 3rem;
  margin-top: 1rem;
  margin-left: 1vw;

  @media (max-width: 1024px) {
    font-size: 2.5rem;
    margin-top: 0.8rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-top: 0.6rem;
  }

  @media (max-width: 500px) { /* 調整500px斷點 */
    font-size: 1.5rem;
    margin-top: 0.4rem;
  }
`;

// Details section of the card
const CardDetails = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;

  @media (max-width: 500px) { /* 調整500px斷點 */
    justify-content: center;
  }
`;

// People count displayed on the card
const CardPeopleCount = styled.span`
  font-size: 1.5rem;

  @media (max-width: 1024px) {
    font-size: 1.3rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 500px) { /* 調整500px斷點 */
    font-size: 1rem;
  }
`;

// Styled arrow button component
const ArrowButton = styled.button<{ position: ArrowPosition }>`
  position: absolute;
  top: 50%;
  ${(props) => (props.position === 'left' ? 'left: -6vw;' : 'right: -6vw;')}
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  z-index: 4;
  padding: 1.5rem;
  border-radius: 50%;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 1024px) {
    padding: 1.2rem;
    font-size: 1.8rem;
    ${(props) => (props.position === 'left' ? 'left: -4vw;' : 'right: -4vw;')}
  }

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1.6rem;
    ${(props) => (props.position === 'left' ? 'left: -3vw;' : 'right: -3vw;')}
  }

  @media (max-width: 500px) { /* 調整500px斷點 */
    padding: 0.8rem;
    font-size: 1.4rem;
    ${(props) => (props.position === 'left' ? 'left: -2.5vw;' : 'right: -2.5vw;')}
  }
`;

// Enums for card and arrow positions
type CardPosition = 'left' | 'center' | 'right' | 'hidden';
type ArrowPosition = 'left' | 'right';

// Main Carousel Component
const Carousel: React.FC<CarouselProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Handle navigating to the next card
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  // Handle navigating to the previous card
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  // Determine the position of each card relative to the current index
  const getCardPosition = (index: number): CardPosition => {
    if (index === currentIndex) return 'center';
    if (index === (currentIndex - 1 + cards.length) % cards.length) return 'left';
    if (index === (currentIndex + 1) % cards.length) return 'right';
    return 'hidden';
  };

  // Assign a background color based on the card's index
  const getBackgroundColor = (index: number): string => {
    const colors = ['#e0f7fa', '#ffe0b2', '#d1c4e9', '#b3e5fc', '#c8e6c9', '#ffccbc'];
    return colors[index % colors.length];
  };

  // Preload images or perform any side effects if necessary
  useEffect(() => {
    // Example: Preload images or fetch additional data
  }, [currentIndex]);

  return (
    <CarouselWrapper>
      <ContainerTitle>贏取豐厚獎金! 快來看看您能獲得什麼！</ContainerTitle>
      <CarouselContainer>
        <ArrowButton position="left" onClick={handlePrev} aria-label="Previous">
          &lt;
        </ArrowButton>
        <CardsContainer>
          {cards.map((card, index) => {
            const position = getCardPosition(index);
            const backgroundColor = getBackgroundColor(index);
            return (
              <CardWrapper key={card.id} position={position}>
                <StyledCard backgroundColor={backgroundColor}>
                  <CardHeader>
                    <CardAmount>＄{card.amount}</CardAmount>
                    <CardAwardName>{card.awardName}</CardAwardName>
                  </CardHeader>
                  <CardDetails>
                    <CardPeopleCount>{card.peopleCount} 組</CardPeopleCount>
                  </CardDetails>
                </StyledCard>
              </CardWrapper>
            );
          })}
        </CardsContainer>
        <ArrowButton position="right" onClick={handleNext} aria-label="Next">
          &gt;
        </ArrowButton>
      </CarouselContainer>
    </CarouselWrapper>
  );
};

export default Carousel;

import React from 'react';
import styled from 'styled-components';
import HeroUFO from './HeroUFO';
import AstronautComponent from './AstronautComponent';
import BlackHoleComponent from './BlackHoleComponent';

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  position: relative;
  overflow-x: hidden;

  @media (max-width: 1000px) {
    height: auto;
  }

  @media (max-width: 800px) {
    height: auto;
    padding: 20px 0;
  }

  @media (max-width: 500px) {
    padding: 10px;
  }
`;

const TitleContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Audiowide', sans-serif;
  top: -100px;

  @media (max-width: 1000px) {
    top: -80px;
  }

  @media (max-width: 800px) {
    top: 0;
  }

  @media (max-width: 500px) {
    top: 0;
  }
`;

const Title = styled.h1`
  font-size: clamp(24px, 5vw, 72px);
  color: var(--text-color);
  text-align: center;
`;

const Subtitle = styled.h2`
  font-size: clamp(16px, 2vw, 32px);
  color: var(--text-color);
  text-align: center;
  margin-top: 15px;

  @media (max-width: 1000px) {
    margin-top: 8px;
  }

  @media (max-width: 800px) {
    margin-top: 6px;
  }

  @media (max-width: 500px) {
    margin-top: 4px;
  }
`;

const UFOWrapper = styled.div`
  position: absolute;
  top: 0;
  right: -150px;
  transform: translate(-50%, -50%);

  @media (max-width: 1000px) {
    width: 80px;
    right: -100px;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

const Hero: React.FC = () => {
  return (
    <HeroContainer>
      <TitleContainer>
        <Title>Counterspell Taiwan</Title>
        <Subtitle>全台第一場由青少年為青少年舉辦的黑客松</Subtitle>
        <UFOWrapper>
          <HeroUFO />
        </UFOWrapper>
      </TitleContainer>
      <AstronautComponent />
      <BlackHoleComponent />
    </HeroContainer>
  );
};

export default Hero;

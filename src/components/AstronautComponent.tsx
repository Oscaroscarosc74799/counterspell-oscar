import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import astronautImage  from '../assets/astronaut.svg'

// 定義太空人的移動路徑
const movePath = keyframes`
  0% {
    transform: translate(25vw, -10vw);
  }
  50% {
    transform: translate(15vw, -15vw);
  }
  100% {
    transform: translate(25vw, -10vw);
  }
`;

// 定義太空人樣式
const AstronautWrapper = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100px;
  height: 100px;
  animation: ${movePath} 30s infinite linear;

  @media (max-width: 1000px) {
    width: 80px;
    height: 80px;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

const AstronautImage = styled.img`
  width: 100%;
  height: auto;
`;

// 太空人組件
const AstronautComponent: React.FC = () => {
  return (
    <AstronautWrapper>
      <AstronautImage src={ astronautImage } alt="Astronaut" />
    </AstronautWrapper>
  );
};

export default AstronautComponent;

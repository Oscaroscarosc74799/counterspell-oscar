// HeroUFO Component
// Displays an animated UFO image within the Hero section, utilizing floating animations.

import React from 'react';
import styled from 'styled-components';
import UFOImage from '../assets/ufo.svg';
import { float } from '../animations';

// Container for the UFO with floating animation.
const UFOContainer = styled.div`
  width: 100px;
  height: auto;
  animation: ${float} 3s ease-in-out infinite;
  max-width: 100%;
`;

// Styled image for the UFO.
const UFOImageStyle = styled.img`
  width: 100%;
  height: auto;
`;

// HeroUFO Component
const HeroUFO: React.FC = () => {
  return (
    <UFOContainer>
      <UFOImageStyle src={UFOImage} alt="UFO Image" />
    </UFOContainer>
  );
};

export default HeroUFO;

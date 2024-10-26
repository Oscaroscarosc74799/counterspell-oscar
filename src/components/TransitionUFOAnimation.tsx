/**
 * TransitionUFOAnimation Component
 * Displays an animated UFO that transitions across the screen during scrolling.
 */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// Import the UFO image with correct type declaration
import UFOImage from '../assets/big-ufo.svg';

// Define breakpoints for easier configuration
const SMALL_SCREEN_WIDTH = 800;
const INITIAL_UFO_WIDTH = 300;
const INITIAL_CONTAINER_HEIGHT = 1300;

// Styled component for the UFO animation section
const UFOContainer = styled.div<{ height: number }>`
  position: relative;
  width: 100%;
  height: ${({ height }) => height}px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50vh;
`;

// Styled component for the UFO image with adaptive margin
const UFO = styled.img<{ width: number }>`
  width: ${({ width }) => width}px;
  height: auto;
  min-width: calc(100vw - 20vw); // Limit width to 10vw from both sides
  margin: 0 10vw; // Add 10vw margin on left and right
`;

// TransitionUFOAnimation Component
const TransitionUFOAnimation: React.FC = () => {
  const [containerHeight, setContainerHeight] = useState(INITIAL_CONTAINER_HEIGHT);
  const [ufoWidth, setUFOWidth] = useState(INITIAL_UFO_WIDTH);

  // Detect window resize to dynamically adjust container height and UFO size
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      // Adjust container height dynamically for smaller screens
      setContainerHeight(windowWidth < SMALL_SCREEN_WIDTH ? INITIAL_CONTAINER_HEIGHT * 0.7 : INITIAL_CONTAINER_HEIGHT);

      // Calculate and set the new width for the UFO image to ensure it adapts correctly
      const newUFOWidth = Math.min(windowWidth * 0.8, INITIAL_UFO_WIDTH);
      setUFOWidth(newUFOWidth);
    };

    window.addEventListener('resize', handleResize);

    // Call resize handler initially to set correct sizes
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <UFOContainer height={containerHeight}>
      <UFO src={UFOImage} width={ufoWidth} alt="UFO Image" />
    </UFOContainer>
  );
};

export default TransitionUFOAnimation;

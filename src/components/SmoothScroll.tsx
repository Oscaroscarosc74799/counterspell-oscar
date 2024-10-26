// SmoothScroll Component
// Implements smooth scrolling behavior using react-spring and provides scroll position via context.

import React, { useRef, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { SmoothScrollContext } from '../contexts/SmoothScrollContext';
import styled from 'styled-components';

// Styled component for the fixed position container handling smooth scrolling.
const FixedContainer = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  will-change: transform;
`;

interface SmoothScrollProps {
  children: React.ReactNode;
}

// SmoothScroll Component
const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollY, setScrollY] = useState(0); // Stores the smoothed scroll value.
  const [{ y }, api] = useSpring(() => ({
    y: 0,
    onChange: (result) => {
      setScrollY(result.value.y);
    },
  }));

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContentHeight(containerRef.current.getBoundingClientRect().height);
      }
    };

    // Initial content height setup.
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [children]);

  useEffect(() => {
    const handleScroll = () => {
      api.start({
        y: window.scrollY,
        config: { mass: 1, tension: 45, friction: 10 },
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [api]);

  return (
    <>
      {/* Spacer div to ensure page height is correct */}
      <div style={{ height: contentHeight }} />
      {/* Provide the smoothed scroll value via context */}
      <SmoothScrollContext.Provider value={scrollY}>
        {/* Fixed position container for smooth scrolling */}
        <FixedContainer
          ref={containerRef}
          style={{
            transform: y.to((yVal) => `translateY(${-yVal}px)`),
          }}
        >
          {children}
        </FixedContainer>
      </SmoothScrollContext.Provider>
    </>
  );
};

export default SmoothScroll;

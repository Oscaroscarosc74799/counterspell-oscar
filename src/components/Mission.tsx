/**
 * Mission Component
 * Displays the mission statements with interactive planets or cards based on screen size.
 * Utilizes styled-components for styling and adheres to clean code principles.
 */

import React, { useState, useEffect, FC } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ContainerTitle } from "./common/StyledComponents";

// Type definition for a mission item
interface MissionItem {
  key: string;
  text: string;
  xOffset: number;
  yOffset: number;
  scale: number;
  floatOffset: number;
  animationDuration: string;
}

// Type definition for Planet component props
interface PlanetProps {
  scale: number;
  floatOffset: number;
  animationDuration: string;
  isLit: boolean;
  isCard: boolean;
  onLightUp: () => void;
  children: React.ReactNode;
}

// Type definition for PlanetContainer props with explicit children
interface PlanetContainerProps {
  xOffset: number;
  yOffset: number;
  children: React.ReactNode;
}

// Keyframes for floating animation
const float = (offset: number) => css`
  ${keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(${offset}px); }
    100% { transform: translateY(0); }
  `}
`;

// Styled container for the mission section
const MissionSectionContainer = styled.section`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background-color);

  /* Responsive styles for small screens */
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    padding: 20px;
  }
`;

// Styled component for individual planets or cards
const PlanetStyled = styled.div<{
  scale: number;
  $floatOffset: number;
  $animationDuration: string;
  $isLit: boolean;
  $isCard: boolean;
}>`
  width: ${({ $isCard, scale }) => ($isCard ? '90%' : `${150 * scale}px`)};
  max-width: ${({ $isCard }) => ($isCard ? '500px' : 'none')};
  height: ${({ $isCard, scale }) => ($isCard ? 'auto' : `${150 * scale}px`)};
  background-color: ${({ $isLit }) => ($isLit ? 'var(--link-color)' : 'var(--button-background)')};
  color: ${({ $isLit }) => ($isLit ? 'var(--text-color)' : 'transparent')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ $isCard, scale }) => ($isCard ? '1em' : `${17 * scale}px`)};
  font-family: Arial, sans-serif;
  border-radius: ${({ $isCard }) => ($isCard ? '12px' : '50%')};
  position: ${({ $isCard }) => ($isCard ? 'static' : 'absolute')};
  padding: ${({ $isCard, scale }) => ($isCard ? '20px' : `${12 * scale}px`)};
  margin: ${({ $isCard }) => ($isCard ? '10px 0' : '0')};
  box-shadow: ${({ $isCard }) => ($isCard ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none')};
  transition: background-color 0.6s ease, color 0.6s ease, box-shadow 0.3s ease;

  /* 浮動動畫 */
  animation: ${({ $isCard, $floatOffset, $animationDuration }) =>
    !$isCard ? css`${float($floatOffset)} ${$animationDuration} ease-in-out infinite` : 'none'};

  /* 光效 */
  ${({ $isLit }) => $isLit && css`
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  `}

    /* 媒體查詢以動態調整寬度 */
  @media (max-width: 600px) {
  width: ${({ $isCard }) => ($isCard ? '95%' : 'auto')};
}
`;

// Styled container for planet positioning
const PlanetContainerStyled = styled.div<PlanetContainerProps>`
  position: absolute;
  top: ${({ yOffset }) => `${yOffset}vh`};
  left: ${({ xOffset }) => `${xOffset}vw`};

  @media (max-width: 900px) {
    position: static;
    width: 100%;
  }
`;

// Styled container for card layout on small screens
const CardContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 5vw auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10%;
`;

/**
 * Planet Component
 * Renders an individual planet or card with interactive light up functionality.
 */
const Planet: FC<PlanetProps> = ({
                                   scale,
                                   floatOffset,
                                   animationDuration,
                                   isLit,
                                   isCard,
                                   onLightUp,
                                   children,
                                 }) => (
  <PlanetStyled
    scale={scale}
    $floatOffset={floatOffset}
    $animationDuration={animationDuration}
    $isLit={isLit}
    $isCard={isCard}
    onMouseEnter={onLightUp}
  >
    {children}
  </PlanetStyled>
);

/**
 * PlanetContainer Component
 * Positions the Planet component on the screen based on offsets.
 */
const PlanetContainer: FC<PlanetContainerProps> = ({ xOffset, yOffset, children }) => (
  <PlanetContainerStyled xOffset={xOffset} yOffset={yOffset}>
    {children}
  </PlanetContainerStyled>
);

/**
 * Mission Component
 * Main component that displays mission statements as interactive planets or cards.
 */
const Mission: FC = () => {
  const [litPlanets, setLitPlanets] = useState<{ [key: string]: boolean }>({});
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth < 900);

  // List of mission statements with positioning and animation details
  const missions: MissionItem[] = [
    {
      key: '宗旨 A',
      text: '激發創意與自我挑戰',
      xOffset: 20,
      yOffset: 20,
      scale: 0.9,
      floatOffset: 10,
      animationDuration: '5s',
    },
    {
      key: '宗旨 B',
      text: '培養創新思維與技術能力',
      xOffset: 15,
      yOffset: 50,
      scale: 1.7,
      floatOffset: 15,
      animationDuration: '7s',
    },
    {
      key: '宗旨 C',
      text: '激勵學生踏上遊戲開發之路',
      xOffset: 70,
      yOffset: 10,
      scale: 1,
      floatOffset: 8,
      animationDuration: '6s',
    },
    {
      key: '宗旨 D',
      text: '推動臺灣青少年科技社群發展',
      xOffset: 70,
      yOffset: 40,
      scale: 2,
      floatOffset: 12,
      animationDuration: '8s',
    },
  ];

  /**
   * Handles screen resize to determine if the layout should switch to card view.
   */
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 900);
  };

  /**
   * Marks a specific mission item as lit.
   * @param missionKey - The unique key of the mission to light up.
   */
  const lightUp = (missionKey: string) => {
    setLitPlanets((prevState) => ({
      ...prevState,
      [missionKey]: true,
    }));
  };

  // Effect to add and clean up the resize event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <MissionSectionContainer>
      {/* Central Title */}
      <ContainerTitle>活動宗旨</ContainerTitle>

      {isSmallScreen ? (
        // Card Layout for small screens
        <CardContainer>
          {missions.map((mission) => (
            <Planet
              key={mission.key}
              scale={mission.scale}
              floatOffset={mission.floatOffset}
              animationDuration={mission.animationDuration}
              isLit={litPlanets[mission.key] || false}
              isCard={true}
              onLightUp={() => lightUp(mission.key)}
            >
              {mission.text}
            </Planet>
          ))}
        </CardContainer>
      ) : (
        // Planet Layout for large screens
        missions.map((mission) => (
          <PlanetContainer key={mission.key} xOffset={mission.xOffset} yOffset={mission.yOffset}>
            <Planet
              scale={mission.scale}
              floatOffset={mission.floatOffset}
              animationDuration={mission.animationDuration}
              isLit={litPlanets[mission.key] || false}
              isCard={false}
              onLightUp={() => lightUp(mission.key)}
            >
              {mission.text}
            </Planet>
          </PlanetContainer>
        ))
      )}
    </MissionSectionContainer>
  );
};

export default Mission;

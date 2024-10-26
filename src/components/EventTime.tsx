/**
 * EventTime Component
 * Displays event information such as date, time, and location in a responsive layout.
 * Updated to remove animation and always display text-based information.
 */

import React from 'react';
import styled from 'styled-components';
import { ContainerTitle } from "./common/StyledComponents.tsx";

// Styled component for the main container ensuring full viewport height.
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--background-color);
  padding-left: 5vw;
  padding-right: 5vw;
  margin: 30vh 15vw 30vh 10vw;

  @media (max-width: 700px) {
    flex-direction: column;
    padding: 20px 0;
  }
`;

// Styled component for the left container displaying event information.
const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align title to the start for consistency */
  font-size: clamp(36px, 8vw, 64px);
  font-family: 'Arial', sans-serif;
  color: var(--text-color);
  margin-right: 10vw;
`;

// Styled component for the right container displaying event details.
const RightContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding-right: 5vw;

  @media (max-width: 700px) {
    margin-top: 10vw;
    padding: 0;
  }
`;

// Styled component for event detail rows.
const EventDetail = styled.div`
  margin-bottom: 20px;
  font-family: Arial, sans-serif;

  strong {
    font-size: clamp(16px, 3vw, 30px);
    font-weight: bold;
    color: var(--text-color);
  }

  span {
    font-size: clamp(16px, 3vw, 30px);
    font-weight: bold;
    margin-left: 10px;
    color: var(--text-color);
  }
`;

// Styled component for small text within the event details.
const SmallText = styled.small`
  color: var(--link-hover-color);
  margin-top: 10px;
  font-size: clamp(12px, 2.5vw, 16px);
  text-align: left;
  overflow-wrap: break-word;
  white-space: normal;
  width: 90%;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 700px) {
    text-align: center;
  }
`;


const EventTime: React.FC = () => {
  return (
    <Container>
      {/* Left Side - Event Information Title */}
      <LeftContainer>
        <ContainerTitle>活動資訊</ContainerTitle>
      </LeftContainer>

      {/* Right Side - Event Details */}
      <RightContainer>
        <EventDetail>
          <strong>活動時間：</strong>
          <span>2024/11/30 - 2024/12/01</span>
        </EventDetail>
        <EventDetail>
          <strong>活動地點：</strong>
          <span>台北市</span>
        </EventDetail>
        <SmallText>
          具體活動時間將會於活動前使用Email寄出，請留意訊息
        </SmallText>
      </RightContainer>
    </Container>
  );
};

export default EventTime;

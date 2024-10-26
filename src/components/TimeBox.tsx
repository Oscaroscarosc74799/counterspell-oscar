/*
  TimeBox Component
  Displays event time and location details in a styled box.
  Updated to use CSS variables for colors and background.
*/

import React from 'react';
import styled from 'styled-components';

const TimeBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  gap: 10px;
  padding: 2vw;
  min-width: 20vw;
  min-height: 60vh;
  background-color: var(--background-color);
  color: var(--text-color);
  border-radius: 12px;
  position: absolute;
  left: 2vw;
  top: 50%;
  transform: translateY(-50%); /* Center vertically */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: translateY(-60%); /* Slight hover effect */
    background-color: var(--button-background);
  }

  @media (max-width: 768px) {
    width: 80vw;
    left: 10vw;
    padding: 5vw;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const TimeItem = styled.div`
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    color: var(--text-color);
  }

  p {
    margin: 0;
    font-size: 16px;
    font-weight: 300;
    color: var(--text-color);
  }
`;

export const TimeBox: React.FC = () => {
  return (
    <TimeBoxContainer>
      <TimeItem>
        <h3>日期:</h3>
        <p>2024/10/20</p>
      </TimeItem>
      <TimeItem>
        <h3>時間:</h3>
        <p>10:00 - 17:00</p>
      </TimeItem>
      <TimeItem>
        <h3>地點:</h3>
        <p>台北市某某街123號</p>
      </TimeItem>
      <TimeItem>
        <h3>參與資格</h3>
        <p>報名Counterspell Taiwan即可免費參加</p>
      </TimeItem>
    </TimeBoxContainer>
  );
};

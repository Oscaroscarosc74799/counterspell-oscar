/*
  JoinButton Component
  Provides a styled button for users to join or register for an event.
  Updated to use CSS variables for colors.
*/

import React from 'react';
import styled from 'styled-components';

const JoinButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 2rem 0;

  @media (max-width: 800px) {
    margin: 1rem 0;
  }
`;

const JoinButtonStyled = styled.button`
  padding: 15px 30px;
  font-size: 1.5rem;
  font-family: Arial, sans-serif;
  font-weight: 600;
  color: black;
  background-color: var(--link-color);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: var(--link-hover-color);
    transform: translateY(-5px);
  }

  &:active {
    background-color: #d84315; /* Adjust as needed */
    transform: translateY(2px);
  }

  @media (max-width: 800px) {
    padding: 12px 24px;
    font-size: 1.2rem;
  }
`;

const JoinButton: React.FC = () => {
  const handleClick = () => {
    window.open('#', '_blank');
  };

  return (
    <JoinButtonContainer>
      <JoinButtonStyled onClick={handleClick}>
        報名參加工作坊！
      </JoinButtonStyled>
    </JoinButtonContainer>
  );
};

export default JoinButton;

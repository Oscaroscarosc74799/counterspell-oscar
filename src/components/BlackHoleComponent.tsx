import React from 'react';
import styled from 'styled-components';
import blackHoleGif from '../assets/black-hole.gif';

const BlackHoleWrapper = styled.div`
  position: absolute;
  bottom: 10%;
  right: 10%;
  width: clamp(50px, 20vw, 500px);
  height: clamp(50px, 20vw, 500px);

  @media (max-width: 800px) {
    display: none;
  }
`;

const BlackHoleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BlackHoleComponent: React.FC = () => {
  return (
    <BlackHoleWrapper>
      <BlackHoleImage src={blackHoleGif} alt="Black Hole Animation" />
    </BlackHoleWrapper>
  );
};

export default BlackHoleComponent;

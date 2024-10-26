/*
  TeamQualification Component
  Displays qualifications required to form a team with a consistent layout to EventTime.
  Updated to align containers and remove animation dependencies.
*/

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HandDrawnCheckmark from '../assets/hand-drawn-checkmark.svg';
import { ContainerTitle } from "./common/StyledComponents.tsx";

const SectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  background-color: var(--background-color);
  box-sizing: border-box;
  padding-left: 5vw;
  padding-right: 5vw;
  margin: 30vh 15vw 30vh 10vw;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
    align-items: center;
  }
`;

const LeftContentContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: clamp(36px, 8vw, 64px);
  font-family: 'Arial', sans-serif;
  color: var(--text-color);
  margin-right: 10vw;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    margin-bottom: 20px;
  }
`;

const RightContentContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding-right: 5vw;

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const SmallText = styled.p`
  font-size: clamp(16px, 2.5vw, 24px);
  font-family: 'Arial', sans-serif;
  margin-bottom: 20px;
  text-align: left;
  color: var(--text-color);

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2vh;

  @media (max-width: 768px) {
    align-items: center;
    justify-content: start;
    margin-left: 30%;
    width: 100%;
  }
`;

const CheckmarkSVG = styled.img<{ checked: boolean }>`
  width: 30px;
  height: 30px;
  opacity: ${({ checked }) => (checked ? 1 : 0)};
  transition: opacity 0.4s ease-in-out;
  margin-right: 10px;
`;

const CheckboxLabel = styled.span`
  font-size: clamp(18px, 3vw, 28px);
  font-family: 'Arial', sans-serif;
  line-height: 1.5;
  color: var(--text-color);
`;

const TeamQualification: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState([false, false]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const triggerHeight = windowHeight * 0.5; // Adjust trigger height as needed

      if (scrollPosition > triggerHeight) {
        setCheckedItems([true, true]);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <SectionContainer>
      {/* Left Side - Qualification Title */}
      <LeftContentContainer>
        <ContainerTitle>組隊資格</ContainerTitle>
      </LeftContentContainer>

      {/* Right Side - Qualification Details */}
      <RightContentContainer>
        <SmallText>要參加活動，你需要...</SmallText>
        <CheckboxContainer>
          <CheckmarkSVG checked={checkedItems[0]} src={HandDrawnCheckmark} alt="Checkmark" />
          <CheckboxLabel>全國各級高中職學生</CheckboxLabel>
        </CheckboxContainer>
        <CheckboxContainer>
          <CheckmarkSVG checked={checkedItems[1]} src={HandDrawnCheckmark} alt="Checkmark" />
          <CheckboxLabel>每組 3 - 6 人</CheckboxLabel>
        </CheckboxContainer>
      </RightContentContainer>
    </SectionContainer>
  );
};

export default TeamQualification;

/*
  ContactInfo Component
  Displays contact information in a styled card layout, ensuring full-width responsiveness.
  Updated to use CSS variables for colors.
*/

import React from 'react';
import styled from 'styled-components';

const ContactCard = styled.div`
  width: 100%;
  background-color: var(--background-color);
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 10px;
  font-family: 'Arial', sans-serif;
`;

const ContactDetails = styled.p`
  font-size: 1rem;
  color: var(--text-color);
  text-align: center;
  margin-bottom: 5px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ContactInfo: React.FC = () => {
  return (
    <Wrapper>
      <ContactCard>
        <Title>Contact Us</Title>
        <ContactDetails>Email: counterspell@hackit.tw</ContactDetails>
        <ContactDetails>Instagram: @hackit.tw</ContactDetails>
      </ContactCard>
    </Wrapper>
  );
};

export default ContactInfo;

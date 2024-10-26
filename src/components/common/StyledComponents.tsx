import styled from 'styled-components';

export const ContainerTitle = styled.h1`
  font-family: Arial, sans-serif;
  color: var(--text-color);
  font-size: clamp(36px, 8vw, 64px);
  word-wrap: break-word;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

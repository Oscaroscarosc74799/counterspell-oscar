// Animations Definitions
// Defines keyframe animations for styled-components.

import { keyframes } from 'styled-components';

// Defines a floating animation for smooth up and down movement.
export const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

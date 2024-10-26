/*
  HorizontalScroll Component
  Enhances responsiveness across various screen sizes and optimizes for touch devices by enabling horizontal scrolling.
  Updated to use CSS variables for colors and backgrounds.
*/

import React, { useEffect, useRef, useContext, useState } from 'react';
import ufo from '../assets/ufo.svg';
import { SmoothScrollContext } from '../contexts/SmoothScrollContext';
import styled from 'styled-components';

// Styled components for the horizontal scroll layout.
const HorizontalScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 50px 0;
  margin-top: 10vh;
  background-color: var(--background-color);

  @media (max-width: 768px) {
    padding: 20px 0;
    height: 45rem;
  }
`;

const Scrollbox = styled.div<{ $isTouchDevice: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  overflow: ${({ $isTouchDevice }) => ($isTouchDevice ? 'auto' : 'hidden')};
  position: relative;
  scroll-snap-type: ${({ $isTouchDevice }) => ($isTouchDevice ? 'x mandatory' : 'none')};

  /* Adjust container height for small screens and touch devices */
  height: ${({ $isTouchDevice }) => ($isTouchDevice ? 'auto' : '100vh')};

  @media (max-width: 768px) {
    height: auto;
  }
`;

const ScrollboxContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-shrink: 0;
`;

const ScrollboxCard = styled.div`
  position: relative;
  width: 65rem;
  height: 40rem;
  background-color: var(--button-background);
  border-radius: 5rem;
  margin-left: 3rem;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 5rem 6rem;

  @media (max-width: 1024px) {
    width: 50rem;
    height: 35rem; /* Increased height for better visibility */
    padding: 4rem 5rem;
  }

  @media (max-width: 768px) {
    width: 90%;
    max-width: 15%;
    height: 30rem;
    margin-left: 1rem;
    padding: 2rem 3rem;
    scroll-snap-align: start;
  }
`;

const CardTitle = styled.h2`
  font-family: sans-serif;
  font-size: 3rem;
  color: var(--text-color);
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CardContent = styled.p`
  font-family: sans-serif;
  font-size: 1.5rem;
  color: var(--text-color);
  text-align: left;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const TruckImage = styled.img<{ $isTouchDevice: boolean }>`
  position: absolute;
  width: 15%;
  bottom: 0;
  height: ${({ $isTouchDevice }) => ($isTouchDevice ? '0' : '50rem')};
  top: 100px;
  z-index: 1;

  @media (max-width: 768px) {
    height: ${({ $isTouchDevice }) => ($isTouchDevice ? '0' : '10rem')};
    top: 50px;
  }
`;

const cards = [
  {
    title: '報名資格是什麼？',
    content: '全國各級高中（職）學生、專科一年級至三年級學生，以及非學校型態實驗教育學生均可參加。',
    truckClass: 'scc_truck1',
    truckSrc: ufo,
  },
  {
    title: '活動是否免費？',
    content: '是的，參加活動完全免費，並提供豐富的獎品。',
    truckClass: 'scc_truck2',
    truckSrc: ufo,
  },
  {
    title: '需攜帶哪些物品？',
    content: '參賽者需攜帶筆記型電腦、充電器、個人衛生用品及其他個人需求物品。具體列表將在活動前公布。',
    truckClass: 'scc_truck3',
    truckSrc: ufo,
  },
];

// HorizontalScroll Component
const HorizontalScroll: React.FC = () => {
  // References to DOM elements.
  const scrollboxContainerRef = useRef<HTMLDivElement>(null);
  const scrollboxRef = useRef<HTMLDivElement>(null);

  // Retrieve the smooth scroll value from context.
  const smoothScrollY = useContext(SmoothScrollContext);

  // References for individual cards and trucks.
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const truckRefs = useRef<HTMLImageElement[]>([]);

  // State to determine if the device is touch-enabled.
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect if the device has touch capabilities.
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);

    return () => {
      window.removeEventListener('resize', checkTouchDevice);
    };
  }, []);

  // Adjust the height of the scrollbox based on the container's width for non-touch devices.
  useEffect(() => {
    if (isTouchDevice) return; // Skip adjustment for touch devices.

    const adjustHeight = () => {
      const container = scrollboxContainerRef.current;
      const scrollbox = scrollboxRef.current;
      if (!container || !scrollbox) return;

      scrollbox.style.height = `${container.offsetWidth}px`;
    };

    adjustHeight();
    window.addEventListener('resize', adjustHeight);

    return () => {
      window.removeEventListener('resize', adjustHeight);
    };
  }, [isTouchDevice]);

  // Update positions based on scroll for non-touch devices.
  useEffect(() => {
    if (isTouchDevice) return; // Skip scroll logic for touch devices.

    const container = scrollboxContainerRef.current;
    const scrollbox = scrollboxRef.current;
    if (!container || !scrollbox) return;

    const cardElements = cardRefs.current;
    const truckElements = truckRefs.current;

    // Get the bounding rectangle of the scrollbox.
    const rect = scrollbox.getBoundingClientRect();

    // Calculate the start and end positions relative to the viewport.
    const buffer = 80;
    const start = rect.top - buffer;
    const end = rect.bottom - window.innerHeight;

    // If the scrollbox is within the viewport.
    if (start <= 0 && end >= 0) {
      // Calculate scroll progress between 0 and 1.
      const progress = Math.min(Math.max(-start / (rect.height - window.innerHeight), 0), 1);

      // Calculate vertical displacement.
      const distanceY = progress * (rect.height - window.innerHeight);
      container.style.transform = `translateY(${distanceY}px)`;

      // Calculate horizontal displacement.
      const distanceX = progress * (container.offsetWidth - window.innerWidth);
      cardElements.forEach((card) => {
        card.style.transform = `translateX(${-distanceX}px)`;
      });
      truckElements.forEach((truck) => {
        truck.style.transform = `translateX(${distanceX * 1.2}px)`;
      });
    }
  }, [smoothScrollY, isTouchDevice]);

  return (
    <HorizontalScrollContainer>
      {/* Scrollbox Section */}
      <Scrollbox ref={scrollboxRef} $isTouchDevice={isTouchDevice}>
        <ScrollboxContainer ref={scrollboxContainerRef}>
          {cards.map((card, index) => (
            <ScrollboxCard
              key={index}
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
              }}
            >
              {/* Card Title */}
              <CardTitle>{card.title}</CardTitle>
              {/* Card Content */}
              <CardContent>{card.content}</CardContent>
              {/* UFO Image - Render only if not a touch device */}
              {!isTouchDevice && (
                <TruckImage
                  className={`scc_truck ${card.truckClass}`}
                  src={card.truckSrc}
                  ref={(el) => {
                    if (el) truckRefs.current[index] = el;
                  }}
                  alt="UFO"
                  $isTouchDevice={isTouchDevice}
                />
              )}
            </ScrollboxCard>
          ))}
        </ScrollboxContainer>
      </Scrollbox>

      {/* Inline CSS Styles */}
      <style>{`
        .horizontal-scroll {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          background-color: #ffffff;
          box-sizing: border-box;
        }

        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        p,
        img {
          pointer-events: none;
          user-select: none;
        }

        .scrollbox {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .scrollbox_container {
          display: flex;
          justify-content: flex-start;
          flex-shrink: 0;
        }

        .scrollbox_container_card {
          position: relative;
          width: 65rem;
          height: 40rem;
          background-color: #f7f7f7;
          border-radius: 5rem;
          margin-left: 3rem;
          flex-shrink: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 5rem 6rem;
        }

        .scc_truck {
          position: absolute;
          bottom: 0;
          height: 50rem;
          z-index: 1;
          top: 100px;
        }

        .scc_truck1,
        .scc_truck2,
        .scc_truck3 {
          left: 0;
        }

        .scc_truck2 {
          left: calc(-100% - 5rem);
        }

        .scc_truck3 {
          left: calc(-200% - 10rem);
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .scrollbox_container_card {
            width: 90%;
            max-width: 50%;
            margin-left: 1rem;
            padding: 1rem;
            height: 45rem; /* Adjusted height for better fit */
          }

          /* Removed font-size definitions to prevent conflicts */
          /* .card-title {
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }

          .card-content {
            font-size: 1.8rem; /* Increased font size for readability */
          } */

          .scc_truck {
            height: 0; /* Removed truck image height for touch devices */
          }
        }
      `}</style>
    </HorizontalScrollContainer>
  );
};

export default HorizontalScroll;

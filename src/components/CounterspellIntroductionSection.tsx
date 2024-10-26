// CounterspellIntroductionSection Component
// Provides an introduction section for Counterspell Taiwan, utilizing a reusable layout component.
import React from 'react';
import EventIntroductionLayout from './EventIntroductionLayout';

const CounterspellIntroductionSection: React.FC = () => {
  return (
    <EventIntroductionLayout
      title="Counterspell Taiwan 是什麼？"
      description="Counterspell Taiwan 是台灣首次由青少年為青少年舉辦的黑客松活動！這是一場 30 小時的挑戰，無論你對程式開發、設計、策劃還是創意有興趣，這裡都為你準備了一個可以發揮潛能的舞台！快來加入我們，讓你的創意點子變成現實，成為台灣創新未來的一部分吧！"
    />
  );
};

export default CounterspellIntroductionSection;

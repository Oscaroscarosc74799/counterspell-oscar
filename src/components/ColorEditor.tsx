/**
 * ColorEditor Component
 * Simplified to only include color scheme selection, removing custom color functionalities.
 * Ensures it is hidden on mobile screens (width < 500dp).
 */

import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {colorSchemes, CustomScheme} from '../colorSchemes';

// 組件容器
const EditorContainer = styled.div`
  position: fixed;
  top: 60px; /* 調整位置以避免與導航欄重疊 */
  left: 40px;
  z-index: 1002; /* 確保高於其他元素 */

  @media (max-width: 500px) {
    display: none; /* 隱藏在小螢幕 */
  }
`;

// 編輯面板樣式
const EditorPanel = styled.div<{ $isOpen: boolean }>`
  background-color: rgba(255, 255, 255, 0.95); /* 高對比度背景 */
  border: 1px solid #007BFF; /* 固定邊框色 */
  border-radius: 8px;
  width: 300px;
  max-height: 70vh;
  overflow-y: auto;
  padding: 20px;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px); /* 模糊背景，增強辨識度 */
`;

// 含有標題和關閉按鈕的頂部區域
const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

// 標題樣式
const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  color: #333333;
`;

// 關閉按鈕樣式
const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #333333;
  cursor: pointer;

  &:hover {
    color: #ff6347;
  }

  &:active {
    color: #ff4500;
  }
`;

// 下拉選單樣式
const Dropdown = styled.select`
  width: 100%;
  padding: 8px 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #000;
  font-size: 16px;
`;

interface ColorEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const ColorEditor: React.FC<ColorEditorProps> = ({ isOpen, onClose }) => {
  const [currentScheme, setCurrentScheme] = useState<string>('color-scheme-black-green');

  // 函數：從CSS變數讀取當前配色方案
  const readCSSVariables = (root: HTMLElement): { [key: string]: string } => {
    const computedStyle = getComputedStyle(root);
    return {
      '--text-color': computedStyle.getPropertyValue('--text-color').trim(),
      '--background-color': computedStyle.getPropertyValue('--background-color').trim(),
      '--link-color': computedStyle.getPropertyValue('--link-color').trim(),
      '--link-hover-color': computedStyle.getPropertyValue('--link-hover-color').trim(),
      '--button-background': computedStyle.getPropertyValue('--button-background').trim(),
      '--button-hover-color': computedStyle.getPropertyValue('--button-hover-color').trim(),
      '--button-focus-outline': computedStyle.getPropertyValue('--button-focus-outline').trim(),
    };
  };

  // 當組件打開時，讀取當前配色方案
  useEffect(() => {
    if (isOpen) {
      const root = document.documentElement;
      const classes = root.className.split(' ');
      const schemeClass = classes.find(cls => cls.startsWith('color-scheme-')) || 'color-scheme-black-green';
      setCurrentScheme(schemeClass);
    }
  }, [isOpen]);

  const handleSchemeChange = (schemeClass: string) => {
    const root = document.documentElement;

    // 清除所有 color-scheme-* 類別
    root.classList.remove(...colorSchemes.map(s => s.className));
    root.classList.add(schemeClass); // 添加新的配色方案類別
    setCurrentScheme(schemeClass);

    // 清除之前透過 inline style 設定的 CSS 變數
    Object.keys({
      '--text-color': '',
      '--background-color': '',
      '--link-color': '',
      '--link-hover-color': '',
      '--button-background': '',
      '--button-hover-color': '',
      '--button-focus-outline': '',
    }).forEach(varName => {
      root.style.removeProperty(varName);
    });

    // 保存到 localStorage
    const storedSchemes = localStorage.getItem('customSchemes');
    let customSchemes: { [key: string]: CustomScheme } = {};
    if (storedSchemes) {
      try {
        const parsedSchemes = JSON.parse(storedSchemes) as { [key: string]: CustomScheme };
        customSchemes = { ...parsedSchemes };
      } catch (error) {
        console.error('Failed to parse customSchemes from localStorage:', error);
      }
    }
    const scheme = colorSchemes.find(s => s.className === schemeClass);
    customSchemes[schemeClass] = {
      name: scheme?.name || '自定義模式',
      className: schemeClass,
      translation: scheme?.translation || '自定義模式',
      variables: readCSSVariables(root),
    };
    localStorage.setItem('customSchemes', JSON.stringify(customSchemes));

    // 自動關閉配色編輯器
    onClose();
  };

  return (
    <EditorContainer>
      <EditorPanel $isOpen={isOpen}>
        <EditorHeader>
          <Title>配色方案選擇</Title>
          <CloseButton onClick={onClose} aria-label="關閉配色編輯器">&times;</CloseButton>
        </EditorHeader>
        <div>
          <Dropdown
            value={currentScheme}
            onChange={(e) => handleSchemeChange(e.target.value)}
          >
            {colorSchemes.map(scheme => (
              <option key={scheme.className} value={scheme.className}>
                {scheme.translation}
              </option>
            ))}
          </Dropdown>
        </div>
      </EditorPanel>
    </EditorContainer>
  );
};

export default ColorEditor;

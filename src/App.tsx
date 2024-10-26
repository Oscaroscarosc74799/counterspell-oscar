// App.tsx

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavButtons from './components/NavButtons';
import Workshop from './pages/Workshop';
import LatestNews from "./pages/LatestNews";
import NewsDetailPage from "./components/NewsDetailPage";
import { colorSchemes, CustomScheme } from './colorSchemes';
import {createGlobalStyle} from "styled-components";

// 定義配色方案類型
interface CustomSchemes {
  [key: string]: CustomScheme;
}

const ColorSchemeStyles = createGlobalStyle`
  ${colorSchemes.map(scheme => `
    .${scheme.className} {
      ${Object.entries(scheme.variables).map(([key, value]) => {
  if (key === '--button-focus-outline') {
    return `${key}: 4px auto ${value};`;
  }
  return `${key}: ${value};`;
}).join('\n  ')}
    }
  `).join('\n')}
`;


const App: React.FC = () => {
  useEffect(() => {
    const storedSchemes = localStorage.getItem('customSchemes');
    if (storedSchemes) {
      try {
        const customSchemes: CustomSchemes = JSON.parse(storedSchemes);
        const currentSchemeClass = Object.keys(customSchemes).pop();
        if (currentSchemeClass && customSchemes[currentSchemeClass]?.variables) {
          document.documentElement.className = currentSchemeClass;
          const vars = customSchemes[currentSchemeClass].variables;
          Object.entries(vars).forEach(([key, value]) => {
            if (key === '--button-focus-outline') {
              document.documentElement.style.setProperty(key, `4px auto ${value}`);
            } else {
              document.documentElement.style.setProperty(key, value);
            }
          });
        }
      } catch (error) {
        console.error('Failed to parse customSchemes from localStorage:', error);
      }
    } else {
      // 如果沒有存儲的配色方案，應用預設配色方案
      const defaultScheme = colorSchemes.find(scheme => scheme.className === 'color-scheme-black-green');
      if (defaultScheme) {
        document.documentElement.className = defaultScheme.className;
        Object.entries(defaultScheme.variables).forEach(([key, value]) => {
          if (key === '--button-focus-outline') {
            document.documentElement.style.setProperty(key, `4px auto ${value}`);
          } else {
            document.documentElement.style.setProperty(key, value);
          }
        });
      }
    }
  }, []);

  return (
    <>
      <ColorSchemeStyles />
      <Router>
        <NavButtons />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/LatestNews" element={<LatestNews />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

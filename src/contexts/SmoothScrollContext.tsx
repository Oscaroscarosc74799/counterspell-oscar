/**
 * SmoothScrollContext
 *
 * This context provides the current smooth scroll position to components within the application.
 * It facilitates smooth scrolling effects by sharing the scroll position state across the component tree.
 */

import React from 'react';

export const SmoothScrollContext = React.createContext<number>(0);

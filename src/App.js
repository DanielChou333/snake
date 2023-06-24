import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import SnakeGame from "./SnakeGame";
import themes from "./themes";

const defaultTheme = Object.keys(themes)[0]

const App = () => {

  const [selectedTheme, setSelectedTheme] = useState(defaultTheme);

  return (
    <ThemeProvider theme={themes[selectedTheme]}>
      <SnakeGame/>
    </ThemeProvider>
  )
}

export default App;

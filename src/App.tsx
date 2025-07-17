import { Route, Routes } from 'react-router';
import Home from './pages/Home/Home.tsx';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme.ts';
import { GlobalStyle } from './styles/global.ts';
import '@fontsource/poppins';
import '@fontsource-variable/nunito';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/m/:id" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

import { Route, Routes } from 'react-router';
import Home from './pages/Home/Home.tsx';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme.ts';
import { GlobalStyle } from './styles/global.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/m/:id" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

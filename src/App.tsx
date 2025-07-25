import { Route, Routes } from 'react-router';
import Home from './pages/Home/Home.tsx';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from './styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserPreferencesProvider } from './providers';

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
        <UserPreferencesProvider>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/m/:id" element={<Home />} />
          </Routes>
        </UserPreferencesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

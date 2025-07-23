import { render, type RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles';
import type { ReactElement } from 'react';

// Custom render function that includes ThemeProvider
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// Re-export everything from @testing-library/react
export * from '@testing-library/react';

// Override render method
export { customRender as render };
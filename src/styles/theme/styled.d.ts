import 'styled-components';
import { theme } from './theme.ts';

type Theme = typeof theme;

declare module 'styled-components' {
  // eslint-disable-next-line
  export interface DefaultTheme extends Theme {}
}

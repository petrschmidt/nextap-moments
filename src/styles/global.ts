import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Poppins", sans-serif;
    margin: 0;
  }
  
  body * {
    box-sizing: border-box;
  }
  
  a {
    text-decoration: none;
  }
  
  button {
    -webkit-appearance: none;
    border-radius: 0;
    text-align: inherit;
    background: none;
    box-shadow: none;
    padding: 0;
    cursor: pointer;
    border: none;
    color: inherit;
    font: inherit;
  }
`;

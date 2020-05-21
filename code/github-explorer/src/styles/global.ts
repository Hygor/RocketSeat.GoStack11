import { createGlobalStyle } from 'styled-components';

import Background from '../assets/bg.svg';

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  html, body {
    background-color: #f0f0f5;
    -webkit-font-smoothing: antialiased;
    font: 16px 'Roboto', sans-serif;
  }

  body {
    min-height: 100vh;
    background: #f0f0f5 url(${Background}) 70% top no-repeat;
  }

  button {
    cursor: pointer;
  }

  #root {
    max-width: 60rem;
    margin: 0 auto;
    padding: 2.5rem 1.25rem;
  }

`;

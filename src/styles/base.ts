import { createGlobalStyle, css } from 'styled-components';
import { fonts } from './fonts';
import { resetStyles } from './reset';

// stylelint-disable selector-type-no-unknown
export const Styles = createGlobalStyle`
  ${css`
    ${resetStyles}
    ${fonts}
    @-ms-viewport {
      width: device-width;
    }
    @-o-viewport {
      width: device-width;
    }
    @viewport {
      width: device-width;
    }
  `}
  :root {
    --scale-element: 1;
    --scale-font: 1;
  }
  html,
  body {
    min-height: 100vh;
    background-color: #fff;
  }
  html {
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
    /* always show the vertical scrollbar so that content doesn't jump */
    overflow-y: scroll;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
  }
  /* inherited from <html> */
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  body {
    position: relative;
    margin: 0;
    font-family: Roboto, sans-serif;
    line-height: 1;
    /* iOS on orientation change */
    text-size-adjust: 100%;
    color: #000;
  }
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
  /* placeholders */
  input,
  textarea,
  select {
    &::placeholder {
      opacity: 1;
      color: #aaa;
    }
  }
`;

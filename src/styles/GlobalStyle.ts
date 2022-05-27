import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }
  body {
    font-size: 1.6rem;
  }
  .mu-icon {
    font-size: 1em !important;
  }
  .notification {
    &-success {
      background-color: #73d13d;
      .ant-notification-notice-message {
        color: #ffffff;
      }
      .ant-notification-notice-close-icon > svg {
        fill: #ffffff;
      }
    }
  }
`;

export default GlobalStyle;
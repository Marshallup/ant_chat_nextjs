import { createGlobalStyle } from 'styled-components';
import { MEDIA_WIDTH } from './vars';

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
    }
    &-error {
      background-color: #f5222d;
    }
  }

  .ant-notification-notice-message {
    color: #ffffff;
  }
  .ant-notification-notice-close-icon > svg {
    fill: #ffffff;
  }

  @media screen and (max-width: ${MEDIA_WIDTH.MOBILE}) {
    .mobile-hide {
      display: none;
    }
  }
`;

export default GlobalStyle;
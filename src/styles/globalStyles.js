import { injectGlobal } from 'styled-components';

export default () => injectGlobal`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    font-family: lato;
  }

  @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700')
`

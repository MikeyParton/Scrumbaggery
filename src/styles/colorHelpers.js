import { css } from 'styled-components'

export const fill = css`
  background-color: ${(props) =>
    (props.fill && props.theme.colors[props.fill]) ||
    props.theme.colors.default
  };
`

export const darkLight = css`
  ${(props) => props.dark && css `color: white;`}
`

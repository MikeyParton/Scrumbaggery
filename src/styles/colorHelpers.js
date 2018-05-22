import { css } from 'styled-components'
import { readableColor } from 'polished'

export const fill = css`
  ${(props) => {
    const background = (props.fill && props.theme.colors[props.fill]) ||
      props.theme.colors.default

    return css`
      background-color: ${background}
      color: ${readableColor(background)};
    `
  }}
`

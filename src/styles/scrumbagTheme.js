import { lighten, darken } from 'polished'

const makeShades = (name, code) => ({
  [`${name}-30`]: lighten(0.15, code),
  [`${name}-20`]: lighten(0.1, code),
  [`${name}-10`]: lighten(0.05, code),
  [`${name}`]: code,
  [`${name}+10`]: darken(0.05, code),
  [`${name}+20`]: darken(0.1, code),
  [`${name}+30`]: darken(0.15, code)
})

const colors = {
  black: '#333333',
  ...makeShades('primary', '#2F68ED'), // ultraMarineBlue
  ...makeShades('secondary', '#6C698D'), //darkBlueGrey
  ...makeShades('success', '#00A676'), // greenMunsell
  ...makeShades('danger', '#B74F6F'), // rasperryRose
  ...makeShades('greyLightest', '#F9F9F9'), //snow
  ...makeShades('default', '#C6C6C0') // silver
}

const scrumbagTheme = {
  colors
}


export default scrumbagTheme

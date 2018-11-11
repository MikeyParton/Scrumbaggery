import { lighten, darken } from 'polished'

const makeShades = (name, code) => ({
  [`${name}LightXXX`]: lighten(0.15, code),
  [`${name}LightXX`]: lighten(0.1, code),
  [`${name}LightX`]: lighten(0.05, code),
  [`${name}`]: code,
  [`${name}DarkX`]: darken(0.05, code),
  [`${name}DarkXX`]: darken(0.1, code),
  [`${name}DarkXXX`]: darken(0.15, code)
})

const colors = {
  black: '#333333',
  transparent: 'transparent',
  ...makeShades('snow', '#F9F9F9'),       // snow
  ...makeShades('primary', '#2F68ED'),    // ultraMarineBlue
  ...makeShades('secondary', '#6C698D'),  // darkBlueGrey
  ...makeShades('success', '#00A676'),    // greenMunsell
  ...makeShades('danger', '#B74F6F'),     // rasperryRose
  ...makeShades('default', '#C6C6C0')     // silver
}

const scrumbagTheme = {
  colors
}


export default scrumbagTheme

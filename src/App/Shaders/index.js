import { fragments as rainbowHalo } from './fragments/rainbow-halo'
import { fragments as linearWhite } from './fragments/linear-white'
import { fragments as psyUniverse } from './fragments/psy-universe'
import { fragments as coloredCircle } from './fragments/colored-circle'

const list = [
  {
    name: 'Rainbow Halo',
    vertexShader: undefined,
    fragmentShaders: rainbowHalo
  },
  {
    name: 'Linear White',
    vertexShader: undefined,
    fragmentShaders: linearWhite
  },
  {
    name: 'Psy Universe',
    vertexShader: undefined,
    fragmentShaders: psyUniverse
  },
  {
    name: 'Colored Circle',
    vertexShader: undefined,
    fragmentShaders: coloredCircle
  },
];

export default list;
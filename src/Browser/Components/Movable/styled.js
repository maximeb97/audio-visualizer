import { styled } from "styled-components"
import Movable from "."

export default styled(Movable)`
  .react-draggable {
    border: 1px solid black;
    overflow: hidden;
    z-index: 99999;
  }
`
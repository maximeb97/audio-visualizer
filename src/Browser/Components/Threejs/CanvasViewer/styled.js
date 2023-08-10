import { styled } from "styled-components";
import CanvasViewer from "./index";

export default styled(CanvasViewer)`
  position: relative;

  .canvas__expand_icon {
    position: absolute;
    background-color: transparent;
    left: 10px;
    top: 10px;
    z-index: 111;
    mix-blend-mode: exclusion;
    svg {
      width: 35px;
      cursor: pointer;
      transition: all linear .1s;
      transform: scale(1.0);
      &:hover {
        transform: scale(1.2);
      }

      path {
        stroke: white;
      }
    }
  }
`
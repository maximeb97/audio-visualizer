import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Box from "#Browser/Components/Threejs/Box";
import {ReactComponent as Expand} from "#Assets/Icons/expand.svg";
import {ReactComponent as Move} from "#Assets/Icons/move.svg";

const CanvasViewer = ({
  getFrequency,
  getFrequencyArray,
  size,
  fragmentShader,
  vertexShader,
  className
}) => {
  const [fullscreen, setFullscreen] = useState(false);

  const handleToggleFullscreen = () => {
    setFullscreen(fullscreen => !fullscreen);
    // TODO: Move to 0,0
  };

  return (
    <div className={className}>
      <div className="canvas__expand_icon">
        <Expand onClick={handleToggleFullscreen} />
        <Move />
      </div>
      <Canvas>
        <ambientLight />
        <Box
          position={[0, 0, 0]}
          getFrequency={getFrequency || (() => 0)}
          getFrequencyArray={getFrequencyArray || (() => [])}
          width={fullscreen ? document.documentElement.clientWidth : size.width}
          height={
            fullscreen ? document.documentElement.clientHeight : size.height
          }
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
        />
      </Canvas>
    </div>
  );
};

export default CanvasViewer;

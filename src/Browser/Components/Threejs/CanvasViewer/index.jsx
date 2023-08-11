import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Box from "#Browser/Components/Threejs/Box";
import { ReactComponent as Expand } from "#Assets/Icons/expand.svg";
import { ReactComponent as Reduce } from "#Assets/Icons/reduce.svg";
import { ReactComponent as Move } from "#Assets/Icons/move.svg";

const CanvasViewer = ({
  getFrequency,
  getFrequencyArray,
  setSize,
  size,
  fragmentShader,
  vertexShader,
  setPosition,
  position,
  className,
}) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [previousPosition, setPreviousPosition] = useState(position);
  const [previousSize, setPreviousSize] = useState(size);

  const handleToggleFullscreen = () => {
    const isFullscreen = !fullscreen;
    setFullscreen(fullscreen => !fullscreen);
    if (isFullscreen) {
      setPreviousPosition(position);
      setPreviousSize(size);
      setPosition({ x: 0, y: 0 });
      setSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    } else {
      setPosition(previousPosition);
      setSize(previousSize);
    }
  };

  return (
    <div className={className}>
      <div className="canvas__expand_icon">
        {(setPosition && setSize) &&
          (!fullscreen ? (
            <Expand onClick={handleToggleFullscreen} />
          ) : (
            <Reduce onClick={handleToggleFullscreen} />
          ))}
        {!fullscreen && <Move />}
      </div>
      <Canvas>
        <ambientLight />
        <Box
          position={[0, 0, 0]}
          getFrequency={getFrequency || (() => 0)}
          getFrequencyArray={getFrequencyArray || (() => [])}
          width={size.width}
          height={size.height}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
        />
      </Canvas>
    </div>
  );
};

export default CanvasViewer;

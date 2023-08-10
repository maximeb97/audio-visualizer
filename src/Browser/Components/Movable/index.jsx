import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";

const Movable = ({ children, size, setSize, ...props }) => {
  const ref = useRef();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onResize = (e, direction, ref, delta, position) => {
    setSize({
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
    });
    setPosition(position);
  };

  const onMove = (e, d) => {
    setPosition({ x: d.x, y: d.y });
  };

  return (
    <div {...props} ref={ref}>
      <Rnd
        size={{ width: size.width, height: size.height }}
        position={{ x: position.x, y: position.y }}
        onDragStop={onMove}
        onResizeStop={onResize}
      >
        {children}
      </Rnd>
    </div>
  );
};

export default Movable;

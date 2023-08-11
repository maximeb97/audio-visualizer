import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";

const Movable = ({ children, size, setSize, position, setPosition, ...props }) => {
  const ref = useRef();

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

  useEffect(() => {
    const handleResize = () => {
      const newWidth = document.documentElement.clientWidth;
      const newHeight = document.documentElement.clientHeight;

      setSize({
        width: size.width - (size.width > newWidth ? size.width - newWidth : 0),
        height: size.height - (size.height > newHeight ? size.height - newHeight : 0),
      })
      setPosition({
        x: position.x - (position.x + size.width > newWidth ? size.width - newWidth : 0),
        y: position.y - (position.y + size.height > newHeight ? size.height - newHeight : 0),
      })
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])

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

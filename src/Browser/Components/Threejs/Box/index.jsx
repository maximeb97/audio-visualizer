import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { DataTexture, RGBAFormat } from 'three'

const Box = ({getFrequency, getFrequencyArray, width, height, fragmentShader, vertexShader, ...props}) => {
  const ref = useRef()
  const [currentShader, setCurrentShader] = useState(fragmentShader)
  const [currentVShader, setCurrentVShader] = useState(vertexShader)
  const state = useThree()

  const [uniforms, setUniforms] = useState({
    time: { value: 0.0 },
    resolution: { value:{ x: width, y: height }},
    frequency: { value: getFrequency() },
    sound: { value: new DataTexture(getFrequencyArray(), 512, 2) }
  })

  useFrame(({ clock }) => {
    const texture = new DataTexture(getFrequencyArray(), 512, 2);
    texture.format = RGBAFormat;
    texture.needsUpdate = true;
    ref.current.material.uniforms.sound.value = texture;
    ref.current.material.uniforms.frequency.value = getFrequency();
    ref.current.material.uniforms.time.value = clock.getElapsedTime()
  })

  useEffect(() => {
    if (state.gl) {
      state.gl.clear()
      state.gl.setSize(width,height)
      ref.current.material.uniforms.resolution.value = {
        x: width,
        y: height,
      }
    }
  }, [state.gl, width, height])

  useEffect(() => {
    setCurrentShader(fragmentShader);
    setCurrentVShader(vertexShader);
    state.gl.setSize(width,height)
  }, [fragmentShader, vertexShader])

  return (
    <mesh
      {...props}
      ref={ref}
      >
      <planeGeometry args={[100, 100]} />
      <shaderMaterial
      vertexShader={currentVShader}
      vertexColors={true}
      fragmentShader={currentShader}
      uniforms={uniforms}
      needsUpdate={fragmentShader !== currentShader || vertexShader !== currentVShader}
      />
    </mesh>
  )
}

export default Box
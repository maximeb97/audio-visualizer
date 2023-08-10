import './App.css';

import Select from '#Shared/Select/styled';
import Checkbox from '#Shared/Checkbox/styled';
import { useState } from 'react';
import { useMessageHandler } from '#Browser/Contexts/MessageHandler'
import Shaders from '#App/Shaders';
import CanvasViewer from '#Browser/Components/Threejs/CanvasViewer/styled';

function App() {
  const [active, setActive] = useState(false)
  const { postMessage } = useMessageHandler()
  const [fragmentShader, setFragmentShader] = useState(undefined);
  const [vertexShader, setVertexShader] = useState(undefined);

  const handleActiveChange = () => {
    const isActive = !active;
    setActive(isActive)
    postMessage({type: 'active', data: isActive})
  }

  const handleShaderChange = (e) => {
    const shader = Shaders.find((s) => s.name === e.target.value)
    if (shader) {
      setVertexShader(shader.vertexShader?.length ? shader.vertexShader[0] : undefined)
      setFragmentShader(shader.fragmentShaders?.length ? shader.fragmentShaders[0] : undefined)
      postMessage({type: "updateVertexShader", data: shader.vertexShader})
      postMessage({type: "updateFragmentShader", data: shader.fragmentShaders})
    }
  }

  return (
    <div className="App">
      <div>
        <Checkbox id="active" checked={active} onChange={handleActiveChange} />
        <label htmlFor="active">Active</label>
      </div>
      <div>
        <Select
          onChange={handleShaderChange}
          options={Shaders.map((shaders) => ({label: shaders.name, value: shaders.name}))}
        />
      </div>
      {(fragmentShader || vertexShader) &&
      <CanvasViewer
        getFrequency={() => Math.random() * 256}
        getFrequencyArray={() => (new Uint8Array(1024)).map(() => [Math.random() * 255, 0, 0, 1])}
        size={{width: 300, height: 150}}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
      />}
    </div>
  );
}

export default App;

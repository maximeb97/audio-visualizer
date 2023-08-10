import React, { useEffect, useState } from "react";

import { getAnalyserConfig } from "#Browser/Utils/analysers";
import Movable from "#Browser/Components/Movable/styled";
import { useMessageHandler } from "#Browser/Contexts/MessageHandler";
import CanvasViewer from "#Browser/Components/Threejs/CanvasViewer/styled";

const AppBrowser = props => {
  const [analyser, setAnalyser] = useState(undefined);
  const [analyserConfig, setAnalyserConfig] = useState(undefined);
  const [size, setSize] = useState({ width: 300, height: 250 });
  const [fragmentShader, setFShader] = useState("");
  const [vertexShader, setVShader] = useState("");
  const [isActive, setIsActive] = useState(true);

  const { addHandleMessageEvent, removeHandleMessageEvent } =
    useMessageHandler();

  useEffect(() => {
    if (!analyserConfig) {
      const config = getAnalyserConfig();
      if (config) {
        setAnalyserConfig(config);
      }
    }
  }, []);

  const getAverage = function (dataArray) {
    var total = 0, // initialize to 0
      i = 0,
      length = dataArray.length;
    while (i < length) total += dataArray[i++]; // add all
    return length ? total / length : 0; // divide (when length !== 0)
  };

  const getFreq = () => {
    if (analyser) {
      let bufferLength = analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      let res = getAverage(dataArray);
      return res;
    }
    return 0;
  };

  const toPixelArray = dataArray => {
    let newDataArray = new Uint8Array(dataArray.length * 4);
    let norm = dataArray[2] / 255;
    dataArray.map((v, i) => {
      newDataArray.set([v * norm, 0, 0, 255], i * 4);
    });
    return newDataArray;
  };

  const getFreqArray = () => {
    if (analyser) {
      let bufferLength = analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      return toPixelArray(dataArray);
    }
    return toPixelArray(new Uint8Array(1024)).map(() =>
      Math.floor(Math.random() * 255)
    );
  };

  // Setup handlers
  useEffect(() => {
    addHandleMessageEvent({
      type: "active",
      callback: ({ data }) => setIsActive(data),
    });

    addHandleMessageEvent({
      type: "updateVertexShader",
      callback: ({ data }) => {
        setVShader(data?.length ? data[0] : undefined);
      },
    });

    addHandleMessageEvent({
      type: "updateFragmentShader",
      callback: ({ data }) => {
        setFShader(data?.length ? data[0] : undefined);
      },
    });

    return () => {
      removeHandleMessageEvent("active");
      removeHandleMessageEvent("updateVertexShader");
      removeHandleMessageEvent("updateFragmentShader");
    };
  }, []);

  return (
    <Movable size={size} setSize={setSize}>
      {analyserConfig && (
        <analyserConfig.component
          setAnalyser={setAnalyser}
          {...analyserConfig.params}
        />
      )}
      {(analyser && (fragmentShader || vertexShader)) && (
        <CanvasViewer
          id="canvas"
          getFrequency={getFreq}
          getFrequencyArray={getFreqArray}
          size={size}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
        />
      )}
    </Movable>
  );
};

export default AppBrowser;

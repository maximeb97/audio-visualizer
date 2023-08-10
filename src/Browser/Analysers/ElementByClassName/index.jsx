import React, { useEffect } from 'react'
import { getFftSize } from '#Browser/Utils/analysers';

const ElementByClassName = ({ setAnalyser, classes }) => {

  useEffect(() => {
    const elements = document.querySelectorAll(classes)
    if (elements[0]) {
      const element = elements[0];
      // Check if AudioContext is already created
      if (!element.getAttribute('visualiser')) {
        element.setAttribute('visualiser', true);
        const context = new AudioContext();
        const src = context.createMediaElementSource(element);
        let analyser = context.createAnalyser();
        src.connect(analyser);
        analyser.connect(context.destination);
        analyser.fftSize = getFftSize();
        setAnalyser(analyser);
      }
    }
  }, [])
  // TODO: dependecy : router change (necessary ?)


  return (
    <></>
  )
}

export default ElementByClassName
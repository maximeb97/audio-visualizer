import React, { useEffect } from 'react'
import { getFftSize } from '#Browser/Utils/analysers';

const AudioContextHook = ({ setAnalyser }) => {
  useEffect(() => {
    // Check if hook is alredy created
    if (!AudioContext.prototype.createMediaElementSourceBak) {
      // Copy the original function
      const createMediaElementSourceBak = AudioContext.prototype.createMediaElementSource;
      // Assign the copy to another attribute
      AudioContext.prototype.createMediaElementSourceBak = createMediaElementSourceBak;
      // Modify the original function
      AudioContext.prototype.createMediaElementSource = function (e)   {
        // Create the analyser
        const src = this.createMediaElementSourceBak(e);
        let analyser = this.createAnalyser();
        src.connect(analyser);
        analyser.connect(this.destination);
        analyser.fftSize = getFftSize();
        // Set analyser state
        setAnalyser(analyser)
        return src;
      }
    }
  }, [])

  return (
    <></>
  )
}

export default AudioContextHook
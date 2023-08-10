import AudioContextHook from '#Browser/Analysers/AudioContextHook';
import ElementByClassName from '#Browser/Analysers/ElementByClassName';

export const getFftSize = () => {
  return 4096;
}

const configs = [
  {
    url: /.*soundcloud\..*/,
    component: AudioContextHook,
    params: {}
  },
  {
    url: /.*youtube\..*/,
    component: ElementByClassName,
    params: {classes: '.video-stream,.html5-main-video'}
  }
]

export const getAnalyserConfig = () => {
  const host = window.location.hostname;
  return configs.find((c) => host.match(c.url));
}
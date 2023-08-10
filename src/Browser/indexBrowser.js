import React from 'react';
import ReactDOM from 'react-dom/client';
import AppBrowser from '#Browser/Components/AppBrowser/styled';
import { MessageHandlerProvider } from '#Browser/Contexts/MessageHandler'

window.React = React;
const body = document.getElementsByTagName('body')[0];
const rootElement = document.createElement("div");
body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);

const injectedScript = document.getElementById('audio-visualiser');
const extensionId = injectedScript.getAttribute('extension-id');

root.render(
  <React.StrictMode>
    <MessageHandlerProvider extensionId={extensionId}>
      <AppBrowser />
    </MessageHandlerProvider>
  </React.StrictMode>
);
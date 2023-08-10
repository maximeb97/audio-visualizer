let externalPort = undefined;
let internalPort = undefined;

const connectedExternal = (p) => {
  externalPort = p;
}

const transferInternalMessage = (request) => {
  externalPort && externalPort.postMessage(request);
}

const connected = (p) => {
  internalPort = p;
  internalPort.onMessage.addListener(transferInternalMessage)
}

const runtime = chrome?.runtime || browser?.runtime;

runtime.onConnectExternal.addListener(connectedExternal);
runtime.onConnect.addListener(connected);
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect
} from "react";

const MessageHandlerContext = createContext();

export const MessageHandlerProvider = ({
  extensionId,
  ...props
}) => {
  const [port, setPort] = useState(undefined)
  const [handlers, setHandlers] = useState([])

  const addHandleMessageEvent = useMemo(() => (
    (handler) => {
      setHandlers((previous) => [...previous, handler]);
    }
  ), [setHandlers]);

  const removeHandleMessageEvent = useMemo(() => (
    (type) => {
      setHandlers((previous) => [
        ...previous.filter((handler) => handler.type !== type)
      ]);
    }
  ), [setHandlers]);

  const postMessage = useMemo(() => (
    ({type, data}) => {
      if (port) {
        port.postMessage({type, data});
      }
    }
  ), [port]);

  useEffect(() => {
    if (!port) {
      const runtime = window?.chrome?.runtime || window?.browser?.runtime;
      if (runtime) {
        let myPort = runtime.connect(extensionId || runtime?.id);
        setPort(myPort);
        myPort.onDisconnect.addListener(() => {
          setPort(undefined)
        })
      }
    }
  }, [port])

  // Handle message
  useEffect(() => {
    const onMessageListener = (request, sender, sendResponse) => {
          if (request?.type) {
            const handler = handlers.find((h) => h.type === request.type);

            if (handler && handler.callback) {
              handler.callback(request);
            }
          }
        }
    if (port) {
        port.onMessage.addListener(onMessageListener);
    }
    return () => {
      if (port) {
        port.onMessage.removeListener(onMessageListener);
      }
    }
  }, [handlers, port])

  const value = useMemo(() => {
    return {
      addHandleMessageEvent,
      removeHandleMessageEvent,
      postMessage
    }
  }, [
    addHandleMessageEvent,
    removeHandleMessageEvent,
    postMessage
  ])

  return <MessageHandlerContext.Provider value={value} {...props} />
}

export const useMessageHandler = () => {
  const context = useContext(MessageHandlerContext)
  return context;
}
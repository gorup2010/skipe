import { Message } from "@/types/api";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ConnectionFail } from "./pages/error/ConnectionFail";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextType {
  socket: WebSocket | undefined;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([{content: "Hello", sender: 2, createdAt: new Date()}]);
  const [error, setError] = useState(false);

  const connectWebSocket = () => {
    const ws = new WebSocket("ws://localhost:8080/chat");

    ws.onopen = () => {
      console.log("WebSocket connection established");
      setError(false);
    };

    ws.onmessage = (event: MessageEvent<string>) => {
      const message : string = event.data;
      console.log("Message received from server:", message);
      const newMsg : Message = {
        content: message,
        sender: 2,
        createdAt: new Date(),
      }
      setMessages((prevMessages) => [...prevMessages, newMsg]);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      setError(true);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setError(true);
    };

    setSocket(ws);
  };

  const retryConnection = () => {
    setError(false);
    connectWebSocket();
  };


  useEffect(() => {
    connectWebSocket();

    // Cleanup function to close the socket
    return () => socket?.close();
  }, []);

  const contextValue = useMemo(
    () => ({
      socket,
      messages,
      setMessages,
    }),
    [socket, messages]
  );

  if (error) {
    return <ConnectionFail retryConnection={retryConnection}/>
  }

  // Provide the authentication context to the children components
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

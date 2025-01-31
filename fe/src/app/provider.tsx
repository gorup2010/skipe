import { Message } from "@/types/api";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ConnectionFail } from "./pages/error/ConnectionFail";
import { Client, IMessage } from "@stomp/stompjs";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextType {
  client: Client | undefined;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  // TODO: convert to useRef
  const [client, setClient] = useState<Client | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello", sender: 2, createdAt: new Date() },
  ]);
  const [error, setError] = useState(false);

  const disconnect = useCallback(() => {
    client?.deactivate();
  }, [client]);

  const connectWebSocket = () => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/connect-ws",
    });

    client.onConnect = () => {
      client.subscribe("/topic/test", (message: IMessage) => {
        console.log("Message received from server:", message.body);
        const newMsg: Message = {
          content: message.body || "",
          sender: 2,
          createdAt: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, newMsg]);
      });
      console.log("WebSocket connection established");
      setError(false);
    };

    client.onDisconnect = () => {
      console.log("WebSocket disconnect");
      setError(true);
    };

    client.activate();
    setClient(client);
  };

  const retryConnection = () => {
    setError(false);
    connectWebSocket();
  };

  useEffect(() => {
    if (client == null) {
      connectWebSocket();
    }

    // Cleanup function to close the socket
    return disconnect;
  }, [client, disconnect]);

  const contextValue = useMemo(
    () => ({
      client,
      messages,
      setMessages,
    }),
    [client, messages]
  );

  if (error) {
    // Add disconnect to stop automatically retrying 
    disconnect();
    return <ConnectionFail retryConnection={retryConnection} />;
  }

  // Provide the authentication context to the children components
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

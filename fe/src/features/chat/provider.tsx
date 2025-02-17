import { AppContext } from "@/app/provider";
import { Chatroom, Message } from "@/types/api";
import { IMessage } from "@stomp/stompjs";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

interface ChatProviderProps {
  children: ReactNode;
}

interface ChatContextType {
  currentChatroom: Chatroom | undefined;
  setCurrentChatroom: Dispatch<SetStateAction<Chatroom | undefined>>;
  currentMessages: Message[];
  setCurrentMessages: Dispatch<SetStateAction<Message[]>>;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export const ChatProvider: FC<ChatProviderProps> = ({ children }) => {
  const [currentChatroom, setCurrentChatroom] = useState<
    Chatroom | undefined
  >();
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

  const contextValue = useMemo(
    () => ({
      currentChatroom,
      setCurrentChatroom,
      currentMessages,
      setCurrentMessages,
    }),
    [currentChatroom, currentMessages]
  );

  const appContext = useContext(AppContext);
  if (appContext?.client?.connected && currentChatroom?.id) {
    appContext.client.subscribe(
      `/topic/${currentChatroom.id}`,
      (message: IMessage) => {
        console.log(`Message received from ${currentChatroom.id}:`, message.body);
      }
    );
  }

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

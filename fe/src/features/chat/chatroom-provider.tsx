import { Chatroom, Friend, Message } from "@/types/api";
import { ChatroomInfo } from "@/types/chat-section";
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

interface ChatroomProviderProps {
  children: ReactNode;
}

interface ChatroomContextType {
  currentChatroom: ChatroomInfo | undefined;
  setCurrentChatroom: (item: Chatroom | Friend) => void;
}

export const ChatroomContext = createContext<ChatroomContextType | undefined>(
  undefined
);

export const ChatroomProvider: FC<ChatroomProviderProps> = ({ children }) => {
  const [currentChatroom, setCurrentChatroom] = useState<
    ChatroomInfo | undefined
  >();
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

  const customSetCurrentChatroom = useCallback((item: Chatroom | Friend) => {
    const id = 'chatroom' in item ? item.chatroom : item.id;
    const name = 'chatroom' in item ? item.username : item.isGroupChat ? item.name : item.members[0].username;
    const avatar = item.avatar;

    setCurrentChatroom((prev) => {
      if (prev?.id === id) return prev;
      return { id, name, avatar };
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      currentChatroom,
      setCurrentChatroom: customSetCurrentChatroom,
      currentMessages,
      setCurrentMessages,
    }),
    [currentChatroom, currentMessages, customSetCurrentChatroom]
  );

  return (
    <ChatroomContext.Provider value={contextValue}>{children}</ChatroomContext.Provider>
  );
};

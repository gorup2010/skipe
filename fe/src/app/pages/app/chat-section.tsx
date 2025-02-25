import { FC, useContext, useEffect, useState } from "react";
import { ChatCardList } from "@/features/chat/components/chat-card-list";
import { ChatroomContext } from "@/features/chat/chatroom-provider";
import { useMessages } from "@/features/chat/api/get-messages";
import { Avatar } from "flowbite-react";
import ChatInput from "./chat-input";
import { addNewMessageListener, removeNewMessageListener } from "@/features/chat/new-message-event";
import { Message } from "@/types/api";

const ChatSection: FC = () => {
  const chatroomContext = useContext(ChatroomContext);
  const messagesQuery = useMessages(chatroomContext?.currentChatroom?.id);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const handleNewMsg = (message: Message) => {
      //if (chatroomContext?.currentChatroom === message.body)
        //console.log("Chatsecion: " + message);
    };

    addNewMessageListener(handleNewMsg);

    return () => {
      removeNewMessageListener(handleNewMsg);
    };
  }, [chatroomContext?.currentChatroom]);

  useEffect(() => {
    if (messagesQuery.data !== undefined) {
      setMessages(messagesQuery.data)
    }
  }, [messagesQuery.data])

  if (chatroomContext?.currentChatroom === undefined) {
    return <div className="w-full md:w-3/4 h-full">Not select yet</div>;
  }

  if (messagesQuery.isLoading) {
    return <div className="w-full md:w-3/4 h-full">Is loading</div>;
  }

  return (
    <div className="w-full md:w-3/4 h-full">
      <div className="p-3 flex items-center">
        <Avatar alt={chatroomContext.currentChatroom.name} img={chatroomContext.currentChatroom.avatar} rounded />
        <span className="text-xl font-semibold ml-5">{chatroomContext.currentChatroom.name}</span>
      </div>
      <hr />
      <ChatCardList messages={messages}/>
      <ChatInput />
    </div>
  );
};

export default ChatSection;

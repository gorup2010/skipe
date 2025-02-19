import { FC, useContext, useEffect, useRef } from "react";
import { ChatCard } from "./chat-card";
import { ChatContext } from "../provider";
import { getAuth } from "@/lib/auth";

const ChatCardList: FC = () => {

  const auth = getAuth();
  const chatContext = useContext(ChatContext);
  const contentField = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (contentField.current != null) {
      contentField.current.scrollTop = contentField.current.scrollHeight;
    }
    else {
      console.log("Content Field is null");
    }
  };

  useEffect(() => {
    if (contentField) {
      scrollToBottom();
    }
  })

  return (
    <div ref={contentField} className="my-3 overflow-y-auto no-scrollbar max-h-[79vh] min-h-[79vh] flex flex-col space-y-2">
      {
        chatContext?.currentMessages.map((msg) => <ChatCard key={msg.id} message={msg.content} isUser={msg.sender === auth?.user.id} createdAt={msg.createdAt} />)
      }
    </div>
  );
};

export { ChatCardList };

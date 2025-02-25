import { FC, useEffect, useRef } from "react";
import { ChatCard } from "./chat-card";
import { getAuth } from "@/lib/auth";
import { Message } from "@/types/api";

interface ChatCardListProps {
  messages: Message[] | undefined;
}

const ChatCardList: FC<ChatCardListProps> = ({messages}) => {

  const auth = getAuth();

  const contentField = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (contentField.current != null) {
      contentField.current.scrollTop = contentField.current.scrollHeight;
      console.log(contentField);
    }
    else {
      console.log("Content Field is null");
    }
  };

  useEffect(() => {
    if (contentField) {
      scrollToBottom();
      console.log("heee");
    }
    console.log("he");
  }, [])

  return (
    <div ref={contentField} className="my-3 overflow-y-auto no-scrollbar max-h-[79vh] min-h-[79vh] flex flex-col space-y-2">
      {
        messages?.map((msg) => <ChatCard key={msg.id} message={msg.content} isUser={msg.sender === auth?.user.id} createdAt={msg.createdAt} />)
      }
    </div>
  );
};

export { ChatCardList };

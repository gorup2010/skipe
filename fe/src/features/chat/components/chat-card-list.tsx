import { FC, useContext, useEffect, useRef } from "react";
import { ChatCard } from "./chat-card";
import { getAuth } from "@/lib/auth";
import { Message } from "@/types/api";
import { ChatroomContext } from "../chatroom-provider";

interface ChatCardListProps {
  messages: Message[] | undefined;
}

const ChatCardList: FC<ChatCardListProps> = ({ messages }) => {
  const auth = getAuth();
  const chatroomContext = useContext(ChatroomContext);

  const contentField = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (contentField.current != null) {
      contentField.current.scrollTop = contentField.current.scrollHeight;
    } else {
      console.log("Content Field is null");
    }
  };

  useEffect(() => {
    if (contentField) {
      setTimeout(scrollToBottom, 0); // Ensure the callback is invoked after the div fully mounted onto screen.
    }
  }, [chatroomContext?.currentChatroom]);

  useEffect(() => {
    if (contentField.current !== null) {
      const shouldScroll =
        contentField.current.scrollTop + contentField.current.clientHeight + 387 >=
        contentField.current.scrollHeight;
      if (shouldScroll) {
        scrollToBottom();
      }
    }
  }, [messages]);

  return (
    <div
      ref={contentField}
      className="my-3 overflow-y-auto no-scrollbar max-h-[79vh] min-h-[79vh] flex flex-col space-y-2"
    >
      {messages?.map((msg) => (
        <ChatCard
          key={msg.id}
          message={msg.content}
          isUser={msg.sender === auth?.user.id}
          createdAt={msg.createdAt}
        />
      ))}
    </div>
  );
};

export { ChatCardList };

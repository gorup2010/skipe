import { FormEvent, KeyboardEvent, FC, useContext, useState } from "react";
import { Paperclip, SendHorizontal } from "lucide-react";
import { AppContext } from "@/app/provider";
import { ChatroomContext } from "@/features/chat/chatroom-provider";
import { getAuth } from "@/lib/auth";
import { SocketMessage } from "@/types/api";

const ChatInput: FC = () => {
  const auth = getAuth();
  const appContext = useContext(AppContext);
  const chatroomContext = useContext(ChatroomContext);
  const [content, setContent] = useState<string>("");

  const handleSubmit = (
    event: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (content.length !== 0 && appContext?.client !== undefined) {
      const msg : SocketMessage = {
        content,
        sender: auth?.user.id || -1,
        senderName: auth?.user.username || " ",
      }
      appContext.client.publish({
        destination: `/app/chat/${chatroomContext?.currentChatroom?.id}`,
        body: JSON.stringify(msg),
      });
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full px-2 flex space-x-1">
      <button
        type="button"
        className="flex items-center justify-center w-10 border-2 rounded-xl border-blue-300 "
      >
        <Paperclip color="#66B2FF" />
      </button>
      <input
        id="text-field"
        value={content}
        className="border focus:ring-gray-300 focus:outline-none border-blue-300 text-gray-700 text-sm rounded-lg ps-5 p-2.5 flex-1"
        style={{ whiteSpace: "pre-wrap" }}
        placeholder="Nội dung..."
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
      />
      <button
        type="submit"
        className="flex items-center justify-center w-10 border-2 rounded-xl border-blue-300 "
      >
        <SendHorizontal color="#66B2FF" />
      </button>
    </form>
  );
};

export default ChatInput;

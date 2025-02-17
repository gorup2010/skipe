import { Avatar } from "@/components/ui/image";
import { ChangeEvent, FC, memo, useContext, useState } from "react";
import { Paperclip, SendHorizontal } from "lucide-react";
import { ChatCardList } from "@/features/chat/components/chat-card-list";
import { AppContext } from "@/app/provider";
import { ChatContext } from "@/features/chat/provider";
import { useMessages } from "@/features/chat/api/get-messages";

const ChatSection: FC = memo(() => {
  const appContext = useContext(AppContext);
  const chatContext = useContext(ChatContext);

  // Input
  const [content, setContent] = useState<string>("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };
  const handleSend = () => {
    if (appContext !== undefined && appContext.client !== undefined) {
      appContext.client.publish({
        destination: `/app/chat/${chatContext?.currentChatroom?.id}`,
        body: content,
      });
    }
  };

  const messagesQuery = useMessages(chatContext?.currentChatroom?.id);

  if (chatContext?.currentChatroom === undefined) {
    return <div className="w-full md:w-3/4 h-full">Not select yet</div>;
  }

  if (messagesQuery.isLoading) {
    return <div className="w-full md:w-3/4 h-full">Is loading</div>;
  }

  if (messagesQuery.data) {
    chatContext.setCurrentMessages(messagesQuery.data);
  }
  else {
    console.log("messagesQuery.data is empty");
  }

  return (
    <div className="w-full md:w-3/4 h-full">
      <div className="p-3 flex items-center">
        <Avatar placeholder="US" />
        <span className="text-xl font-semibold ml-5">Username</span>
      </div>
      <hr />

      {/**Chat */}
      <ChatCardList />

      {/**Input section */}
      <div className="w-full px-2 flex space-x-1">
        <button
          type="button"
          className="flex items-center justify-center w-10 border-2 rounded-xl border-blue-300 "
        >
          <Paperclip color="#66B2FF" />
        </button>
        <input
          type="text"
          id="text-field"
          className="border focus:ring-gray-300 focus:outline-none border-blue-300 text-gray-700 text-sm rounded-lg ps-5 p-2.5 flex-1"
          style={{ whiteSpace: "pre-wrap" }}
          defaultValue=""
          ref={null}
          placeholder="Nội dung..."
          disabled={false}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className="flex items-center justify-center w-10 border-2 rounded-xl border-blue-300 "
          onClick={handleSend}
        >
          <SendHorizontal color="#66B2FF" />
        </button>
      </div>
    </div>
  );
});

export default ChatSection;

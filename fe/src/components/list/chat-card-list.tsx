import { FC, useContext } from "react";
import { ChatCard } from "@/components/ui/card";
import { AppContext } from "@/app/provider";

const ChatCardList: FC = () => {

  const appContext = useContext(AppContext);

  return (
    <div className="my-3 overflow-y-auto no-scrollbar max-h-[79vh] min-h-[79vh] flex flex-col space-y-2">
      <ChatCard key={-1} message="Hiii" isUser={true} createdAt={new Date()} />
      {
        appContext?.messages.map((msg, index) => <ChatCard key={index} message={msg.content} isUser={msg.sender === 1} createdAt={msg.createdAt} />)
      }
    </div>
  );
};

export { ChatCardList };

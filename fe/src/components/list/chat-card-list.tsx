import { FC } from "react";
import { ChatCard } from "@/components/ui/card";

const ChatCardList: FC = () => {
  return (
    <div className="my-3 overflow-y-auto no-scrollbar max-h-[79vh] min-h-[79vh] flex flex-col space-y-2">
      <ChatCard id="1" message="Hiii" isUser={true} createdAt={new Date()} />
      <ChatCard id="1" message="Hiii" isUser={false} createdAt={new Date()} />
      <ChatCard
        id="1"
        message="HiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiii"
        isUser={false}
        createdAt={new Date()}
      />
      <ChatCard
        id="1"
        message="HiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiii"
        isUser={false}
        createdAt={new Date()}
      />
      <ChatCard
        id="1"
        message="HiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiii"
        isUser={false}
        createdAt={new Date()}
      />
      <ChatCard
        id="1"
        message="HiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiii"
        isUser={false}
        createdAt={new Date()}
      />
      <ChatCard
        id="1"
        message="HiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiii"
        isUser={false}
        createdAt={new Date()}
      />
      <ChatCard
        id="1"
        message="HiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiiiHiii"
        isUser={false}
        createdAt={new Date()}
      />
    </div>
  );
};

export { ChatCardList };

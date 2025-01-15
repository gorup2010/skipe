import { FC } from "react";
import { ChatroomCard } from "@/components/ui/card";

const ChatroomList: FC = () => {
  return (
    <div className="">
      <ChatroomCard
        id="1"
        username="Lau Hoi"
        lastMessage="Siuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu"
        lastDate={new Date()}
      />
    </div>
  );
};

export { ChatroomList };

import { ChatroomContext } from "@/features/chat/chatroom-provider";
import { Friend } from "@/types/api";
import { Avatar } from "flowbite-react";
import { FC, useContext, useState } from "react";

type FriendCardProps = {
  friend: Friend
};

const FriendCard: FC<FriendCardProps> = ({ friend }) => {
  const chatroomContext = useContext(ChatroomContext);
  const [isHovered, setIsHovered] = useState(false);

  const bgColor = isHovered ? "bg-blue-200" : "";
  
  return (
    <div
      className={
        "relative flex items-center gap-4 py-4 px-2 rounded " + bgColor
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => chatroomContext?.setCurrentChatroom(friend)}
    >
      <Avatar className="w-15 h-15" img={friend.avatar} rounded />
      <div className="flex-1">{friend.username}</div>
    </div>
  );
};

export { FriendCard };

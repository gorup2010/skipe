import { FC, useState } from "react";
import { Avatar } from "flowbite-react";
import { Chatroom } from "@/types/api";
import { displayFull } from "@/utils/format-time";
import { getAuth } from "@/lib/auth";

type ChatroomCardProps = {
  chatroom: Chatroom;
};

const ChatroomCard: FC<ChatroomCardProps> = ({ chatroom }) => {
  const account = getAuth();
  const {
    name,
    avatar,
    lastModifyAt,
    lastModifyUser,
    lastMsg,
    isGroupChat,
    members,
  } = chatroom;
  const [isHovered, setIsHovered] = useState(false);

  const bgColor = isHovered ? "bg-blue-200" : "";
  const chatroomName = isGroupChat
    ? name
    : account?.user.username === members[0].username
    ? members[1].username
    : members[0].username;
  const chatroomAvatar = isGroupChat
    ? avatar
    : account?.user.username === members[0].username
    ? members[1].avatar
    : members[0].avatar;

  return (
    <div
      className={
        "relative flex items-center gap-4 py-4 px-2 rounded " + bgColor
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar img={chatroomAvatar} rounded />

      <div className="flex-1 overflow-hidden pr-16">
        {/* Added right padding to prevent text from going under the date */}
        <div className="font-normal">{chatroomName}</div>
        <div className="text-gray-500 text-sm truncate w-full">
          {lastModifyUser + ": " + lastMsg}
        </div>
      </div>

      <div className="absolute top-4 right-1 text-xs text-gray-500">
        {displayFull(lastModifyAt)}
      </div>
    </div>
  );
};

export { ChatroomCard };

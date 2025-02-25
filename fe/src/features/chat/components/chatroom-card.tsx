import { FC, Fragment, useContext, useEffect, useState } from "react";
import { Avatar } from "flowbite-react";
import { Chatroom, Message } from "@/types/api";
import { displayFull } from "@/utils/format-time";
import { getAuth } from "@/lib/auth";
import { ChatroomContext } from "../chatroom-provider";
import { AppContext } from "@/app/provider";
import { IMessage } from "@stomp/stompjs";
import { emitNewMessageEvent } from "../new-message-event";

type ChatroomCardProps = {
  chatroom: Chatroom;
  setChatrooms: React.Dispatch<React.SetStateAction<Chatroom[] | undefined>>;
};

const ChatroomCard: FC<ChatroomCardProps> = ({ chatroom }) => {
  const chatroomContext = useContext(ChatroomContext);
  const appContext = useContext(AppContext);

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
  const isSelected = chatroomContext?.currentChatroom?.id === chatroom.id;

  const bgColor = isSelected ? "bg-blue-200" : isHovered ? "bg-blue-100" : "";
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

  useEffect(() => {
    if (appContext?.client?.connected) {
      appContext.client.subscribe(
        `/topic/chat/${chatroom.id}`,
        (message: IMessage) => {
          const msg : Message = JSON.parse(message.body);
          console.log(msg);
          if (msg === undefined) {
            console.log("Message received is empty");
            return;
          }
          emitNewMessageEvent(msg);
        }
      );
    }

    return () => {
      appContext?.client?.unsubscribe(
        `/topic/chat/${chatroomContext?.currentChatroom?.id}`
      );
    };
  }, []);

  if (lastMsg === null) {
    return <Fragment></Fragment>
  }

  return (
    <div
      className={
        "relative flex items-center gap-4 py-4 px-2 rounded " + bgColor
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => chatroomContext?.setCurrentChatroom(chatroom)}
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

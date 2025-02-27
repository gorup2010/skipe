import { FC, useEffect, useState } from "react";
import { ChatroomCard } from "./chatroom-card";
import { useChatrooms } from "../api/get-chatrooms";
import { Spinner } from "flowbite-react";
import { Chatroom, Message } from "@/types/api";
import { addNewMessageListener, removeNewMessageListener } from "../new-message-event";
import { Tab } from "@/types/sidebar";

interface ChatroomListProp {
  tab: Tab;
}

const ChatroomList: FC<ChatroomListProp> = ({tab}) => {
  const chatroomsQuery = useChatrooms();
  const [chatrooms, setChatrooms] = useState<Chatroom[]>();

  useEffect(() => {
    if (chatroomsQuery.data !== undefined) {
      setChatrooms(chatroomsQuery.data);
    }
  }, [chatroomsQuery.data]);

  useEffect(() => {
    const handleNewMsg = (message: Message) => {
      const msgChatroom = chatrooms?.find(r => r.id === message.chatroom);

      if (msgChatroom === undefined) {
        console.log("Chatroom of message isn't exist");
        return;
      }

      const updatedChatroom = {...msgChatroom};
      updatedChatroom.lastMsg = message.content;
      updatedChatroom.lastModifyUser = message.senderName;
      updatedChatroom.lastModifyAt = message.createdAt;

      const newChatrooms = chatrooms?.filter(r => r.id !== message.chatroom);
      newChatrooms?.push(updatedChatroom);
      setChatrooms(newChatrooms);
    };

    addNewMessageListener(handleNewMsg);

    return () => {
      removeNewMessageListener(handleNewMsg);
    };
  }, [chatrooms]);

  if (chatroomsQuery.isLoading) {
    return <Spinner />;
  }

  if (chatroomsQuery.data == undefined) {
    return <div>There is nothing here</div>;
  }

  return (
    <div className="flex flex-col-reverse">
      {chatrooms?.map((value) => (
        // Note that ChatroomCard only showed if its lastMsg differ null.
        <ChatroomCard key={value.id} chatroom={value} tab={tab}/>
      ))}
    </div>
  );
};

export { ChatroomList };

import { FC, useEffect, useState } from "react";
import { ChatroomCard } from "./chatroom-card";
import { useChatrooms } from "../api/get-chatrooms";
import { Spinner } from "flowbite-react";
import { Chatroom, Message } from "@/types/api";
import { addNewMessageListener, removeNewMessageListener } from "../new-message-event";

const ChatroomList: FC = () => {
  const chatroomsQuery = useChatrooms();
  const [chatrooms, setChatrooms] = useState<Chatroom[]>();

  useEffect(() => {
    if (chatroomsQuery.data !== undefined) {
      setChatrooms(chatroomsQuery.data);
    }
  }, [chatroomsQuery.data]);

  useEffect(() => {
    const handleNewMsg = (message: Message) => {
      //console.log("ChatroomList: " + message);
    };

    addNewMessageListener(handleNewMsg);

    return () => {
      removeNewMessageListener(handleNewMsg);
    };
  }, []);

  if (chatroomsQuery.isLoading) {
    return <Spinner />;
  }

  if (chatroomsQuery.data == undefined) {
    return <div>There is nothing here</div>;
  }

  return (
    <div className="flex flex-col">
      {chatrooms?.map((value) => (
        <ChatroomCard key={value.id} chatroom={value} setChatrooms={setChatrooms}/>
      ))}
    </div>
  );
};

export { ChatroomList };

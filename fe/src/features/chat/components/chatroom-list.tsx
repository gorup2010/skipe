import { FC } from "react";
import { ChatroomCard } from "./chatroom-card";
import { useChatrooms } from "../api/get-chatrooms";
import { Spinner } from "flowbite-react";

const ChatroomList: FC = () => {
  const chatroomsQuery = useChatrooms();

  if (chatroomsQuery.isLoading) {
    return <Spinner />;
  }

  if (chatroomsQuery.data == undefined) {
    return <div>There is nothing here</div>;
  }

  return (
    <div className="flex flex-col-reverse">
      {
        chatroomsQuery.data.map(value => (
          <ChatroomCard key={value.id} chatroom={value} />
        ))
      }
    </div>
  );
};

export { ChatroomList };

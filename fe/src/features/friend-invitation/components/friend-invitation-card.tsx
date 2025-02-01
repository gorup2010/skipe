import { Avatar, Button } from "flowbite-react";
import { FC } from "react";

type FriendInvitationCardProps = {
  isReceived?: boolean;
  avatar: string | undefined;
  username: string;
  createdAt: Date;
};

const FriendInvitationCard: FC<FriendInvitationCardProps> = ({
  isReceived = true,
  avatar,
  username = "null",
  createdAt,
}) => {
  return (
    <div className={"relative flex items-center gap-4 px-2 py-1 rounded"}>
      <Avatar className="w-15 h-15" img={avatar} rounded />
      <div className="flex-1 flex flex-col">
        <div>{username}</div>
        <div className="font-thin text-sm">
          {"Gửi vào " + createdAt.toDateString()}
        </div>
      </div>
      {isReceived && <Button color="blue">Chấp nhận</Button>}
      <Button color="red">Xóa</Button>
    </div>
  );
};

export { FriendInvitationCard };

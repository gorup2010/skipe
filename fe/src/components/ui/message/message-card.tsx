import { FC } from "react";
import { Avatar } from "@/components/ui/image";

type MessageCardProps = {
  id: string;
  username: string;
  lastMessage: string;
  lastDate: Date;
};

const MessageCard: FC<MessageCardProps> = ({
  id,
  username,
  lastMessage,
  lastDate,
}) => {
  return (
    <div className="relative flex items-center gap-4 py-4">
      <Avatar placeholder="US" />

      <div className="flex-1 pr-16">
        {" "}
        {/* Added right padding to prevent text from going under the date */}
        <span className="font-medium block">{username}</span>
        <div className="text-gray-600 text-sm truncate">{lastMessage}</div>
      </div>

      <div className="absolute top-4 right-1 text-xs text-gray-500">
        {lastDate.toDateString()}
      </div>
    </div>
  );
};

export { MessageCard };

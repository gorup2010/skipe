import { FC, useState } from "react";
import { Avatar } from "@/components/ui/image";

type UserCardProps = {
  id: string;
  username: string;
  lastMessage: string;
  lastDate: Date;
};

const UserCard: FC<UserCardProps> = ({
  id,
  username,
  lastMessage,
  lastDate,
}) => {

  const [isHovered, setIsHovered] = useState(false);

  const bgColor = isHovered ? "bg-blue-200" : "";

  return (
    <div className={"relative flex items-center gap-4 py-4 px-2 rounded " + bgColor}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Avatar placeholder="US" />

      <div className="flex-1 overflow-hidden pr-16">
        {/* Added right padding to prevent text from going under the date */}
        <div className="font-normal">{username}</div>
        <div className="text-gray-500 text-sm truncate w-full">{lastMessage}</div>
      </div>

      <div className="absolute top-4 right-1 text-xs text-gray-500">
        {lastDate.toDateString()}
      </div>
    </div>
  );
};

export { UserCard };

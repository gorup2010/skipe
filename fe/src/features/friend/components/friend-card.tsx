import { Avatar } from "flowbite-react";
import { FC, useState } from "react";

type FriendCardProps = {
  avatar: string | undefined;
  username: string;
};

const FriendCard: FC<FriendCardProps> = ({ avatar, username = "null" }) => {
  const [isHovered, setIsHovered] = useState(false);

  const bgColor = isHovered ? "bg-blue-200" : "";
  
  return (
    <div
      className={
        "relative flex items-center gap-4 py-4 px-2 rounded " + bgColor
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar className="w-15 h-15" img={avatar} rounded />
      <div className="flex-1">{username}</div>
    </div>
  );
};

export { FriendCard };

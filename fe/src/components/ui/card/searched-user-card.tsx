import { Avatar, Button } from "flowbite-react";
import { FC } from "react";

type SearchedUserCardProps = {
  avatar: string | undefined;
  username: string;
};

const SearchedUserCard: FC<SearchedUserCardProps> = ({
  avatar,
  username = "null",
}) => {
  return (
    <div className="relative flex items-center gap-4 py-4 px-2 rounded ">
      <Avatar className="w-15 h-15" img={avatar} rounded />
      <div className="flex-1">{username}</div>
      <Button color="gray">Kết bạn</Button>
    </div>
  );
};

export { SearchedUserCard };

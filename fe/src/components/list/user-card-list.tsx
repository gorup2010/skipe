import { FC } from "react";
import { UserCard } from "@/components/ui/card";

const UserCardList: FC = () => {
  return (
    <div className="">
      <UserCard
        id="1"
        username="Lau Hoi"
        lastMessage="Siuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu"
        lastDate={new Date()}
      />
    </div>
  );
};

export { UserCardList };

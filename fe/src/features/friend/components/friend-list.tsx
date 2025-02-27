import { FC, Fragment } from "react";
import { FriendCard } from "./friend-card";
import { useFriends } from "../api/get-friends";
import { Spinner } from "flowbite-react";
import { Tab } from "@/types/sidebar";

type FriendListProps = {
  tab: Tab;
};

const FriendList: FC<FriendListProps> = ({tab}) => {
  const friendsQuery = useFriends();

  if (friendsQuery.isLoading) {
    return <Spinner />;
  }

  if (friendsQuery.data == undefined) {
    return <div>There is nothing here</div>;
  }

  if (tab !== Tab.Contacts) {
    return <Fragment></Fragment>
  }

  return (
    <div className="space-y-2">
      {
        [...friendsQuery.data].map(([, value]) => (
          <FriendCard key={value.id} friend={value}
          />
        ))
      }
    </div>
  );
};

export { FriendList };

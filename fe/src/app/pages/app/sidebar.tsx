import { BookUser, LogOut, MessageSquareMore } from "lucide-react";
import { FC, useState } from "react";

import { useLogout } from "@/hooks/use-logout";
import { Tab } from "@/types/sidebar";

import { ChatroomList } from "@/features/chat/components/chatroom-list";
import { FriendList } from "@/features/friend/components/friend-list";
import { FriendInvitationButton } from "@/features/friend-invitation/components/friend-invitation-button";
import { FriendSearchButton } from "@/features/search-user/components/search-user-button";
import { TabIconWrapper } from "@/components/ui/image/tab-icon-wrapper";
import { Avatar } from "flowbite-react";
import { useX } from "@/hooks/mutation";
import { getAuth } from "@/lib/auth";

export const Sidebar: FC = () => {
  const auth = getAuth();

  // Log out button
  const [isHoverLogout, setIsHoverLogout] = useState(false);
  const logoutStyle = isHoverLogout ? "bg-blue-200" : "";
  const { logout, isPending } = useLogout();

  // Tab
  const [tab, setTab] = useState<Tab>(Tab.Chats);

  const testMutation = useX({
    mutationConfig: {
      onSuccess: (data) => {
        console.log(data);
      }
    }
  });

  return (
    <div className="w-full h-full p-2 flex flex-col space-y-3">
      <div className="flex items-center w-full">
        <Avatar aria-placeholder="US" img={auth?.user.avatar} rounded/>
        <span className="text-xl font-semibold ml-5">{auth?.user.username}</span>
        {/**Logout button */}
        <a
          className={
            "ml-auto flex items-center justify-center rounded-xl w-10 h-10 " +
            logoutStyle
          }
          onMouseEnter={() => setIsHoverLogout(true)}
          onMouseLeave={() => setIsHoverLogout(false)}
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
          aria-disabled={isPending}
        >
          <LogOut color="#4f4f4f" />
        </a>
      </div>
      {/**Tab */}
      <div className="grid grid-cols-2">
        <TabIconWrapper
          icon={MessageSquareMore}
          placeholderTab={Tab.Chats}
          onSelect={() => setTab(Tab.Chats)}
          currTab={tab}
        />
        <TabIconWrapper
          icon={BookUser}
          placeholderTab={Tab.Contacts}
          onSelect={() => setTab(Tab.Contacts)}
          currTab={tab}
        />
      </div>
      {/**Button */}
      <div className="grid grid-cols-2 space-x-1">
        <FriendSearchButton />
        <FriendInvitationButton />
        {/* <Button onClick={() => console.log("Click")}>Click</Button> */}
      </div>
      <hr />
      <ChatroomList tab={tab}/>
      <FriendList tab={tab}/>
    </div>
  );
};

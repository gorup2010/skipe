import { ChatroomList, FriendList } from "@/components/list";
import { FriendInvitationButton } from "@/components/ui/button/friend-invitation-button";
import { FriendSearchButton } from "@/components/ui/button/friend-search-button";
import { Avatar } from "@/components/ui/image";
import { TabIconWrapper } from "@/components/ui/image/tab-icon-wrapper";
import { useLogout } from "@/hooks/use-logout";
import { Tab } from "@/types/sidebar";
import { BookUser, LogOut, MessageSquareMore } from "lucide-react";
import { FC, useState } from "react";

export const Sidebar: FC = () => {
  // Log out button
  const [isHoverLogout, setIsHoverLogout] = useState(false);
  const logoutStyle = isHoverLogout ? "bg-blue-200" : "";
  const { logout, isPending } = useLogout();

  // Tab
  const [tab, setTab] = useState<Tab>(Tab.Chats);

  return (
    <div className="w-full h-full p-2 flex flex-col space-y-3">
      <div className="flex items-center w-full">
        <Avatar placeholder="US" />
        <span className="text-xl font-semibold ml-5">Username</span>
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
      </div>
      <hr />
      {tab === Tab.Chats ? <ChatroomList /> : <FriendList />}
    </div>
  );
};

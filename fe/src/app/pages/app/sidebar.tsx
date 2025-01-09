import { UserCardList } from "@/components/list";
import { Avatar } from "@/components/ui/image";
import { IconWrapper } from "@/components/ui/image/icon-wrapper";
import { useLogout } from "@/hooks/use-logout";
import { BookUser, LogOut, MessageSquareMore, Phone } from "lucide-react";
import { FC, useState } from "react";

export const Sidebar: FC = () => {
  const [isHoverLogout, setIsHoverLogout] = useState(false);
  const logoutStyle = isHoverLogout ? "bg-blue-200" : "";

  const { logout, isPending } = useLogout();

  return (
    <div className="w-full h-full p-2 flex flex-col space-y-3">
      <div className="flex items-center w-full">
        <Avatar placeholder="US" />
        <span className="text-xl font-semibold ml-5">Username</span>
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
      <div className="grid grid-cols-3">
        <IconWrapper icon={MessageSquareMore} placeholder="Chats" />
        <IconWrapper icon={Phone} placeholder="Calls" />
        <IconWrapper icon={BookUser} placeholder="Contacts" />
      </div>
      <hr />
      <UserCardList />
    </div>
  );
};

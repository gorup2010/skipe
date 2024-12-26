import { Avatar } from "@/components/ui/image";
import { HamburgerMenu } from "@/components/ui/button";
import { FC, memo, useState } from "react";
import { BookUser, MessageSquareMore, Phone } from "lucide-react";
import { IconWrapper } from "@/components/ui/image/icon-wrapper";
import { MessageCard } from "@/components/ui/message";

const Chat: FC = memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const Profile = () => (
    <div className="flex items-center space-x-4">
      <Avatar placeholder="US" />
      <span className="text-xl font-semibold">Username</span>
    </div>
  );

  const Sidebar = () => (
    <div className="w-full h-full p-2 flex flex-col space-y-3">
      <Profile />
      <div className="grid grid-cols-3">
        <IconWrapper icon={MessageSquareMore} placeholder="Chats" />
        <IconWrapper icon={Phone} placeholder="Calls" />
        <IconWrapper icon={BookUser} placeholder="Contacts" />
      </div>
      <hr />
      <MessageCard id="1" username="Lau Hoi" lastMessage="Siuuu" lastDate={new Date()}/>
    </div>
  );

  return (
    <div className="flex flex-col divide-x-2 md:flex-row h-screen shadow-inner">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-1/4 min-w-72">
        <Sidebar />
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden top-4 w-full bg-white flex flex-row">
        <HamburgerMenu />
        <Profile />
      </div>

      {/* Main Content */}
      <div className="w-full h-full">b</div>
    </div>
  );
});

export default Chat;

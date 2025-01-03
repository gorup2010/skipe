import { Avatar } from "@/components/ui/image";
import { HamburgerMenu } from "@/components/ui/button";
import { FC, memo, useState } from "react";
import { BookUser, MessageSquareMore, Paperclip, Phone, SendHorizontal } from "lucide-react";
import { IconWrapper } from "@/components/ui/image/icon-wrapper";
import { ChatCardList, UserCardList } from "@/components/list";

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
      <UserCardList />
    </div>
  );

  return (
    <div className="flex flex-col divide-x-2 md:flex-row h-screen shadow-inner">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-1/4 min-w-72">
        <Sidebar />
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden top-4 w-full flex flex-row">
        <HamburgerMenu />
        <Profile />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 h-full">
        <div className="p-3">
          <Profile />
        </div>
        <hr />
        <ChatCardList />
        <div className="w-full px-2 flex space-x-1">
          <button
            type="button"
            className="flex items-center justify-center w-10 border-2 rounded-xl border-blue-300 "
          >
            <Paperclip color="#66B2FF"/>
          </button>
          <input
            type="text"
            id="text-field"
            className="border focus:ring-gray-300 focus:outline-none border-blue-300 text-gray-700 text-sm rounded-lg ps-5 p-2.5 flex-1"
            style={{ whiteSpace: "pre-wrap" }}
            defaultValue=""
            ref={null}
            placeholder="Nội dung..."
            disabled={false}
            required
          />
          <button
            type="button"
            className="flex items-center justify-center w-10 border-2 rounded-xl border-blue-300 "
          >
            <SendHorizontal color="#66B2FF"/>
          </button>
        </div>
      </div>
    </div>
  );
});

export default Chat;

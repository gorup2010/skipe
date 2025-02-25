import { Avatar } from "@/components/ui/image";
import { HamburgerMenu } from "@/components/ui/button";
import { FC, memo, useState } from "react";
import { Sidebar } from "./sidebar";
import ChatSection from "./chat-section";

const MainPage: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log("Main Page");

  return (
    <div className="flex flex-col divide-x-2 md:flex-row h-screen shadow-inner">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-1/4 min-w-72">
        <Sidebar />
      </div>

      {/* Mobile Hamburger Menu */}
      {/* <div className="md:hidden top-4 w-full flex flex-row">
        <HamburgerMenu />
        <div className="flex items-center space-x-4">
          <Avatar placeholder="US" />
          <span className="text-xl font-semibold">Username</span>
        </div>
      </div> */}

      {/* Main Content */}
      <ChatSection />
    </div>
  );
};

export default MainPage;

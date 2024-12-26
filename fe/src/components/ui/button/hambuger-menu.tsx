import { Menu } from "lucide-react";
import { FC } from "react";

const HamburgerMenu: FC = () => {
  return (
    <button className="p-2 hover-effect rounded-lg">
      <Menu className="h-10 w-10"/>
    </button>
  );
};

export { HamburgerMenu };
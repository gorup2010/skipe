import { FC, useState } from "react";
import { LucideIcon } from "lucide-react";
import { Tab } from "@/types/sidebar";

type TabIconProps = {
  placeholderTab: Tab;
  icon: LucideIcon;
  currTab: Tab;
  onSelect: () => void;
  size?: number;
  color?: string;
  hoverColer?: string;
  selectColer?: string;
  strokeWidth?: number;
};

// TODO: Change color change select icon.
const TabIconWrapper: FC<TabIconProps> = ({
  placeholderTab,
  icon: Icon,
  onSelect,
  currTab,
  size = 30,
  color = "#4f4f4f",
  hoverColer = "#655E5E",
  selectColer = "#42A5F5",
  strokeWidth = 1,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const iconProps = {
    size,
    color: (currTab === placeholderTab) ? selectColer : isHovered ? hoverColer : color,
    strokeWidth,
    fill: (currTab === placeholderTab) ? "white" : isHovered ? "#BDBDBD" : "white",
  };

  const textColor = (currTab === placeholderTab) ? "text-blue-400" : " text-gray-600 ";

  return (
    <div
      className="flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
    >
      <Icon {...iconProps} />
      <span className={"text-xs mt-1 font-medium " + textColor}>
        {placeholderTab.toString()}
      </span>
    </div>
  );
};

export { TabIconWrapper };
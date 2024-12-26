import { FC, useState } from "react";
import { LucideIcon } from "lucide-react";

type IconProps = {
  placeholder: string;
  icon: LucideIcon;
  size?: number;
  color?: string;
  hoverColer?: string;
  strokeWidth?: number;
};

// TODO: Change color change select icon.
const IconWrapper: FC<IconProps> = ({
  placeholder,
  icon: Icon,
  size = 30,
  color = "#4f4f4f",
  hoverColer = "#655E5E",
  strokeWidth = 1,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const iconProps = {
    size,
    color: isHovered ? hoverColer : color,
    strokeWidth,
    fill: isHovered ? "#BDBDBD" : "white",
  };

  return (
    <div
      className="flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon {...iconProps} />
      <span className="text-xs mt-1 font-medium text-gray-600">
        {placeholder}
      </span>
    </div>
  );
};

export { IconWrapper };
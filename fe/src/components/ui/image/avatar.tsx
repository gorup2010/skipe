import { FC } from "react";

type AvatarProps = {
    placeholder: string
}

const Avatar: FC<AvatarProps> = ({placeholder}) => {
  return (
    <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">{placeholder}</span>
    </div>
  );
};

export { Avatar };

import { FC, useState } from "react";

type ChatCardProps = {
  id: string;
  isUser: boolean;
  message: string;
  createdAt: Date;
};

const ChatCard: FC<ChatCardProps> = ({ id, isUser, message, createdAt }) => {
  const bgColor = isUser ? " bg-blue-100 " : " bg-gray-200 ";
  const align = isUser ? " flex-row-reverse " : " ";
  const rounded = isUser
    ? " rounded-[10px] rounded-br-none "
    : " rounded-[10px] rounded-bl-none ";

  return (
    <div className={"flex items-start p-2 " + align}>
      <div
        className={
          "w-fit p-4 font-sans text-sm font-normal text-gray-900 max-w-sm ms-2 break-all flex flex-col items-end whitespace-normal" +
          bgColor +
          rounded
        }
      >
        <p className=" text-gray-900 font-normal overflowWrap">
          {message + ""}
        </p>
        <p className="font-extralight text-xs">{createdAt.toDateString()}</p>
      </div>
    </div>
  );
};

export { ChatCard };

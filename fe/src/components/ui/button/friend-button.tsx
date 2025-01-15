import { FriendModal } from "@/components/modal";
import { UserPlus } from "lucide-react";
import { FC, useState } from "react";


const FriendButton: FC = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
    <button
      type="button"
      className="font-light text-blue-500 border border-blue-400 rounded-3xl text-sm py-2 flex items-center justify-center space-x-2"
      onClick={() => setOpenModal(true)}
    >
      <UserPlus size={19} />
      <span>Kết bạn</span>
    </button>

    <FriendModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export { FriendButton };

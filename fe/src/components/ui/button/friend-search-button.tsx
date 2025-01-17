import { FriendSearchModal } from "@/components/modal";
import { UserPlus } from "lucide-react";
import { FC, useState } from "react";

const FriendSearchButton: FC = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        type="button"
        className="font-light text-blue-500 border border-blue-400 rounded-xl text-sm py-2 flex items-center justify-center space-x-2"
        onClick={() => setOpenModal(true)}
      >
        <UserPlus size={19} />
        <span>Kết bạn</span>
      </button>

      <FriendSearchModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export { FriendSearchButton };

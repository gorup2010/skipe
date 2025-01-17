import { FriendInvitationModal } from "@/components/modal";
import { Handshake } from "lucide-react";
import { FC, useState } from "react";

const FriendInvitationButton: FC = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        type="button"
        className="font-light text-blue-500 border border-blue-400 rounded-xl text-sm py-2 flex items-center justify-center space-x-2"
        onClick={() => setOpenModal(true)}
      >
        <Handshake size={19} />
        <span>Lời mời</span>
      </button>

      <FriendInvitationModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export { FriendInvitationButton };

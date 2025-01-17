import { ChangeEvent, FC, useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { SearchedUserCard } from "../ui/card";

type FriendSearchModalProps = {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
};

const FriendSearchModal: FC<FriendSearchModalProps> = ({ openModal, setOpenModal }) => {
  const [username, setUsername] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Kết bạn</Modal.Header>
      <Modal.Body>
        <div className="w-[75%] inline-block">
          <TextInput
            className="inline"
            type="text"
            sizing="lg"
            placeholder="Nhập username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <Button className="inline-block ml-6" color="blue" size="lg">Tìm kiếm</Button>

        {/**Searched User List */}
        <div className="min-h-60 py-2">
          <SearchedUserCard avatar="" username="Null"/>
          <SearchedUserCard avatar="" username="Null"/>
          <SearchedUserCard avatar="" username="Null"/>
        </div>

      </Modal.Body>
    </Modal>
  );
};

export { FriendSearchModal };

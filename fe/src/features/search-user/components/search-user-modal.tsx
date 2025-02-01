import { FC, useRef, useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { useSearchUser } from "../api/search-user";
import { SearchUserCard } from "./search-user-card";

type FriendSearchModalProps = {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
};

const FriendSearchModal: FC<FriendSearchModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  const [username, setUsername] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchUserQuery= useSearchUser(username, page);

  const onClickSearch = () => {
    setUsername(inputRef.current?.value || "");
  }

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
            ref={inputRef}
          />
        </div>
        <Button className="inline-block ml-6" color="blue" size="lg" onClick={onClickSearch}>
          Tìm kiếm
        </Button>

        {/**Searched User List */}
        <div className="min-h-60 py-2">
          {searchUserQuery.data?.map((user) => (
            <SearchUserCard
              key={user.id}
              user={user}
            />
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { FriendSearchModal };

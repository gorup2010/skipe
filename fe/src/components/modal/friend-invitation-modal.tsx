import { FC } from "react";
import { Accordion, Modal } from "flowbite-react";
import { FriendInvitationList } from "../list/friend-invitation-list";

type FriendInvitationModalProps = {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
};

const FriendInvitationModal: FC<FriendInvitationModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Lời mời kết bạn</Modal.Header>
      <Modal.Body className="min-h-96">
        <Accordion>
          <Accordion.Panel>
            <Accordion.Title>Lời mời nhận được</Accordion.Title>
            <Accordion.Content>
              <FriendInvitationList />
            </Accordion.Content>
          </Accordion.Panel>

          <Accordion.Panel>
            <Accordion.Title>Lời mời đã gửi</Accordion.Title>
            <Accordion.Content>
              <FriendInvitationList isReceived={false} />
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </Modal.Body>
    </Modal>
  );
};

export { FriendInvitationModal };

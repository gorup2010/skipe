import { FC } from "react";
import { Accordion, Modal } from "flowbite-react";
import { FriendInvitationList } from "./friend-invitation-list";
import { useFriendInvitations } from "../api/get-friend-invitation";

type FriendInvitationModalProps = {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
};

const FriendInvitationModal: FC<FriendInvitationModalProps> = ({
  openModal,
  setOpenModal,
}) => {

  const friendInvitationsQuery = useFriendInvitations();

  if (friendInvitationsQuery.isLoading) {
    return <div>Loading...</div>
  }

  if (friendInvitationsQuery.data === undefined) {
    return <div>Something wrong happen</div>
  }

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Lời mời kết bạn</Modal.Header>
      <Modal.Body className="min-h-96">
        <Accordion>
          <Accordion.Panel>
            <Accordion.Title>Lời mời nhận được</Accordion.Title>
            <Accordion.Content>
              <FriendInvitationList invitations={friendInvitationsQuery.data.asReveiver}/>
            </Accordion.Content>
          </Accordion.Panel>

          <Accordion.Panel>
            <Accordion.Title>Lời mời đã gửi</Accordion.Title>
            <Accordion.Content>
              <FriendInvitationList invitations={friendInvitationsQuery.data.asSender} isReceived={false} />
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </Modal.Body>
    </Modal>
  );
};

export { FriendInvitationModal };

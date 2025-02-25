// Information of the users login to website
export type Account = {
  id: number;
  email: string;
  username: string;
  avatar: string;
};

export type User = {
  id: number;
  username: string;
  avatar: string;
}

export type Friend = {
  id: number;
  username: string;
  avatar: string;
  chatroom: number;
}

export type FriendInvitation = {
  id: number;
  sender: User;
  receiver: User;
  createdAt: string;
}

export type FriendInvitationGetDto = {
  sentInvt: FriendInvitation[];
  receivedInvt: FriendInvitation[];
}

export type AuthResponse = {
  jwt: string;
  user: Account;
};

export type Message = {
  id: number;
  chatroom: number;
  content: string;
  sender: number;
  createdAt: string;
}

export type SocketMessage = {
  content: string;
  senderName: string;
  sender: number;
}

export type Notication = {
  type?: "NEW_FRIEND" | "NEW_FRIEND_INVITATION"
}

export type Chatroom = {
  id: number;
  name: string;
  avatar: string;
  isGroupChat: boolean;
  lastMsg: string;
  lastModifyAt: string;
  lastModifyUser: string;
  members: User[];
}
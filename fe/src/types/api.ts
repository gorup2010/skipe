// Information of the users login to website
export type Account = {
  id: number;
  email: string;
  username: string;
  avatar: string;
};

// Information of the other users like friends, searched users,...
export type User = {
  id: number;
  username: string;
  avatar: string;
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
  content: string;
  sender: number;
  createdAt: string;
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
}
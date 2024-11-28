export type User = {
  id: string;
  email: string;
  username: string;
};

export type AuthResponse = {
  jwt: string;
  user: User;
};

export type User = {
  email: string;
  username: string;
};

export type AuthResponse = {
  jwt: string;
  user: User;
};

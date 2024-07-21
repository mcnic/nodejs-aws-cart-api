export interface User {
  id?: string;
  name: string;
  email?: string;
  password?: string;
}

export type UserDto = Omit<User, 'id'>;

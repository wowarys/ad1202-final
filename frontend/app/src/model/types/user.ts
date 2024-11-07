export interface User {
  id?: number | string;
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  password?: string;
}

export interface UserProfile {
  name: string;
  age: number;
  bio: string;
  username: string;
  user_id: string;
}

class User {
  id: string;
  email: string;
}

export class AuthModel {
  accessToken: string;
  user: User;
}
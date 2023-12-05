import User from "./User";

type LoginResponse = {
  user: User;
  token: string;
};

export default LoginResponse;

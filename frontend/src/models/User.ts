type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  authenticationMethod: string;
  photoUrl?: string;
};

export default User;

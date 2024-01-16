type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  address?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  dateOfBirth?: string;
  creditCard?: string;
  authenticationMethod: string;
  photoUrl?: string;
};

export default User;

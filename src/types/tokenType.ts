export type DecodedToken = {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER' | 'BARBER';
  exp: number;     
};

export type DecodedToken = {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'BARBER';
  exp: number;     
};

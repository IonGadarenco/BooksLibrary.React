export interface AuthResponseDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'vip' | 'user';
}
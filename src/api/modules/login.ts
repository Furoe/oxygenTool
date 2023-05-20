import { post } from '@/api/http';

interface loginParam {
  username: string;
  password: string;
}
export function login(params: loginParam) {
  return post('/api/auth/login', params);
}

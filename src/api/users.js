import { http } from './http';

export const usersApi = {
  async register({ username, email, password, role }) {
    return await http.post('/users/registration/', { username, email, password, role });
  }
};



import { http } from './http';

export const authApi = {
  async login({ username, email, password }) {
    // dj-rest-auth expects either username or email along with password
    const payload = { password };
    if (username) payload.username = username;
    if (email) payload.email = email;
    return await http.post('/auth/login/', payload);
  },

  async logout() {
    return await http.post('/auth/logout/', {});
  },

  async me() {
    // Returns user details if logged in
    return await http.get('/auth/user/');
  }
};



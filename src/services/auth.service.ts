import { session } from './session.repository';

class AuthService {
  private readonly baseUrl = `http://192.168.15.17:3000`;

  public async login(username: string, password: string) {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: `POST`,
      headers: {
        [`Content-Type`]: `application/json`,
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!!data && !!data.token) {
      await session.setLoggedUser(data);

      return true;
    }

    return false;
  }
}

export const authService = new AuthService();

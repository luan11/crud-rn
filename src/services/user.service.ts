import { session } from './session.repository';

class UserService {
  private readonly baseUrl = `http://192.168.15.17:3000`;

  public async register(name: string, username: string, password: string) {
    const loggedUser = await session.getLoggedUser();

    if (loggedUser) {
      const response = await fetch(`${this.baseUrl}/users`, {
        method: `POST`,
        headers: {
          [`Content-Type`]: `application/json`,
          [`Authorization`]: `Bearer ${loggedUser.token}`,
        },
        body: JSON.stringify({ name, username, password, roles: [] }),
      });

      const data = await response.json();

      return !!data && !!data.id;
    }

    return false;
  }
}

export const userService = new UserService();

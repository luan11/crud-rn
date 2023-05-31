import { session } from './session.repository';

type User = {
  name: string;
  username: string;
  password: string;
};

class UserService {
  private readonly url = `http://192.168.15.17:3000/users`;

  private async getHeaders() {
    const loggedUser = await session.getLoggedUser();

    if (!loggedUser) {
      throw new Error(`Invalid login.`);
    }

    return {
      [`Content-Type`]: `application/json`,
      [`Authorization`]: `Bearer ${loggedUser.token}`,
    };
  }

  public async register(user: User) {
    const headers = await this.getHeaders();

    const res = await fetch(this.url, {
      method: `POST`,
      headers,
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (!data?.id) {
      throw new Error(data?.message);
    }
  }

  public async update(id: number, user: User) {
    const headers = await this.getHeaders();

    const res = await fetch(`${this.url}/${id}`, {
      method: `PUT`,
      headers,
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (!data?.name) {
      throw new Error(data?.message);
    }
  }

  public async remove(id: number) {
    const headers = await this.getHeaders();

    try {
      await fetch(`${this.url}/${id}`, {
        method: `DELETE`,
        headers,
      });
    } catch (error) {
      throw new Error(`Failed to delete.`);
    }
  }

  public async list() {
    const headers = await this.getHeaders();

    const res = await fetch(this.url, {
      method: `GET`,
      headers,
    });

    const data = await res.json();

    if (data?.statusCode) {
      throw new Error(data.message);
    }

    return data;
  }
}

export const userService = new UserService();

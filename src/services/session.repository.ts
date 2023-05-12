import AsyncStorage from '@react-native-async-storage/async-storage';

class SessionRepository {
  private readonly key = `LOGGED_USER`;

  public async setLoggedUser(user: any) {
    await AsyncStorage.setItem(this.key, JSON.stringify(user));
  }

  public async getLoggedUser() {
    const user = await AsyncStorage.getItem(this.key);

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public async logoff() {
    await AsyncStorage.removeItem(this.key);
  }
}

export const session = new SessionRepository();

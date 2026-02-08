import config from "../../../config.json";
import { AuthRepository } from "../../domain/repositories/AuthRepository";

const DEFAULT_USER = {
  id: "demo-user-id",
  email: "demo@clientview.local",
  raw_user_meta_data: {
    first_name: "Demo",
    last_name: "User",
  },
};

const buildMockSession = (user) => ({
  access_token: `demo_access_${Date.now()}`,
  refresh_token: `demo_refresh_${Date.now()}`,
  user,
});

export class AuthRepositoryMockImpl extends AuthRepository {
  constructor() {
    super();
    this.currentUser = config?.user_data || DEFAULT_USER;
  }

  async signInWithPassword({ email, password }) {
    if (!email || !password) {
      return {
        data: null,
        error: { message: "Email and password are required" },
      };
    }

    const user = {
      ...(config?.user_data || DEFAULT_USER),
      email,
    };
    this.currentUser = user;

    return {
      data: {
        user,
        session: buildMockSession(user),
      },
      error: null,
    };
  }

  async signUp({ email, password, first_name, last_name }) {
    if (!email || !password) {
      return {
        data: null,
        error: { message: "Email and password are required" },
      };
    }

    const user = {
      ...(config?.user_data || DEFAULT_USER),
      id: `demo_${Date.now()}`,
      email,
      raw_user_meta_data: {
        first_name: first_name || "Demo",
        last_name: last_name || "User",
      },
    };
    this.currentUser = user;

    return {
      data: {
        user,
        session: buildMockSession(user),
      },
      error: null,
    };
  }

  async signOut() {
    this.currentUser = null;
    return { error: null };
  }

  async getCurrentUser() {
    return {
      data: {
        user: this.currentUser,
      },
      error: null,
    };
  }
}

export const authRepositoryMock = new AuthRepositoryMockImpl();

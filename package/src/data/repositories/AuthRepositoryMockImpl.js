import config from "../../../config.json";
import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { createSession } from "../../domain/entities/Session";
import { createUser } from "../../domain/entities/User";

const DEFAULT_USER = {
  id: "demo-user-id",
  email: "demo@clientview.local",
  raw_user_meta_data: {
    first_name: "Demo",
    last_name: "User",
  },
};

const mapToDomainUser = (user) =>
  createUser({
    id: user.id,
    email: user.email,
    first_name: user?.raw_user_meta_data?.first_name || "",
    last_name: user?.raw_user_meta_data?.last_name || "",
    raw_user_meta_data: user?.raw_user_meta_data || {},
  });

const buildMockSession = (user) =>
  createSession({
    access_token: `demo_access_${Date.now()}`,
    refresh_token: `demo_refresh_${Date.now()}`,
    user,
  });

export class AuthRepositoryMockImpl extends AuthRepository {
  constructor() {
    super();
    this.currentUser = mapToDomainUser(config?.user_data || DEFAULT_USER);
  }

  async signInWithPassword({ email, password }) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const rawUser = {
      ...(config?.user_data || DEFAULT_USER),
      email,
    };
    const user = mapToDomainUser(rawUser);
    this.currentUser = user;

    return {
      user,
      session: buildMockSession(user),
    };
  }

  async signUp({ email, password, first_name, last_name }) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const rawUser = {
      ...(config?.user_data || DEFAULT_USER),
      id: `demo_${Date.now()}`,
      email,
      raw_user_meta_data: {
        first_name: first_name || "Demo",
        last_name: last_name || "User",
      },
    };
    const user = mapToDomainUser(rawUser);
    this.currentUser = user;

    return {
      user,
      session: buildMockSession(user),
    };
  }

  async signOut() {
    this.currentUser = null;
  }

  async getCurrentUser() {
    return this.currentUser;
  }
}

export const authRepositoryMock = new AuthRepositoryMockImpl();

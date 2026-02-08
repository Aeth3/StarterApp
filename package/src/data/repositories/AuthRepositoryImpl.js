import { supabase } from "../../../lib/supabase";
import { AuthRepository } from "../../domain/repositories/AuthRepository";

export class AuthRepositoryImpl extends AuthRepository {
  async signInWithPassword({ email, password }) {
    return supabase.auth.signInWithPassword({ email, password });
  }

  async signUp({ email, password, first_name, last_name }) {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
        },
      },
    });
  }

  async signOut() {
    return supabase.auth.signOut();
  }

  async getCurrentUser() {
    return supabase.auth.getUser();
  }
}

export const authRepository = new AuthRepositoryImpl();

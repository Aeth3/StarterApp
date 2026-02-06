import { supabase } from "../../../lib/supabase";

export class AuthRepositoryImpl {
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
}

export const authRepository = new AuthRepositoryImpl();

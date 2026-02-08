import { supabase } from "../../../lib/supabase";
import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { createSession } from "../../domain/entities/Session";
import { createUser } from "../../domain/entities/User";

const mapSupabaseUser = (user) => {
  if (!user) return null;

  const first_name =
    user?.user_metadata?.first_name ||
    user?.raw_user_meta_data?.first_name ||
    "";
  const last_name =
    user?.user_metadata?.last_name ||
    user?.raw_user_meta_data?.last_name ||
    "";

  return createUser({
    id: user.id,
    email: user.email,
    first_name,
    last_name,
    raw_user_meta_data: user.raw_user_meta_data || user.user_metadata || {},
  });
};

export class AuthRepositoryImpl extends AuthRepository {
  async signInWithPassword({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      throw new Error(error.message || "Sign in failed");
    }

    const user = mapSupabaseUser(data?.user);
    const session = createSession({
      access_token: data?.session?.access_token,
      refresh_token: data?.session?.refresh_token,
      user,
    });

    return { user, session };
  }

  async signUp({ email, password, first_name, last_name }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
        },
      },
    });

    if (error) {
      throw new Error(error.message || "Sign up failed");
    }

    const user = mapSupabaseUser(data?.user);
    const session = data?.session
      ? createSession({
          access_token: data?.session?.access_token,
          refresh_token: data?.session?.refresh_token,
          user,
        })
      : null;

    return { user, session };
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message || "Sign out failed");
    }
  }

  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw new Error(error.message || "Could not load current user");
    }

    return mapSupabaseUser(data?.user) || null;
  }
}

export const authRepository = new AuthRepositoryImpl();

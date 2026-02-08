import { DEMO_MODE } from "@env";
import { authRepository as authRepositorySupabase } from "../data/repositories/AuthRepositoryImpl";
import { authRepositoryMock } from "../data/repositories/AuthRepositoryMockImpl";
import { sessionRepository } from "../data/repositories/SessionRepositoryImpl";
import { setAccessTokenProvider } from "../infra/http/apiClient";
import { makeSignInWithPassword } from "../domain/usecases/SignInWithPassword";
import { makeSignUp } from "../domain/usecases/SignUp";
import { makeSignOut } from "../domain/usecases/SignOut";
import { makeGetCurrentUser } from "../domain/usecases/GetCurrentUser";
import { makeSaveSession } from "../domain/usecases/SaveSession";
import { makeGetSession } from "../domain/usecases/GetSession";
import { makeGetAccessToken } from "../domain/usecases/GetAccessToken";
import { makeClearSession } from "../domain/usecases/ClearSession";

const isDemoMode = String(DEMO_MODE).toLowerCase() === "true";
const authRepository = isDemoMode
  ? authRepositoryMock
  : authRepositorySupabase;

export const signInWithPassword = makeSignInWithPassword({ authRepository });
export const signUp = makeSignUp({ authRepository });
export const signOut = makeSignOut({ authRepository });
export const getCurrentUser = makeGetCurrentUser({ authRepository });
export const saveSession = makeSaveSession({ sessionRepository });
export const getSession = makeGetSession({ sessionRepository });
export const getAccessToken = makeGetAccessToken({ sessionRepository });
export const clearSession = makeClearSession({ sessionRepository });

setAccessTokenProvider(async () => {
  const result = await getAccessToken();
  return result?.ok ? result.value : null;
});

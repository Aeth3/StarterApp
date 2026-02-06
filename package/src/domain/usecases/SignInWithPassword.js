import { authRepository } from "../../data/repositories/AuthRepositoryImpl";

export const signInWithPassword = ({ email, password }) =>
  authRepository.signInWithPassword({ email, password });

import { authRepository } from "../../data/repositories/AuthRepositoryImpl";

export const signUp = ({ email, password, first_name, last_name }) =>
  authRepository.signUp({ email, password, first_name, last_name });

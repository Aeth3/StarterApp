import { authRepository } from "../../data/repositories/AuthRepositoryImpl";

export const signOut = () => authRepository.signOut();

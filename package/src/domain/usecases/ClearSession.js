import { sessionRepository } from "../../data/repositories/SessionRepositoryImpl";

export const clearSession = () => sessionRepository.clearSession();


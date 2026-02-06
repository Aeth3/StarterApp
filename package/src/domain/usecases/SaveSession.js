import { sessionRepository } from "../../data/repositories/SessionRepositoryImpl";

export const saveSession = (session) => sessionRepository.saveSession(session);

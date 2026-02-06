import { sessionRepository } from "../../data/repositories/SessionRepositoryImpl";

export const getSession = () => sessionRepository.getSession();

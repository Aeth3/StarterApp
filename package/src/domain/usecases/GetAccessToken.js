import { sessionRepository } from "../../data/repositories/SessionRepositoryImpl";

export const getAccessToken = () => sessionRepository.getAccessToken();

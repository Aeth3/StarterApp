export const makeSaveSession = ({ sessionRepository }) => {
  return (session) => sessionRepository.saveSession(session);
};

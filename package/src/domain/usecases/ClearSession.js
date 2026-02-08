export const makeClearSession = ({ sessionRepository }) => {
  return () => sessionRepository.clearSession();
};

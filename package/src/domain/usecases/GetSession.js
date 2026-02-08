export const makeGetSession = ({ sessionRepository }) => {
  return () => sessionRepository.getSession();
};

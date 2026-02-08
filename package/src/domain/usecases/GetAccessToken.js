export const makeGetAccessToken = ({ sessionRepository }) => {
  return () => sessionRepository.getAccessToken();
};

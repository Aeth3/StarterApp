export const makeGetCurrentUser = ({ authRepository }) => {
  return () => authRepository.getCurrentUser();
};

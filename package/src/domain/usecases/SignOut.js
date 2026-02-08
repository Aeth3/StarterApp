export const makeSignOut = ({ authRepository }) => {
  return () => authRepository.signOut();
};

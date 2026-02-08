export const makeSignInWithPassword = ({ authRepository }) => {
  return ({ email, password }) =>
    authRepository.signInWithPassword({ email, password });
};

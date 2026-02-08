export const makeSignUp = ({ authRepository }) => {
  return ({ email, password, first_name, last_name }) =>
    authRepository.signUp({ email, password, first_name, last_name });
};

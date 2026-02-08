/**
 * Domain contract for auth operations.
 * Outer layers must provide a concrete implementation.
 */
export class AuthRepository {
  async signInWithPassword(_credentials) {
    throw new Error("AuthRepository.signInWithPassword() not implemented");
  }

  async signUp(_payload) {
    throw new Error("AuthRepository.signUp() not implemented");
  }

  async signOut() {
    throw new Error("AuthRepository.signOut() not implemented");
  }

  async getCurrentUser() {
    throw new Error("AuthRepository.getCurrentUser() not implemented");
  }
}

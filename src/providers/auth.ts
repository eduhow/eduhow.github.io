import type { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  login: async () => {
    throw new Error("Not implemented");
  },
  register: async () => {
    throw new Error("Not implemented");
  },
  check: async () => {
    return {
      authenticated: true,
    };
  },
  getIdentity: async () => {
    return {
      id: 0,
      email: "user@example.com",
    };
  },
  getPermissions: async () => {
    throw new Error("Not implemented");
  },
  logout: async () => {
    throw new Error("Not implemented");
  },
  onError: async () => {
    throw new Error("Not implemented");
  },
};

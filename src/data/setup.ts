// auth setup
export const authSetup = {
  tokenAccessor: "token",
  authPage: "/auth/login", // the exact login page
  homePage: "/",
};

// #rbac-setup
export const rbacSetup = {
  roles: ["admin", "employee"],
  homePage: {
    admin: "/admin",
    employee: "/employee",
  },
  publicRoutes: ["/verification"],
  authRoutes: ["/auth", "/auth/login"], // pages that are used for authentication purposes
};

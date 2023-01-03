import { types } from "../../../auth";

describe("Test in types", () => {
  test("Should return action types", () => {
    expect(types).toEqual({
      login: "[Auth] Login",
      logout: "[Auth] Logout",
    });
  });
});

import { types } from "../../../auth";
import { authReducer } from "../../../auth/context/authReducer";

describe("Test in authReducer", () => {
  test("Should return default state", () => {
    const state = authReducer({ logged: false }, {});

    expect(state).toEqual({ logged: false });
  });

  test("Should call login function anf authenticate user", () => {
    const action = {
      type: types.login,
      payload: {
        id: 123,
        name: "Juan",
      },
    };

    const state = authReducer({ logged: false }, action);

    expect(state).toEqual({
      logged: true,
      user: action.payload,
    });
  });

  test("Should call logout function, delete user name and set logged in false", () => {
    const state = {
      logged: true,
      user: { id: 123, name: "Juan" },
    };

    const action = {
      type: types.logout,
    };

    const newState = authReducer(state, action);

    expect(newState).toEqual({ logged: false, user: null });
  });
});

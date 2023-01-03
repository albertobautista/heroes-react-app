import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth";
import { AppRouter } from "../../router/AppRouter";

describe("Test in AppRouter", () => {
  test("Should show login page if the user is not authenticated", () => {
    const contextValue = {
      logged: false,
    };
    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByText("Login").length).toBe(2);
  });

  test("Should show marvel component if the user is authenticated", () => {
    const contextValue = {
      logged: true,
      user: {
        id: 123,
        name: "Alberto",
      },
    };

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getAllByText("Marvel").length).toBeGreaterThanOrEqual(1);
  });
});

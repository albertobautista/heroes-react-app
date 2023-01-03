import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth";
import { Navbar } from "../../../ui/components/Navbar";

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

describe("Test in Navbar", () => {
  const contextValue = {
    logged: true,
    user: {
      name: "Juan",
      id: 123,
    },
    logout: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());
  test("Should show the username", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
        )
      </MemoryRouter>
    );

    expect(screen.getByText("Juan")).toBeTruthy();
  });
  test("Should call logout function and navigate to login page when user click on the logout button", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
        )
      </MemoryRouter>
    );

    const logoutButton = screen.getByRole("button");
    fireEvent.click(logoutButton);

    expect(contextValue.logout).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});

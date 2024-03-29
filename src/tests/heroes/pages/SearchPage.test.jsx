import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../heroes/pages/SearchPage";

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

describe("Test in SearchPage", () => {
  beforeEach(() => jest.clearAllMocks());

  test("Should show correctly with default values", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  test("Should show batman and input with query string value", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    const img = screen.getByRole("img");

    expect(input.value).toBe("batman");
    expect(img.src).toContain("/assets/heroes/dc-batman.jpg");
  });

  test("sShould show an error if not found a hero(batman123)", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const alert = screen.getByLabelText("alert-danger");
    expect(alert).toBeTruthy();
  });
  test("Should call navigate function to the new page", () => {
    const inputValue = "superman";
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");

    fireEvent.change(input, {
      target: { name: "searchText", value: inputValue },
    });

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);
  });
});

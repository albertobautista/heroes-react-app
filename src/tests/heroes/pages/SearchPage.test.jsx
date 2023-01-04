import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../heroes/pages/SearchPage";

describe("Test in SearchPage", () => {
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
});

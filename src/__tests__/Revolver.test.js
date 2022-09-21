import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Revolver from "../components/Revolver";

const validProps = {
  handleClick: jest.fn(),
};

const setup = () => render(<Revolver {...validProps} />);

describe("Revolver", () => {
  it("matches snapshot", () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });

  beforeEach(() => setup());

  it("renders a button", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("clicking button calls handleClick function", () => {
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(validProps.handleClick).toHaveBeenCalled();
  });
});

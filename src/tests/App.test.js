import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../components/App";

it("App matches snapshot", () => {
  const { asFragment } = render(<App />);

  expect(asFragment()).toMatchSnapshot();
});

test("renders learn react link", () => {
  render(<App />);

  expect(screen.getByTestId("app")).toBeInTheDocument();
});

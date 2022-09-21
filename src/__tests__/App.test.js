import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../components/App";

describe("App", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a heading", () => {
    render(<App />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renders a the content area", () => {
    render(<App />);

    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("renders a the revolver area", () => {
    render(<App />);

    expect(screen.getByTestId("revolver")).toBeInTheDocument();
  });
});

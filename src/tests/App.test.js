import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../components/App";

describe("App", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("is rendered", () => {
    render(<App />);

    expect(screen.getByTestId("app")).toBeInTheDocument();
  });
});

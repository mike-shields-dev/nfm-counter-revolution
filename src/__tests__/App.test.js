import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../components/App";

const validProps = {
  figures: [
    {
      id: 0,
      title: "figure 0",
      angle: 0,
      text: [
        "Figure 0 Paragraph 1",
        "Figure 0 Paragraph 2",
        "Figure 0 Paragraph 3",
      ],
    },
    {
      id: 1,
      title: "figure 1",
      angle: -60,
      text: [
        "Figure 1 Paragraph 1",
        "Figure 1 Paragraph 2",
        "Figure 1 Paragraph 3",
      ],
    },
    {
      id: 2,
      title: "figure 2",
      angle: -120,
      text: [
        "Figure 2 Paragraph 1",
        "Figure 2 Paragraph 2",
        "Figure 2 Paragraph 3",
      ],
    },
  ],
};
const renderApp = () => render(<App {...validProps} />);

describe("App", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderApp();

    expect(asFragment()).toMatchSnapshot();
  });

  beforeEach(() => renderApp());

  it("renders the Content component", () => {
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("renders the disc component", () => {
    expect(screen.getByTestId("disc")).toBeInTheDocument();
  });
});

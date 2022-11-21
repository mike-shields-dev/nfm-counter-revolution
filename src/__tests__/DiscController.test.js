import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DiscController from "../components/DiscController";

const validProps = {
  index: 0,
  incrementIndex: jest.fn(),
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
    {
      id: 3,
      title: "figure 3",
      angle: -180,
      text: [
        "Figure 3 Paragraph 1",
        "Figure 3 Paragraph 2",
        "Figure 3 Paragraph 3",
      ],
    },
    {
      id: 4,
      title: "figure 4",
      angle: -240,
      text: [
        "Figure 4 Paragraph 1",
        "Figure 4 Paragraph 2",
        "Figure 4 Paragraph 3",
      ],
    },
    {
      id: 5,
      title: "figure 5",
      angle: -300,
      text: [
        "Figure 5 Paragraph 1",
        "Figure 5 Paragraph 2",
        "Figure 5 Paragraph 3",
      ],
    },
  ],
};

const renderDiscController = () => render(<DiscController {...validProps} />);

describe("DiscController", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderDiscController();

    expect(asFragment()).toMatchSnapshot();
  });

  beforeEach(() => renderDiscController());

  it("renders a Disc component", () => {
    expect(screen.getByTestId("disc")).toBeInTheDocument();
  });

  it("renders a button", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("clicking button calls incrementIndex function", () => {
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(validProps.incrementIndex).toHaveBeenCalled();
  });
});

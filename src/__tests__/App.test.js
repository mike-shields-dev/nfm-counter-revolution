import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
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

  it("renders a heading", () => {
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renders the Content component", () => {
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("renders the Revolver component", () => {
    expect(screen.getByTestId("revolver")).toBeInTheDocument();
  });
});

describe("Revolver component", () => {
  beforeEach(() => renderApp());

  it("button correctly updates Content component text content", () => {
    const button = screen.getByRole("button");

    validProps.figures.forEach((figure, i) => {
      expect(screen.queryByText(figure.text[0])).toBeInTheDocument();

      fireEvent.click(button);

      if (i === validProps.figures.length - 1) {
        expect(
          screen.queryByText(validProps.figures[0].text[0])
        ).toBeInTheDocument();
      } else {
        expect(screen.queryByText(figure.text[0])).toEqual(null);
      }
    });
  });

  it("button correctly updates heading text content", () => {
    const button = screen.getByRole("button");

    validProps.figures.forEach((figure, i) => {
      expect(screen.queryByText(figure.title)).toBeInTheDocument();

      fireEvent.click(button);

      if (i === validProps.figures.length - 1) {
        expect(
          screen.queryByText(validProps.figures[0].title)
        ).toBeInTheDocument();
      } else {
        expect(screen.queryByText(figure.title)).toEqual(null);
      }
    });
  });
});

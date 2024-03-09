import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

describe("Layout", () => {
  test("renders children inside layout with header", () => {
    const childText = <div data-testid="test-child">Test Child</div>;
    render(<Layout>{childText}</Layout>);

    const headerElement = screen.getByTestId("translate-logo-text");
    expect(headerElement).toBeInTheDocument();

    const childElement = screen.getByTestId("test-child");
    expect(childElement).toBeInTheDocument();
  });
});

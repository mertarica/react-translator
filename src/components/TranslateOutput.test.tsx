import React from "react";
import { render, screen } from "@testing-library/react";
import TranslateOutput from "./TranslateOutput";
import { TranslatorProvider } from "../contexts/Translator";

describe("TranslateOutput", () => {
  test("should render TranslateOutput component", () => {
    render(
      <TranslatorProvider>
        <TranslateOutput />
      </TranslatorProvider>
    );

    expect(screen.getByPlaceholderText("Translation")).toBeInTheDocument();
  });
});

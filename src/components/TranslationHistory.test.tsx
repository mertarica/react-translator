import React from "react";
import { render, screen } from "@testing-library/react";
import TranslationHistory from "./TranslationHistory";

const translations = [
  { id: "1", sourceText: "Hello", targetText: "Hola" },
  { id: "2", sourceText: "Goodbye", targetText: "Adiós" },
];

jest.mock("../contexts/Translator", () => ({
  useTranslator: jest.fn(() => ({
    state: {
      translations: [...translations],
    },
  })),
}));

describe("TranslationHistory", () => {
  test("renders translation history cards", () => {
    render(<TranslationHistory />);

    translations.forEach((translation) => {
      expect(screen.getByText(translation.sourceText)).toBeInTheDocument();
      expect(screen.getByText(translation.targetText)).toBeInTheDocument();
    });
  });
});

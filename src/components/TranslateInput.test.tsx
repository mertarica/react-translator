import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import TranslateInput from "./TranslateInput";
import { TranslatorProvider } from "../contexts/Translator";

describe("TranslateInput", () => {
  test("should render TranslateInput component", () => {
    render(
      <TranslatorProvider>
        <TranslateInput />
      </TranslatorProvider>
    );

    expect(
      screen.getByPlaceholderText("Write some text...")
    ).toBeInTheDocument();
  });

  test("should update text value on input change", () => {
    render(
      <TranslatorProvider>
        <TranslateInput />
      </TranslatorProvider>
    );

    const inputElement = screen.getByPlaceholderText("Write some text...");
    fireEvent.change(inputElement, { target: { value: "Hello, World!" } });

    expect(inputElement).toHaveValue("Hello, World!");
    expect(screen.getByText("13 / 5000")).toBeInTheDocument();
  });

  test("should disabled mic button when auto detection", async () => {
    render(
      <TranslatorProvider>
        <TranslateInput />
      </TranslatorProvider>
    );

    const detectButton = screen.getByText("Detect Language");
    fireEvent.click(detectButton);

    await waitFor(() => {
      expect(screen.getByTestId("mic-icon")).toBeDisabled();
    });

    const turkishButton = screen.getByText("Turkish");
    fireEvent.click(turkishButton);

    await waitFor(() => {
      expect(screen.getByTestId("mic-icon")).not.toBeDisabled();
    });
  });
});

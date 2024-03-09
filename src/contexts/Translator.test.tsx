import React from "react";
import { renderHook, act, waitFor } from "@testing-library/react";
import { TranslatorProvider, useTranslator } from "./Translator";

jest.mock("axios");

describe("TranslatorProvider", () => {
  const wrapper = ({ children }: any) => (
    <TranslatorProvider>{children}</TranslatorProvider>
  );

  test("should start with initial values", () => {
    const { result } = renderHook(() => useTranslator(), { wrapper });

    expect(result.current.state.sourceLanguage).toEqual("en");
    expect(result.current.state.targetLanguage).toEqual("tr");
  });

  test("should set source language", async () => {
    const { result } = renderHook(() => useTranslator(), {
      wrapper,
    });

    act(() => {
      result.current.setSourceLanguage("tr");
    });

    await waitFor(() => {
      expect(result.current.state.sourceLanguage).toBe("tr");
    });
  });

  test("should set target language", async () => {
    const { result } = renderHook(() => useTranslator(), {
      wrapper,
    });

    act(() => {
      result.current.setTargetLanguage("en");
    });

    await waitFor(() => {
      expect(result.current.state.targetLanguage).toBe("en");
    });
  });

  test("should add translate", async () => {
    const { result } = renderHook(() => useTranslator(), {
      wrapper,
    });
    act(() => {
      result.current.addTranslation({
        id: "test",
        sourceLanguage: "en",
        sourceText: "hello",
        targetLanguage: "tr",
        targetText: "merhaba",
      });
    });
    await waitFor(() => {
      expect(result.current.state.translations[0].sourceText).toBe("hello");
    });
    await waitFor(() => {
      expect(result.current.state.translations[0].targetText).toBe("merhaba");
    });
  });

  test("should set loading state", async () => {
    const { result } = renderHook(() => useTranslator(), {
      wrapper,
    });

    act(() => {
      result.current.setLoading(true);
    });

    await waitFor(() => {
      expect(result.current.state.isLoading).toBe(true);
    });
  });
});

import { renderHook, act } from "@testing-library/react";
import useSpeechRecognition from "./useSpeechRecognition";

describe("useSpeechRecognition", () => {
  let mockSpeechRecognition: any;
  let mockStart: jest.Mock;
  let mockStop: jest.Mock;

  beforeEach(() => {
    mockStart = jest.fn();
    mockStop = jest.fn();
    mockSpeechRecognition = jest.fn().mockImplementation(() => ({
      lang: "",
      onresult: null,
      onend: null,
      start: mockStart,
      stop: mockStop,
    }));

    (window as any).SpeechRecognition = mockSpeechRecognition;
    (window as any).webkitSpeechRecognition = mockSpeechRecognition;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should start listening", () => {
    const { result } = renderHook(() => useSpeechRecognition());

    act(() => {
      result.current.startListening("en-US");
    });

    expect(mockStart).toHaveBeenCalled();
    expect(result.current.listening).toBe(true);
  });

  test("should stop listening", () => {
    const { result } = renderHook(() => useSpeechRecognition());

    act(() => {
      result.current.startListening("en-US");
      result.current.stopListening();
    });

    expect(mockStop).toHaveBeenCalled();
    expect(result.current.listening).toBe(false);
  });
});

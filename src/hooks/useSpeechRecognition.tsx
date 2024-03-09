import { useState, useEffect } from "react";

type SpeechRecognitionHook = {
  listening: boolean;
  transcript: string;
  startListening: (language: string) => void;
  stopListening: () => void;
};

type SpeechRecognitionResult = {
  item: (index: number) => { transcript: string };
};

type SpeechRecognitionEvent = {
  results: SpeechRecognitionResult[];
  error?: SpeechRecognitionError;
};

type SpeechRecognitionError = {
  error: string;
};

const useSpeechRecognition = (): SpeechRecognitionHook => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  let recognition: any = null;

  const startListening = (language: string) => {
    recognition = new ((window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition)();
    recognition.lang = language;
    recognition.onresult = handleResult;
    recognition.onend = () => {
      setListening(false);
    };
    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setListening(false);
    }
  };

  const handleResult = (event: SpeechRecognitionEvent) => {
    const result = event.results[0];
    if (result) {
      const transcript = result.item(0).transcript;
      setTranscript(transcript);
    }
  };

  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  return { listening, transcript, startListening, stopListening };
};

export default useSpeechRecognition;

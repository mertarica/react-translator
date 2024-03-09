import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

type Language = "" | "en" | "fr" | "es" | "tr";

interface Translation {
  id: string;
  sourceLanguage: Language;
  targetLanguage: Language;
  sourceText: string;
  targetText: string;
}

interface TranslatorState {
  sourceLanguage: Language;
  targetLanguage: Language;
  translations: Translation[];
  isLoading: boolean;
}

export interface TranslatorContextType {
  state: TranslatorState;
  setSourceLanguage: (language: Language) => void;
  setTargetLanguage: (language: Language) => void;
  addTranslation: (translation: Translation) => void;
  translate: (text: string) => void;
  setLoading: (isLoading: boolean) => void;
}

interface TranslationResponseType {
  text: string;
  to: string;
}

interface ResponseType {
  detectLanguage: {
    language: string;
    score: number;
  };
  translations: TranslationResponseType[];
}

const initialState: TranslatorState = {
  sourceLanguage: "en",
  targetLanguage: "tr",
  translations: [],
  isLoading: false,
};

const TranslatorContext = createContext<TranslatorContextType | undefined>(
  undefined
);

export const useTranslator = (): TranslatorContextType => {
  const context = useContext(TranslatorContext);
  if (!context) {
    throw new Error("useTranslator must be used within a TranslatorProvider");
  }
  return context;
};

interface TranslatorProviderProps {
  children: ReactNode;
}

export const TranslatorProvider = ({
  children,
}: TranslatorProviderProps): JSX.Element => {
  const [state, setState] = useState<TranslatorState>(initialState);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const setSourceLanguage = (language: Language): void => {
    setState((prevState) => ({ ...prevState, sourceLanguage: language }));
  };

  const setTargetLanguage = (language: Language): void => {
    setState((prevState) => ({ ...prevState, targetLanguage: language }));
  };

  const addTranslation = (translation: Translation): void => {
    setState((prevState) => ({
      ...prevState,
      isLoading: false,
      translations: [...prevState.translations, translation],
    }));
  };

  const translate = (text: string): void => {
    setLoading(true);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    if (text === "") {
      setLoading(false);
      return;
    }
    const newTimeout = setTimeout(async () => {
      const key = "447b15528d5f4e4b91b38d772d9c1b61";
      const endpoint = "https://api.cognitive.microsofttranslator.com";
      const location = "germanywestcentral";
      const uuid = uuidv4().toString();

      let params = new URLSearchParams();
      params.append("api-version", "3.0");
      if (state.sourceLanguage) {
        params.append("from", state.sourceLanguage);
      }
      params.append("to", state.targetLanguage);

      axios({
        baseURL: endpoint,
        url: "/translate",
        method: "post",
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Ocp-Apim-Subscription-Region": location,
          "Content-type": "application/json",
          "X-ClientTraceId": uuid,
        },
        params,
        data: [
          {
            text,
          },
        ],
        responseType: "json",
      })
        .then((response) => {
          return response.data[0];
        })
        .then((result: ResponseType) => {
          const translate = result.translations.find(
            (el: TranslationResponseType) => el.to === state.targetLanguage
          );
          addTranslation({
            id: uuid,
            sourceLanguage: state.sourceLanguage,
            targetLanguage: state.targetLanguage,
            sourceText: text,
            targetText: translate?.text || "",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
    setDebounceTimeout(newTimeout);
  };

  const setLoading = (isLoading: boolean): void => {
    setState((prevState) => ({ ...prevState, isLoading }));
  };

  const contextValue: TranslatorContextType = {
    state,
    setSourceLanguage,
    setTargetLanguage,
    addTranslation,
    translate,
    setLoading,
  };

  return (
    <TranslatorContext.Provider value={contextValue}>
      {children}
    </TranslatorContext.Provider>
  );
};

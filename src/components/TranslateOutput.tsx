import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { useTranslator } from "../contexts/Translator";

function TranslateOutput() {
  const {
    state: { targetLanguage, translations, isLoading },
    setTargetLanguage,
  } = useTranslator();
  const [showCopyMessage, setCopyMessage] = useState(false);

  const handleCopy = () => {
    const text = translations[translations.length - 1]?.targetText;
    navigator.clipboard.writeText(text);
    setCopyMessage(true);
    setTimeout(() => {
      setCopyMessage(false);
    }, 1500);
  };

  return (
    <div className="translate-output-container">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={targetLanguage}
          onChange={(e, value) => setTargetLanguage(value)}
          aria-label="target language bar"
          variant="scrollable"
          scrollButtons={false}
          allowScrollButtonsMobile
        >
          <Tab label="English" value="en" />
          <Tab label="Turkish" value="tr" />
          <Tab label="French" value="fr" />
          <Tab label="Spanish" value="es" />
        </Tabs>
      </Box>
      <TextField
        multiline
        minRows={4}
        maxRows={12}
        placeholder="Translation"
        variant="filled"
        disabled
        className="translate-output-field"
        value={
          isLoading
            ? "Translating..."
            : translations[translations.length - 1]?.targetText
        }
      />
      <div className="translate-output-tools">
        <IconButton
          aria-label="copy text button"
          type="button"
          onClick={() => handleCopy()}
        >
          <ContentCopyIcon />
        </IconButton>
        {showCopyMessage && (
          <span className="translate-output-copy-message">Text Copied!</span>
        )}
      </div>
    </div>
  );
}

export default TranslateOutput;

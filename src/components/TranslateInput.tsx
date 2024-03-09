import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

import { useTranslator } from "../contexts/Translator";
import useSpeechRecognition from "../hooks/useSpeechRecognition";

function TranslateInput() {
  const {
    state: { sourceLanguage, targetLanguage },
    setSourceLanguage,
    translate,
  } = useTranslator();
  const { listening, startListening, stopListening, transcript } =
    useSpeechRecognition();
  const [text, setText] = useState("");

  useEffect(() => {
    translate(text);
  }, [text, sourceLanguage, targetLanguage]);

  useEffect(() => {
    setText(transcript);
  }, [transcript]);

  return (
    <div className="translate-input-container">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={sourceLanguage}
          onChange={(e, value) => setSourceLanguage(value)}
          aria-label="source language bar"
          variant="scrollable"
          scrollButtons={false}
          allowScrollButtonsMobile
        >
          <Tab label="Detect Language" value="" />
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
        placeholder="Write some text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="translate-input-field"
      />
      <div className="translate-input-tools">
        <IconButton
          aria-label="toggle mic listening"
          disabled={sourceLanguage === ""}
          data-testid="mic-icon"
          onClick={() => {
            listening ? stopListening() : startListening(sourceLanguage);
          }}
        >
          {listening ? <MicOffIcon /> : <MicIcon />}
        </IconButton>
        <div className="translate-input-character-counter">
          {text.length} / 5000
        </div>
      </div>
    </div>
  );
}

export default TranslateInput;

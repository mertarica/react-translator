import React from "react";
import "./styles/Main.scss";

import { TranslatorProvider } from "./contexts/Translator";

import Box from "@mui/material/Box";
import Layout from "./components/Layout";
import TranslateInput from "./components/TranslateInput";
import TranslateOutput from "./components/TranslateOutput";
import TranslationHistory from "./components/TranslationHistory";

function App() {
  return (
    <TranslatorProvider>
      <Layout>
        <div className="App">
          <Box className="translator">
            <TranslateInput />
            <TranslateOutput />
          </Box>
          <TranslationHistory />
        </div>
      </Layout>
    </TranslatorProvider>
  );
}

export default App;

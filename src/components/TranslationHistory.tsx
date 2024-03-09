import * as React from "react";

import { useTranslator } from "../contexts/Translator";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function TranslationHistory() {
  const {
    state: { translations },
  } = useTranslator();

  return (
    <div className="translation-history">
      {translations.reverse().map((translation) => (
        <Card className="translation-history-card" key={translation.id}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="body1" component="div">
                {translation.sourceText}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {translation.targetText}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}

export default TranslationHistory;

"use client";

import { useContext, useState } from "react";
import { marked } from "marked";
import parse from "html-react-parser";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Loader from "../components/Loader";
import { HistoryContext } from "@/contexts/HistoryContext";

export default function Home() {
  const [prompt, setPrompt] = useState(
    "Can Gemini take chat history for context?"
  );
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const { chatHistory, addHistory } = useContext(HistoryContext);

  function formatResult(geminiRawResult) {
    const formattedResult = marked(geminiRawResult);

    console.log(formattedResult);
    return formattedResult;
  }

  async function sendPrompt() {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, chatHistory }),
      });
      const data = await res.json();

      // Add to history context
      addHistory(prompt, data);

      const formattedResult = formatResult(data.content || data.error);
      setResult(formattedResult);
    } catch (error) {
      setResult("Unable to chat to Gemini currently.");
    } finally {
      setLoading(false);
    }
  }

  return (
    //TODO: Make your UI look better by adding additional elements and styles as you wish! Possibly add your styles to a new css file called chatbot.css, and import that file in this page
    <Stack spacing={2}>
      {loading && <Loader />}
      <TextField
        label="Gemini Prompt"
        color="success"
        multiline
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your prompt..."
      />
      <br />
      <Button variant="contained" size="large" onClick={sendPrompt}>
        Generate
      </Button>
      <div>{parse(result)}</div>
    </Stack>
  );
}

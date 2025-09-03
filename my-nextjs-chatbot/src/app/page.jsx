"use client";

import { useState } from "react";
import { marked } from "marked";
import parse from "html-react-parser";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Home() {
  const [prompt, setPrompt] = useState("Why does durian stink?");
  const [result, setResult] = useState("");

  function formatResult(geminiRawResult) {
    const formattedResult = marked(geminiRawResult);

    console.log(formattedResult);
    return formattedResult;
  }

  async function sendPrompt() {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    const formattedResult = formatResult(data.content || data.error);
    setResult(formattedResult);
  }

  return (
    //TODO: Make your UI look better by adding additional elements and styles as you wish! Possibly add your styles to a new css file called chatbot.css, and import that file in this page
    <main style={{ padding: "2rem" }}>
      <h1>My Next.js Chatbot</h1>
      <TextField
        label="Gemini Prompt"
        multiline
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your prompt..."
      />
      <br />
      <Button variant="contained" onClick={sendPrompt}>
        Generate
      </Button>
      <div>{parse(result)}</div>
    </main>
  );
}

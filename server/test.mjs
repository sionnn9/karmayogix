const API = "http://localhost:11434/api/chat";

import { floodData } from "./data.mjs";

// -------- CHAT MEMORY --------
let messages = [
  {
    role: "system",
    content: `
You are an AI assistant for a Smart IoT Flood Prevention System.
You have access to this dataset: ${JSON.stringify(floodData)}.

Use this dataset when answering or analyzing questions.
Be concise and helpful.
`,
  },
];

async function sendMessage(userText) {
  // Add user message to memory
  messages.push({ role: "user", content: userText });

  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "mistral",
      messages,
    }),
  });

  // Read streamed response
  const text = await res.text();
  const lines = text.trim().split("\n");

  let reply = "";

  for (const line of lines) {
    if (!line) continue;
    const obj = JSON.parse(line);
    if (obj.message?.content) {
      reply += obj.message.content;
    }
  }

  // Save assistant reply in memory
  messages.push({ role: "assistant", content: reply });

  return reply;
}

(async () => {
  console.log(await sendMessage("Which area is most flood-prone?"));
  console.log("\n---- NEXT QUESTION ----\n");
  console.log(await sendMessage("Why is it high risk?"));
  console.log(
    await sendMessage("So where should i start with my smart iot system?"),
  );
})();

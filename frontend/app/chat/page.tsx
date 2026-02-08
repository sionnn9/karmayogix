"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { floodData } from "../data.js";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

interface ChatMessage {
  role: string;
  content: string;
}

// Your flood data

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Chat memory for context
  const chatMemory = useRef<ChatMessage[]>([
    {
      role: "system",
      content: `
You are an AI assistant for a Smart IoT Flood Prevention System.
You have access to this dataset: ${JSON.stringify(floodData)}.

Use this dataset when answering or analyzing questions.
Be concise and helpful.
`,
    },
  ]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessageToOllama = async (userText: string): Promise<string> => {
    const API = "http://localhost:11434/api/chat";

    // Add user message to memory
    chatMemory.current.push({ role: "user", content: userText });

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "mistral",
          messages: chatMemory.current,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // Read streamed response
      const text = await res.text();
      const lines = text.trim().split("\n");

      let reply = "";

      for (const line of lines) {
        if (!line) continue;
        try {
          const obj = JSON.parse(line);
          if (obj.message?.content) {
            reply += obj.message.content;
          }
        } catch (e) {
          console.error("Error parsing line:", line);
        }
      }

      // Save assistant reply in memory
      chatMemory.current.push({ role: "assistant", content: reply });

      return reply;
    } catch (error) {
      console.error("Error calling Ollama:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();

    // Add user message to UI
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: userText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Get AI response
      const aiResponse = await sendMessageToOllama(userText);

      // Add assistant message to UI
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: aiResponse,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: "Sorry, I couldn't connect to the AI service. Make sure Ollama is running on http://localhost:11434",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Flood Prevention AI Assistant
          </h1>
          <p className="text-sm text-slate-500">
            Ask me about flood risks and sensor data
          </p>
        </div>

        {/* Home Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="p-2 mr-2 rounded-lg bg-slate-100 hover:bg-blue-100 transition duration-200 flex items-center justify-center sm:p-2.5 md:p-3"
        >
          <span className="text-lg sm:text-xl">🏠</span>
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-2xl space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-5xl mb-4">🌊</div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Ask About Flood Prevention
              </h2>
              <p className="text-slate-500 mb-4">I can help you with:</p>
              <div className="text-left space-y-2 text-sm text-slate-600">
                <p>• Which areas are most flood-prone?</p>
                <p>• Where should sensors be placed?</p>
                <p>• What&apos;s the risk level in specific areas?</p>
                <p>• How to prioritize flood prevention efforts?</p>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-slate-900 border border-slate-200 rounded-bl-none shadow-sm"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.text}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg bg-white text-slate-900 border border-slate-200 rounded-bl-none shadow-sm">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <p className="text-sm text-slate-500">Thinking...</p>
                </div>
              </div>
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg">
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about flood risks, sensor placement..."
              disabled={isLoading}
              className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none disabled:bg-slate-50 disabled:cursor-not-allowed"
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

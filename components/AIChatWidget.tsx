"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidGlassCard } from "./ui/LiquidGlassCard";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: number;
  buttons?: { text: string; action: string }[];
}

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load conversation from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("solvexai-chat");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Initial AI greeting
      addAIMessage(
        "Hi! I'm here to help. What kind of business do you have?",
        []
      );
    }
  }, []);

  // Save conversation to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("solvexai-chat", JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addAIMessage = (
    text: string,
    buttons?: { text: string; action: string }[]
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "ai",
      timestamp: Date.now(),
      buttons,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userInput = inputValue.trim();
    addUserMessage(userInput);
    setInputValue("");
    processUserInput(userInput);
  };

  const processUserInput = (input: string) => {
    setIsTyping(true);

    // Simulate AI thinking (1-2 seconds)
    const delay = Math.random() * 1000 + 1000;

    setTimeout(() => {
      setIsTyping(false);
      const response = getAIResponse(input.toLowerCase());
      addAIMessage(response.text, response.buttons);
    }, delay);
  };

  const getAIResponse = (
    input: string
  ): { text: string; buttons?: { text: string; action: string }[] } => {
    // Restaurant detection
    if (input.includes("restaurant") || input.includes("food")) {
      return {
        text: "Perfect! Restaurant Delight ($497) is our most popular template. It includes online ordering, reservations, and menu management. Want to see a live demo?",
        buttons: [
          { text: "Yes, show me", action: "https://solvexai.com/templates/restaurant" },
          { text: "Tell me more", action: "more-restaurant" },
          { text: "Book a call", action: "https://cal.com/solvexai" },
        ],
      };
    }

    // AI Receptionist
    if (
      input.includes("ai") ||
      input.includes("receptionist") ||
      input.includes("phone") ||
      input.includes("call")
    ) {
      return {
        text: "Our AI answers your business calls 24/7. It sounds human, handles FAQs, books appointments, and never misses a customer. Costs 90% less than hiring staff. Want a demo call?",
        buttons: [
          { text: "Call me now", action: "https://cal.com/solvexai/demo-call" },
          { text: "See pricing", action: "https://solvexai.com/#pricing" },
          { text: "Learn more", action: "more-ai-receptionist" },
        ],
      };
    }

    // Pricing
    if (input.includes("price") || input.includes("cost") || input.includes("$")) {
      return {
        text: "We have 3 tiers: Website Templates ($297-$997), Custom Development ($2,497+), and AI Receptionist ($197/month). Which interests you most?",
        buttons: [
          { text: "Templates", action: "https://solvexai.com/templates" },
          { text: "Custom Dev", action: "https://cal.com/solvexai/custom" },
          { text: "AI Receptionist", action: "more-ai-receptionist" },
        ],
      };
    }

    // Template inquiry
    if (input.includes("template") || input.includes("website")) {
      return {
        text: "We have pre-built templates for: Restaurants, Gyms, Salons, Consulting, E-commerce, and more. All include mobile design, SEO, and 24/7 support. Which industry?",
        buttons: [
          { text: "See all templates", action: "https://solvexai.com/templates" },
          { text: "Book consultation", action: "https://cal.com/solvexai" },
        ],
      };
    }

    // Default fallback
    return {
      text: "Great question! Let me connect you with a human who can give you the best answer.",
      buttons: [
        { text: "Book 15-min consultation →", action: "https://cal.com/solvexai" },
      ],
    };
  };

  const handleButtonClick = (action: string) => {
    if (action.startsWith("http")) {
      window.open(action, "_blank");
    } else if (action === "more-restaurant") {
      addUserMessage("Tell me more about the restaurant template");
      processUserInput("Tell me more about the restaurant template");
    } else if (action === "more-ai-receptionist") {
      addUserMessage("Tell me more about the AI receptionist");
      processUserInput("Tell me more about the AI receptionist");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-[9999]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring" }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Badge */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute -top-3 -left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg whitespace-nowrap"
              >
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Try our AI →
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Button */}
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden">
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Icon */}
            <svg
              className="w-8 h-8 text-white relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              )}
            </svg>
          </div>
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-28 right-6 z-[9999] w-[380px] h-[500px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-10rem)]"
          >
            <LiquidGlassCard
              intensity="heavy"
              glowColor="#8B5CF6"
              className="h-full flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Assistant</h3>
                    <p className="text-xs text-white/60">Online • Instant replies</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-purple-600 to-purple-500 text-white rounded-2xl rounded-tr-sm"
                          : "bg-white/10 backdrop-blur-xl text-white rounded-2xl rounded-tl-sm border border-white/20"
                      } px-4 py-2 shadow-lg`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>

                      {/* CTA Buttons */}
                      {message.buttons && message.buttons.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.buttons.map((button, idx) => (
                            <motion.button
                              key={idx}
                              onClick={() => handleButtonClick(button.action)}
                              className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {button.text}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl rounded-tl-sm px-4 py-3 border border-white/20">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-white/60 rounded-full"
                            animate={{ y: [0, -8, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  />
                  <motion.button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-br from-purple-600 to-purple-500 text-white p-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </LiquidGlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;

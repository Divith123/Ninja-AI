"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { type CoreMessage } from "ai";
import ChatInput from "./chat-input";
import { readStreamableValue } from "ai/rsc";
import { FaUserNinja, FaRobot } from "react-icons/fa";
import { continueConversation } from "../app/actions";
import { toast } from "sonner";
import remarkGfm from "remark-gfm";
import { MemoizedReactMarkdown } from "./markdown";
import { AnimatePresence, motion } from "framer-motion";
import { FiInfo, FiAlertTriangle } from "react-icons/fi";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Model Badge component
const ModelBadge = ({ model }: { model: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm",
        "bg-ninja/10 border-ninja/20 dark:bg-ninja-dark/20 dark:border-ninja-dark/30",
        "font-poppins"
      )}
    >
      <span className="font-medium dark:text-zinc-200">
        {model.replace("ninja-ai-", "").toUpperCase()}
      </span>
    </motion.div>
  );
};

export default function Chat() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("ninja-ai-pro");
  const [isGenerating, setIsGenerating] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    setMessages([]);
    toast.success(
      `Switched to ${newModel.replace("ninja-ai-", "").toUpperCase()} mode`
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const updatedMessages: CoreMessage[] = [
      ...messages,
      { role: "user", content: input }
    ];

    setMessages(updatedMessages);
    setInput("");
    setIsGenerating(true);

    try {
      const result = await continueConversation(updatedMessages, model);

      for await (const content of readStreamableValue(result)) {
        setMessages((prev) => [
          ...updatedMessages,
          { role: "assistant", content: content as string }
        ]);
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // If there are no messages yet, show the initial container
  if (messages.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          "relative mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-4",
          "pb-[8rem] pt-[6rem] md:px-0 md:pt-[4rem] xl:pt-[2rem]",
          "font-poppins"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-ninja/5 to-white/50",
            "dark:from-ninja-dark/10 dark:to-zinc-900/50"
          )}
        />

        <div className="relative z-10 space-y-8">
          {/* Title section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="text-center">
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Your intelligent assistant for all things AI.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              "mt-8 space-y-6 rounded-2xl bg-gradient-to-br from-white/50 to-white/10 p-6 backdrop-blur-lg",
              "dark:from-zinc-900/50 dark:to-zinc-900/10"
            )}
          >
            <div className="flex items-center gap-3 text-sm font-medium">
              <FiInfo className="h-5 w-5 text-ninja dark:text-ninja-dark" />
              <h2 className="text-lg dark:text-zinc-200">Important Notes</h2>
            </div>

            {/* Updated Important Notes section */}
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <FiAlertTriangle className="mt-1 h-4 w-4 text-yellow-500" />
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Ninja AI uses advanced neural networks with built-in rate
                  limiting. Please use responsibly and avoid sharing sensitive
                  information.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <FiAlertTriangle className="mt-1 h-4 w-4 text-yellow-500" />
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  All interactions are logged for quality assurance. Developed
                  by{" "}
                  <a
                    href="https://github.com/Divith123"
                    className="text-ninja hover:underline dark:text-ninja-dark"
                  >
                    Ninja
                  </a>
                  .
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Input area for the first user message */}
        <div
          className={cn(
            "fixed bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-white via-white/90",
            "dark:from-zinc-900 dark:via-zinc-900/90"
          )}
        >
          <ChatInput
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            model={model}
            handleModelChange={handleModelChange}
            isGenerating={isGenerating}
          />
        </div>
      </motion.div>
    );
  }

  // Main chat interface once user messages exist
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-3xl px-4 py-24 md:px-0 font-poppins"
      )}
    >
      <div className="relative space-y-8">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="group flex items-start gap-4 p-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 rounded-xl transition-colors"
            >
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border shadow-sm transition-all",
                  m.role === "user"
                    ? "bg-white border-zinc-200 group-hover:border-ninja/30 dark:bg-zinc-800 dark:border-zinc-700"
                    : "bg-ninja/10 border-ninja/20 group-hover:border-ninja/40 dark:bg-ninja-dark/20 dark:border-ninja-dark/30"
                )}
              >
                {m.role === "user" ? (
                  <FaUserNinja className="h-6 w-6 text-zinc-600 dark:text-zinc-300" />
                ) : (
                  <FaRobot className="h-6 w-6 text-ninja dark:text-ninja-dark" />
                )}
              </div>

              <div className="flex-1 space-y-2 overflow-hidden">
                <MemoizedReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className={cn(
                    "prose prose-sm break-words dark:prose-invert",
                    "prose-pre:rounded-xl prose-pre:bg-zinc-100 prose-pre:p-4 prose-pre:shadow-sm",
                    "dark:prose-pre:bg-zinc-800/50"
                  )}
                >
                  {m.content as string}
                </MemoizedReactMarkdown>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 p-4 text-zinc-500"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ninja/10 border border-ninja/20 dark:bg-ninja-dark/20 dark:border-ninja-dark/30">
              <FaRobot className="h-6 w-6 text-ninja animate-pulse dark:text-ninja-dark" />
            </div>
            <div className="h-2 w-24 rounded-full bg-zinc-200 animate-pulse dark:bg-zinc-700" />
          </motion.div>
        )}
      </div>

      <div ref={messageEndRef} />

      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-20 bg-gradient-to-t",
          "from-white via-white/90 dark:from-zinc-900 dark:via-zinc-900/90 pb-4"
        )}
      >
        <div className="mx-auto max-w-3xl px-4 md:px-0">
          <div className="flex items-center justify-between mb-4">
            <ModelBadge model={model} />
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {messages.length} message{messages.length > 1 ? "s" : ""}
            </span>
          </div>
          <ChatInput
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            model={model}
            handleModelChange={handleModelChange}
            isGenerating={isGenerating}
          />
        </div>
      </div>
    </div>
  );
}
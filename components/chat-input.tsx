import { Button } from "./ui/button";
import { BsNvidia } from "react-icons/bs";
import { ChevronDown } from "lucide-react";
import Textarea from "react-textarea-autosize";
import { AiOutlineEnter } from "react-icons/ai";
import { FaMeta, FaGoogle } from "react-icons/fa6";
import { models } from "@/lib/models";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const getModelIcon = (modelName: string) => {
  if (modelName.startsWith("meta")) {
    return <FaMeta className="w-4 h-4 mr-2 text-blue-600" />;
  } else if (modelName.startsWith("google")) {
    return <FaGoogle className="w-4 h-4 mr-2 text-green-600" />;
  }
  return <BsNvidia className="w-4 h-4 mr-2 text-green-500" />;
};

type ChatInputRSCProps = {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  model: string;
  handleModelChange: (model: string) => void;
};

export default function ChatInput({
  input,
  setInput,
  handleSubmit,
  model,
  handleModelChange,
}: ChatInputRSCProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-zinc-100/95 to-transparent backdrop-blur-lg dark:from-zinc-900/95"
    >
      <div className="w-full max-w-2xl px-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative flex w-full flex-col items-start gap-3"
        >
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "rounded-full border-zinc-300 bg-white/50 px-4 shadow-sm transition-all",
                  "hover:bg-white hover:shadow-md hover:-translate-y-0.5",
                  "dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
                )}
              >
                <div className="flex items-center">
                  {getModelIcon(model)}
                  <span className="font-medium">{model}</span>
                  <ChevronDown size={16} className="ml-2 text-zinc-400" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="border-zinc-200 bg-white/90 backdrop-blur-lg dark:border-zinc-700 dark:bg-zinc-900/90"
              align="start"
            >
              {models.map((modelName) => (
                <DropdownMenuItem
                  key={modelName}
                  onSelect={() => handleModelChange(modelName)}
                  className={cn(
                    "group flex cursor-pointer items-center rounded-lg px-3 py-2 transition-colors",
                    "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  )}
                >
                  {getModelIcon(modelName)}
                  <span className="font-medium">{modelName}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="relative flex w-full items-center">
            <Textarea
              name="message"
              rows={1}
              maxRows={5}
              tabIndex={0}
              placeholder="Ask Ninja AI anything..."
              spellCheck={false}
              value={input}
              className={cn(
                "min-h-12 w-full resize-none rounded-2xl border border-zinc-200 bg-white/80 pb-1 pl-5 pr-12 pt-3 text-sm shadow-lg",
                "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2",
                "transition-all duration-200 ease-in-out",
                "dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-white"
              )}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  if (input.trim()) handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 transform",
                "h-8 w-8 rounded-xl bg-green-500 text-white shadow-md",
                "hover:bg-green-600 hover:shadow-lg",
                "transition-all duration-150 ease-out",
                "dark:bg-green-600 dark:hover:bg-green-700"
              )}
              disabled={!input.trim()}
            >
              <AiOutlineEnter size={18} className="mt-0.5" />
            </Button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400"
        >
          Powered by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "bg-gradient-to-r from-green-500 to-green-600 bg-clip-text font-medium text-transparent",
              "underline underline-offset-4 transition-all duration-150 hover:underline-offset-2"
            )}
            href="https://ninjaonsteroids.me"
          >
            Ninja AI
          </a>
        </motion.p>
      </div>
    </form>
  );
}
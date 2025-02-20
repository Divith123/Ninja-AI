"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaAngleDoubleLeft, 
  FaAngleDoubleRight, 
  FaCog,
  FaUserCircle,
  FaRegCommentDots
} from "react-icons/fa";
import { cn } from "@/lib/utils";

export default function CollapsibleSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Collapsed State Trigger with Ninja AI Branding */}
      <motion.button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "fixed left-4 top-4 z-50 flex items-center gap-3 rounded-xl p-3",
          "bg-white/90 backdrop-blur-sm shadow-lg hover:bg-zinc-100/80",
          "dark:bg-zinc-800/90 dark:hover:bg-zinc-700/80 transition-all",
          "border border-zinc-200/80 dark:border-zinc-700/50",
          "font-poppins font-medium"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {collapsed ? (
          <>
            <FaAngleDoubleRight className="text-ninja dark:text-ninja-dark text-xl" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden md:block"
            >
              <h1>
                NINJA AI
              </h1>
            </motion.div>
          </>
        ) : (
          <FaAngleDoubleLeft className="text-ninja dark:text-ninja-dark text-xl" />
        )}
      </motion.button>

      {/* Sidebar Content */}
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: collapsed ? -320 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed left-0 top-0 h-screen w-80 bg-white/95 backdrop-blur-xl shadow-2xl",
          "dark:bg-zinc-900/95 border-r border-zinc-200/80 dark:border-zinc-700/50",
          "font-poppins flex flex-col z-40"
        )}
      >
        {/* Sidebar Header with Enhanced Branding */}
        <div className="p-6 border-b border-zinc-200/80 dark:border-zinc-700/50">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setCollapsed(true)}
              className="text-ninja dark:text-ninja-dark hover:opacity-80 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <FaAngleDoubleLeft className="text-xl" />
            </motion.button>
            <div className="flex flex-col">
              <h1>
                NINJA AI
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Intelligent Assistant Platform
              </p>
            </div>
          </div>
        </div>

        {/* Chat History Section */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {[1, 2, 3, 4, 5].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.02 }}
              className={cn(
                "p-3 rounded-xl cursor-pointer transition-colors",
                "bg-zinc-100/50 hover:bg-zinc-200/50",
                "dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50",
                "flex items-center gap-3"
              )}
            >
              <FaRegCommentDots className="text-zinc-600 dark:text-zinc-400 shrink-0" />
              <div className="truncate">
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate">
                  Chat Session #{item}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {item === 1 ? "Active now" : "2 hours ago"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section - Enhanced Profile */}
        <div className="border-t border-zinc-200/80 dark:border-zinc-700/50 p-4 space-y-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl",
              "bg-zinc-100/50 hover:bg-zinc-200/50",
              "dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50",
              "cursor-pointer"
            )}
          >
            <FaUserCircle className="text-2xl text-ninja dark:text-ninja-dark" />
            <div>
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                Ninja User
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Pro Plan Member
              </p>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl",
              "bg-zinc-100/50 hover:bg-zinc-200/50",
              "dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50",
              "text-zinc-600 dark:text-zinc-300"
            )}
          >
            <FaCog className="text-lg animate-spin-slow" />
            <span className="text-sm font-medium">AI Settings</span>
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
}
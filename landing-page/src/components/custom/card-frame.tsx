"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pointer } from "@/components/magicui/pointer";
import { motion } from "motion/react";

export function PointerDemo1() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:grid-rows-1">
      
      <Card className="col-span-1 w-[20rem] row-span-1 overflow-hidden border-none bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg transition-all hover:shadow-xl dark:from-blue-900 dark:to-blue-800">
        <CardHeader className="relative pb-2">
          <CardTitle className="text-xl font-bold">Automate Repetitive Tasks</CardTitle>
          <CardDescription className="text-sm font-[500] mt-4 text-blue-700 dark:text-blue-300">
            ➡️ Summarize unread emails <br />
            ➡️ Social media content writer <br />
            ➡️ Reply to emails in your own writing style <br />
            ➡️ A/B test marketing emails <br />
            ➡️ Track competitors as they make a move <br />
            ➡️ Track and shortlist candidates effectively <br />
          </CardDescription>
        </CardHeader>
        <Pointer className="fill-blue-500" />
      </Card>
    
      <Card className="col-span-1 row-span-1 overflow-hidden border-none bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg transition-all hover:shadow-xl dark:from-purple-900 dark:to-purple-800">
        <CardHeader className="relative pb-2">
          <CardTitle className="text-xl font-bold">Agents</CardTitle>
          <CardDescription className="text-sm font-[500] mt-4 flex flex-col text-purple-700 dark:text-purple-300">
            🤖 Generate MoMs and push to slack <br />
            🤖 RAG-based customer support chatbots<br />
            🤖 Automate customer interactions with conversational specialists<br />
            🤖 Tailor resumes to every JD<br />
            🤖 Draft emails with Discord<br />
            🤖 Improve customer feedback responses<br />
          </CardDescription>
        </CardHeader>
        
        <Pointer>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" className="fill-purple-500" />
            <circle cx="12" cy="12" r="5" className="fill-white" />
          </svg>
        </Pointer>
      </Card>

      <Card className="col-span-1 row-span-1 overflow-hidden border-none bg-gradient-to-br from-green-50 to-green-100 shadow-lg transition-all hover:shadow-xl dark:from-green-900 dark:to-green-800">
        <CardHeader className="relative pb-2">
          <CardTitle className="text-xl font-bold">Businesses</CardTitle>
          <CardDescription className="text-sm font-[500] mt-4 text-green-700 dark:text-green-300">
            📈 Automate manual reporting <br/>
            📈 Manage Teams without biases<br/>
            📈 Estimate critical risk factors through cohesive and deep thinking chains<br/>
            📈 Optimize existing workflows and identify bottlenecks <br/>
            📈 Enhance team performance and decision-making<br/>
            📈 Overview & weekly summary of tasks/activities<br/>
          </CardDescription>
        </CardHeader>
        <Pointer>
          <div className="text-2xl">👆</div>
        </Pointer>
      </Card>

      <Card className="col-span-1 w-[20rem] row-span-1 overflow-hidden border-none bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg transition-all hover:shadow-xl dark:from-slate-900 dark:to-slate-800">
        <CardHeader className="relative pb-2">
          <CardTitle className="text-xl font-bold">Personal Assistant</CardTitle>
          <CardDescription className="text-sm font-[500] mt-4 text-slate-600 dark:text-slate-400">
            ✨ Automate all your tasks by chatting with our discord bot! <br/>
            ✨ Tailor resumes to every JD<br/>
            ✨ Analyze spreadsheets, sales data, json files and hefty documents<br/>
            ✨ Complex and personalized researching tools<br/>
            ✨ Maintain to-do lists and important notes<br/>
            ✨ Track prices and monitor trends<br/>
          </CardDescription>
        </CardHeader>
        <Pointer>
          <motion.div
            animate={{
              scale: [0.8, 1, 0.8],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-pink-600"
            >
              <motion.path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="currentColor"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </motion.div>
        </Pointer>
      </Card>
    </div>
  );
}

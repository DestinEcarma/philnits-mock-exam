import { Button } from "@/components/ui/button"
import type { QuizQuestion } from "@/assets/data"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import React from "react"
import Markdown from "@/components/Markdown"
import Credits from "./Credits"

interface ResultsProps {
  quizData: QuizQuestion[]
  userAnswers: number[]
  onRestart: () => void
  timeRemaining: number
  timeTaken: number
}

export default function Results({ quizData, userAnswers, onRestart, timeRemaining, timeTaken }: ResultsProps) {
  const score = userAnswers.reduce((acc, answer, index) => {
    return answer === quizData[index].correctAnswer ? acc + 1 : acc
  }, 0)

  const isTimeOut = timeRemaining === 0

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000)
    const minutes = Math.floor((ms % 3600000) / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Quiz Results</h2>
      {isTimeOut ? (
        <p className="text-xl text-red-600 font-bold">Time&apos;s up!</p>
      ) : (
        <p className="text-xl text-green-600 font-bold">Quiz completed!</p>
      )}
      <p className="text-xl">
        Your score: {score} out of {quizData.length}
      </p>
      <p className="text-xl">Time taken: {formatTime(timeTaken)}</p>
      {quizData.map((question, index) => (
        <div key={index} className={`border p-4 rounded-md ${userAnswers[index] === question.correctAnswer ? 'bg-green-50' : 'bg-red-50'}`}>
          <h2 className="font-bold text-sm mb-4">{question.id}</h2>
          <div className="font-medium">
            <Markdown>{question.question}</Markdown>
          </div>
          {userAnswers[index] !== undefined ? (
            <>
              <p className="mt-2 font-semibold">
                Your answer:
              </p>
              <div className="font-medium">
                <Markdown>{question.options[userAnswers[index]]}</Markdown>
              </div>
              <p className="font-bold my-1">
                {userAnswers[index] === question.correctAnswer ? (
                  <span className="text-green-600">Correct</span>
                ) : (
                  <span className="text-red-600">Incorrect</span>
                )}
              </p>
              {userAnswers[index] !== question.correctAnswer && (
                <div>
                    <p className="mt-2 font-semibold">
                      Correct answer:
                    </p>
                    <div className="font-medium">
                      <Markdown>{question.options[question.correctAnswer]}</Markdown>
                    </div>
                </div>
              )}
              {question.solution && (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="solution">
                    <AccordionTrigger>Show Detailed Solution</AccordionTrigger>
                    <AccordionContent>
                    <div className="relative w-full my-2">
                      <Markdown>
                        {question.solution}
                      </Markdown>
                    </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </>
          ) : (
            <>
              <p className="mt-2 text-red-600 font-bold">Not answered</p>
              {userAnswers[index] !== question.correctAnswer && (
                <div>
                    <p className="mt-2 font-semibold">
                      Correct answer:
                    </p>
                    <div className="font-medium">
                      <Markdown>{question.options[question.correctAnswer]}</Markdown>
                    </div>
                </div>
              )}
              {question.solution && (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="solution">
                    <AccordionTrigger>Show Detailed Solution</AccordionTrigger>
                    <AccordionContent>
                    <div className="relative w-full my-2">
                      <Markdown>
                        {question.solution}
                      </Markdown>
                    </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </>
          )}
        </div>
      ))}
      <Credits />
      <div className="flex space-x-4">
        <Button onClick={onRestart} className="flex-1">
          Retake Quiz
        </Button>
        <Button onClick={() => window.location.reload()} className="flex-1">
          New Quiz
        </Button>
      </div>
    </div>
  )
}


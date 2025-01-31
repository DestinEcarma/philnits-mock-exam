"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Question from "@/components/Question"
import Results from "@/components/Results"
import Timer from "@/components/Timer"
import LandingPage from "@/components/LandingPage"
import { quizData, type QuizQuestion } from "@/assets/data" 

const QUIZ_TIME = 90 * 60 * 1000 // 1 hour 30 minutes in milliseconds
const QUESTIONS_COUNT = 60

export default function Quiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(QUIZ_TIME)

  const startQuiz = useCallback(() => {
    // const shuffled = [...quizData].sort(() => 0.5 - Math.random())
    // setQuestions(shuffled.slice(0, QUESTIONS_COUNT))
    // // FOR DEBUGGING
    // const debugIndex = 20
    // setQuestions(quizData.slice(debugIndex, debugIndex + 10))
    
    setQuestions(quizData)
    
    setQuizStarted(true)
    setTimeRemaining(QUIZ_TIME)
  }, [])

  const endQuiz = useCallback(() => {
    setQuizCompleted(true)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (quizStarted && !quizCompleted) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(timer)
            endQuiz()
            return 0
          }
          return prevTime - 1000
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [quizStarted, quizCompleted, endQuiz])

  const handleAnswer = (selectedOption: number) => {
    const newUserAnswers = [...userAnswers]
    newUserAnswers[currentQuestion] = selectedOption
    setUserAnswers(newUserAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      endQuiz()
    }
  }

  const handleGoBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    if(confirm("Are you sure?")) {
      endQuiz()
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setUserAnswers([])
    setQuizStarted(false)
    setQuizCompleted(false)
    setTimeRemaining(QUIZ_TIME)
  }

  return (
    <div className="container mx-auto p-4">
      {!quizStarted ? (
        <LandingPage onStartQuiz={startQuiz} />
      ) : (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Exam Review Quiz</CardTitle>
            <CardDescription>Test your knowledge and review explanations</CardDescription>
          </CardHeader>
          <CardContent>
            <Timer timeRemaining={timeRemaining} />
            {!quizCompleted && questions.length > 0 ? (
              <Question
                id={questions[currentQuestion].id}
                question={questions[currentQuestion].question}
                options={questions[currentQuestion].options}
                onAnswer={handleAnswer}
                onGoBack={handleGoBack}
                onSubmit={handleSubmit}
                currentQuestionNumber={currentQuestion + 1}
                totalQuestions={questions.length}
                isFirstQuestion={currentQuestion === 0}
              />
            ) : (
              <Results
                quizData={questions}
                userAnswers={userAnswers}
                onRestart={restartQuiz}
                timeRemaining={timeRemaining}
                timeTaken={QUIZ_TIME - timeRemaining}
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}


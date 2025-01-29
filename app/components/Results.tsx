import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { QuizQuestion } from "@/assets/data"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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
        <p className="text-xl text-red-600 font-bold">Time's up!</p>
      ) : (
        <p className="text-xl text-green-600 font-bold">Quiz completed!</p>
      )}
      <p className="text-xl">
        Your score: {score} out of {quizData.length}
      </p>
      <p className="text-xl">Time taken: {formatTime(timeTaken)}</p>
      {quizData.map((question, index) => (
        <div key={index} className={`border p-4 rounded-md ${userAnswers[index] === question.correctAnswer ? 'bg-green-50' : 'bg-red-50'}`}>
          <h3 className="question font-semibold">{question.question}</h3>
          {question.image && (
            <div className="relative w-full my-2">
              <Image
                src={`/images/${question.image}`}
                alt="Question image"
                width={800} // Adjust based on expected width
                height={0}  // Height will auto-adjust based on aspect ratio
                style={{ height: "auto", width: "100%", objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          {userAnswers[index] !== undefined ? (
            <>
              <p className="mt-2 font-bold">
                Your answer: {question.options[userAnswers[index]]}
                {userAnswers[index] === question.correctAnswer ? (
                  <span className="text-green-600 ml-2">Correct</span>
                ) : (
                  <span className="text-red-600 ml-2">Incorrect</span>
                )}
              </p>
              {
                question.explanations &&
                <p className="mt-2 text-sm text-gray-600">Explanation: {question.explanations[userAnswers[index]]}</p>
              }
              {userAnswers[index] !== question.correctAnswer && (
                <>
                    <p className="mt-2 text-green-600 font-semibold">
                      Correct answer: {question.options[question.correctAnswer]}
                    </p>
                    {
                      question.explanations &&
                      <p className="mt-2 text-sm text-gray-600">
                        Explanation: {question.explanations[question.correctAnswer]}
                      </p>
                    }
                </>
              )}
              {question.solution && (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="solution">
                    <AccordionTrigger>Show Detailed Solution</AccordionTrigger>
                    <AccordionContent>
                    <div className="relative w-full my-2">
                      <Image
                        src={`/solutions/${question.solution}`}
                        alt="Question solution"
                        width={800} // Adjust based on expected width
                        height={0}  // Height will auto-adjust based on aspect ratio
                        style={{ height: "auto", width: "100%", objectFit: "contain" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </>
          ) : (
            <>
              <p className="mt-2 text-red-600 font-bold">Not answered</p>
              <p className="mt-2 text-green-600 font-semibold">
                Correct answer: {question.options[question.correctAnswer]}
              </p>
              {
                question.explanations &&
                <p className="mt-2 text-sm text-gray-600">
                  Explanation: {question.explanations[question.correctAnswer]}
                </p>
              }
              {question.solution && (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="solution">
                    <AccordionTrigger>Show Detailed Solution</AccordionTrigger>
                    <AccordionContent>
                      <div className="relative w-full my-2">
                        <Image
                          src={`/solutions/${question.solution}`}
                          alt="Question solution"
                          width={800} // Adjust based on expected width
                          height={0}  // Height will auto-adjust based on aspect ratio
                          style={{ height: "auto", width: "100%", objectFit: "contain" }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </>
          )}
        </div>
      ))}
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


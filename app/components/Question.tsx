import { Button } from "@/components/ui/button"
import Markdown from "@/components/Markdown"

interface QuestionProps {
  id: string
  question: string
  options: string[]
  onAnswer: (selectedOption: number) => void
  onGoBack: () => void
  onSubmit: () => void
  currentQuestionNumber: number
  totalQuestions: number
  isFirstQuestion: boolean
}

export default function Question({
  id,
  question,
  options,
  onAnswer,
  onGoBack,
  onSubmit,
  currentQuestionNumber,
  totalQuestions,
  isFirstQuestion,
}: QuestionProps) {
  return (
    <div className="space-y-4">
      <span className="text-sm font-medium bg-primary text-primary-foreground px-2 py-1 rounded-full">
        Question {currentQuestionNumber} of {totalQuestions}
      </span>
      <h2 className="font-bold text-sm">{id}</h2>
      <div className="font-medium">
        <Markdown>
          {question}
        </Markdown>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {options.map((option, index) => (
          <Button key={index} variant="outline" className="justify-start text-left text-wrap py-4 h-auto font-normal" onClick={() => onAnswer(index)}>
            <Markdown>{option}</Markdown>
          </Button>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button onClick={onGoBack} disabled={isFirstQuestion} variant="outline">
          Go Back
        </Button>
        <Button onClick={onSubmit} variant="outline">
          Submit Early
        </Button>
      </div>
    </div>
  )
}


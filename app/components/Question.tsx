import Image from "next/image"
import { Button } from "@/components/ui/button"

interface QuestionProps {
  question: string
  image?: string
  options: string[]
  onAnswer: (selectedOption: number) => void,
  currentQuestionNumber: number,
  totalQuestions: number,
}

export default function Question({ question, image, options, onAnswer, currentQuestionNumber, totalQuestions }: QuestionProps) {
  return (
    <div className="space-y-4">
      <span className="text-sm font-medium bg-primary text-primary-foreground px-2 py-1 rounded-full">
        Question {currentQuestionNumber} of {totalQuestions}
      </span>
      <h2 className="text-xl font-semibold">{question}</h2>
      {image && (
        <div className="relative w-full h-64 mb-4">
          <Image
            src={image || "/placeholder.svg"}
            alt="Question image"
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="grid grid-cols-1 gap-2">
        {options.map((option, index) => (
          <Button key={index} variant="outline" className="justify-start text-left text-wrap py-2 h-auto" onClick={() => onAnswer(index)}>
            <p className="w-full py-2">{option}</p>
          </Button>
        ))}
      </div>
    </div>
  )
}


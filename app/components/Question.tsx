import Image from "next/image"
import { Button } from "@/components/ui/button"
import Markdown from "@/components/Markdown"

interface QuestionProps {
  question: string
  image?: string
  options: string[]
  onAnswer: (selectedOption: number) => void
  onGoBack: () => void
  currentQuestionNumber: number
  totalQuestions: number
  isFirstQuestion: boolean
}

export default function Question({
  question,
  image,
  options,
  onAnswer,
  onGoBack,
  currentQuestionNumber,
  totalQuestions,
  isFirstQuestion,
}: QuestionProps) {
  return (
    <div className="space-y-4">
      <span className="text-sm font-medium bg-primary text-primary-foreground px-2 py-1 rounded-full">
        Question {currentQuestionNumber} of {totalQuestions}
      </span>
      <div className="font-medium">
        <Markdown>
          {question}
        </Markdown>
      </div>
      {image && (
        <div className="relative w-full my-2">
          <Image
            src={`/images/${image}`}
            alt="Question image"
            width={800} // Adjust based on expected width
            height={0}  // Height will auto-adjust based on aspect ratio
            style={{ height: "auto", width: "100%", objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
      )}
      <div className="grid grid-cols-1 gap-2">
        {options.map((option, index) => (
          <Button key={index} variant="outline" className="justify-start text-left text-wrap py-4 h-auto font-medium" onClick={() => onAnswer(index)}>
            <Markdown>{option}</Markdown>
          </Button>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button onClick={onGoBack} disabled={isFirstQuestion} variant="outline">
          Go Back
        </Button>
      </div>
    </div>
  )
}


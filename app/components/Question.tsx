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
      <h2 className="question text-xl font-semibold">{question}</h2>
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
          <Button key={index} variant="outline" className="justify-start text-left text-wrap py-2 h-auto" onClick={() => onAnswer(index)}>
            <p className="w-full py-2">{option}</p>
          </Button>
        ))}
      </div>
    </div>
  )
}


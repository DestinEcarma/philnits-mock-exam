import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface LandingPageProps {
  onStartQuiz: () => void
}

export default function LandingPage({ onStartQuiz }: LandingPageProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">PhilNITS FE AM Mock Exam</CardTitle>
        <CardDescription>Test your knowledge and prepare for your upcoming exam</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>This quiz consists of 60 randomly selected questions from various topics covered in exams from previous years.</p>
        <ul className="list-disc list-inside space-y-2">
          <li>You have 1 hour and 30 minutes to complete the quiz</li>
          <li>Some questions may include images</li>
          <li>After completing the quiz, you'll receive detailed explanations for each question</li>
          <li>You can retake the quiz multiple times with different questions</li>
        </ul>
        <p>Are you ready to begin?</p>
        <Button onClick={onStartQuiz} className="w-full">
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  )
}
import _2024 from '@/assets/data/2024/index.json'

export interface QuizQuestion {
    question: string
    image?: string
    options: string[]
    correctAnswer: number
    explanations?: string[]
    solution?: string // New optional field for markdown solution
  }

export const quizData: QuizQuestion[] = [
  ..._2024
]
  
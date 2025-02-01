import _2024 from '@/assets/data/2024/index.json'
import _2023 from '@/assets/data/2023/index.json'
import _2020 from '@/assets/data/2020/index.json'
import _2021 from '@/assets/data/2021/index.json'

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  solution?: string // New optional field for markdown solution
}

export const quizData: QuizQuestion[] = [
  ..._2024,
  ..._2023,
  ..._2021,
  ..._2020
]
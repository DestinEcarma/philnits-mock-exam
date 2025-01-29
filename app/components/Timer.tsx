interface TimerProps {
    timeRemaining: number
  }
  
  export default function Timer({ timeRemaining }: TimerProps) {
    const hours = Math.floor(timeRemaining / 3600000)
    const minutes = Math.floor((timeRemaining % 3600000) / 60000)
    const seconds = Math.floor((timeRemaining % 60000) / 1000)
  
    return (
      <div className="text-xl font-bold mb-4">
        Time Remaining: {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>
    )
  }
  
  
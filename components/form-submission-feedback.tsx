import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"

interface FormSubmissionFeedbackProps {
  title: string
  message: string
  redirectPath: string
  redirectDelay?: number
}

export function FormSubmissionFeedback({ 
  title, 
  message, 
  redirectPath, 
  redirectDelay = 3000
}: FormSubmissionFeedbackProps) {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(redirectPath)
    }, redirectDelay)

    return () => clearTimeout(timer)
  }, [router, redirectPath, redirectDelay])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="px-4 py-8 sm:px-6 text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base">{message}</p>
      </CardContent>
    </Card>
  )
}


import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - דף לא נמצא</h1>
      <p className="text-xl text-muted-foreground mb-8">
        מצטערים, הדף שחיפשת לא קיים.
      </p>
      <Button asChild>
        <Link href="/">
          חזרה לדף הבית
        </Link>
      </Button>
    </div>
  )
}


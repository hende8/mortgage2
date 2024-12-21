import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="flex items-center space-x-4 rtl:space-x-reverse">
      <Button variant="ghost" asChild>
        <Link href="/articles">מאמרים</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/about">אודות</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/contact">צור קשר</Link>
      </Button>
    </nav>
  )
}


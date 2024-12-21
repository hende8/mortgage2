import type { Metadata } from "next"
import { Rubik } from 'next/font/google'
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Logo } from "@/components/logo"

const rubik = Rubik({ 
  subsets: ["hebrew", "latin"],
  weight: ['300', '400', '500', '700'],
})

export const metadata: Metadata = {
  title: "מחשבון משכנתא | כמה משכנתא",
  description: "מחשבון משכנתא פשוט וקל לשימוש. חשב את התשלום החודשי שלך למשכנתא ומצא את ההצעה הטובה ביותר.",
  keywords: "משכנתא, מחשבון משכנתא, הלוואת משכנתא, ייעוץ משכנתאות",
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: 'https://www.example.com',
    siteName: 'כמה משכנתא',
    title: 'מחשבון משכנתא | כמה משכנתא',
    description: 'מחשבון משכנתא פשוט וקל לשימוש. חשב את התשלום החודשי שלך למשכנתא ומצא את ההצעה הטובה ביותר.',
    images: [
      {
        url: 'https://www.example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'כמה משכנתא - מחשבון משכנתא',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "כמה משכנתא",
            "url": "https://www.example.com",
            "description": "מחשבון משכנתא פשוט וקל לשימוש. חשב את התשלום החודשי שלך למשכנתא ומצא את ההצעה הטובה ביותר.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.example.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }} />
      </head>
      <body className={rubik.className}>
        <div className="flex min-h-screen flex-col">
          <header className="border-b">
            <div className="container mx-auto px-4">
              <div className="flex h-16 items-center justify-between">
                <Logo />
                <Navbar />
              </div>
            </div>
          </header>
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t">
            <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} כמה משכנתא. כל הזכויות שמורות.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}


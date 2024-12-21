'use client'

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
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
      }}
    />
  )
}


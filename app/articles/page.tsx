import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const articles = [
  {
    title: "איך לחסוך בתשלומי המשכנתא",
    slug: "how-to-save-on-mortgage-payments",
    image: "/images/save-on-mortgage.jpg",
    excerpt: "גלה טיפים וטריקים מעשיים לחיסכון בתשלומי המשכנתא שלך ושיפור המצב הפיננסי שלך.",
    exists: true
  },
  {
    title: "מדריך למשכנתא ראשונה",
    slug: "first-time-mortgage-guide",
    image: "/images/first-time-mortgage.jpg",
    excerpt: "כל מה שצריך לדעת לפני לקיחת המשכנתא הראשונה שלך - צעד אחר צעד.",
    exists: false
  },
  {
    title: "השוואת מסלולי משכנתא",
    slug: "comparing-mortgage-tracks",
    image: "/images/compare-mortgage-tracks.jpg",
    excerpt: "הבן את ההבדלים בין מסלולי המשכנתא השונים ובחר את המסלול המתאים ביותר עבורך.",
    exists: false
  }
]

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">מאמרים</h1>
      <p className="mb-8 text-lg text-muted-foreground">כאן תוכלו למצוא מאמרים מעניינים בנושא משכנתאות.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.filter(article => article.exists).map((article) => (
          <Link 
            key={article.slug} 
            href={`/articles/${article.slug}`} 
            className="block hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <Card className="flex flex-col h-full overflow-hidden">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                <CardContent className="flex-grow flex flex-col justify-between p-4">
                  <p className="text-muted-foreground text-sm">
                    {article.excerpt}
                  </p>
                </CardContent>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": articles.filter(article => article.exists).map((article, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Article",
              "url": `https://www.example.com/articles/${article.slug}`,
              "name": article.title,
              "description": article.excerpt,
              "image": `https://www.example.com${article.image}`
            }
          }))
        })
      }} />
    </div>
  )
}


import { MortgageCalculator } from "@/components/mortgage-calculator"

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">מחשבון משכנתא</h1>
        <p className="text-xl text-muted-foreground">
          חשב את התשלום החודשי שלך למשכנתא בקלות ומהירות
        </p>
      </section>
      <MortgageCalculator />
    </div>
  )
}


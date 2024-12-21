"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import Link from "next/link"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  loanAmount: z.coerce.number().positive("סכום ההלוואה חייב להיות מספר חיובי"),
  loanTerm: z.coerce.number().positive("תקופת ההלוואה חייבת להיות מספר חיובי"),
  interestRate: z.coerce.number().positive("הריבית חייבת להיות מספר חיובי"),
})

type FormValues = z.infer<typeof formSchema>

interface CalculationResult {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  principalPercentage: number
  interestPercentage: number
}

export function MortgageCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null)
  //Removed allFieldsFilled state and useEffect

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanAmount: undefined,
      loanTerm: undefined,
      interestRate: undefined,
    },
  })


  const calculateMortgage = (values: FormValues) => {
    const { loanAmount, loanTerm, interestRate } = values
    const P = loanAmount
    const n = loanTerm * 12
    const r = interestRate / 100 / 12

    const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalPayment = monthlyPayment * n
    const totalInterest = totalPayment - P
    const principalPercentage = (P / totalPayment) * 100
    const interestPercentage = (totalInterest / totalPayment) * 100

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      principalPercentage,
      interestPercentage,
    })
  }


  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (percentage: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(percentage / 100)
  }

  const chartData = result
    ? [
        { name: "קרן", value: result.principalPercentage },
        { name: "ריבית", value: result.interestPercentage },
      ]
    : []

  const COLORS = ["#0088FE", "#FF8042"]

  return (
    <Card className="w-full max-w-2xl mx-auto sm:w-auto">
      <CardHeader>
        <CardTitle>מחשבון משכנתא</CardTitle>
        <CardDescription>חשב את התשלום החודשי שלך למשכנתא</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(calculateMortgage)} className="space-y-4">
            <FormField
              control={form.control}
              name="loanAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">סכום ההלוואה</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="לדוגמה: 1,000,000" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="loanTerm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">תקופת ההלוואה (בשנים)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="לדוגמה: 30" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">ריבית שנתית (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} placeholder="לדוגמה: 3.5" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full" 
              variant="default"
            >
              חשב משכנתא
            </Button>
          </form>
        </Form>
        {result && (
          <div className="space-y-6">
            <div className="space-y-4 p-4 bg-muted rounded-lg">
              <div className="flex justify-between">
                <span>תשלום חודשי:</span>
                <strong>{formatCurrency(result.monthlyPayment)}</strong>
              </div>
              <div className="flex justify-between">
                <span>סך כל התשלום:</span>
                <strong>{formatCurrency(result.totalPayment)}</strong>
              </div>
              <div className="flex justify-between">
                <span>סך כל הריבית:</span>
                <strong>{formatCurrency(result.totalInterest)}</strong>
              </div>
            </div>

            {chartData.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-center">התפלגות התשלומים</h3>
                <div className="h-[250px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                  <div className="p-2 rounded-lg bg-[#0088FE]/10">
                    <div className="font-semibold">קרן</div>
                    <div>{formatPercentage(result.principalPercentage)}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatCurrency(form.getValues().loanAmount)}
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#FF8042]/10">
                    <div className="font-semibold">ריבית</div>
                    <div>{formatPercentage(result.interestPercentage)}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatCurrency(result.totalInterest)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="pt-6">
          <Link 
            href="/register" 
            className="block w-full text-sm sm:text-base md:text-lg text-center underline hover:text-primary"
          >
            <span className="mb-1 sm:mb-0 sm:mr-2">צור קשר עם יועץ משכנתאות</span>
            <span>כדי לחסוך אלפי שקלים!</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}


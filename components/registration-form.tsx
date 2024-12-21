"use client"

import { useState } from 'react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Loader2 } from 'lucide-react'
import { FormSubmissionFeedback } from "@/components/form-submission-feedback"

const formSchema = z.object({
  name: z.string().min(2, "השם חייב להכיל לפחות 2 תווים"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  phone: z.string().regex(/^[0-9]{9,10}$/, "מספר טלפון לא תקין"),
})

type FormValues = z.infer<typeof formSchema>

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    console.log('Form submitted:', data)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <FormSubmissionFeedback
        title="תודה על ההרשמה!"
        message="פרטיך נקלטו בהצלחה. ניצור איתך קשר בהקדם."
        redirectPath="/"
      />
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 px-4 py-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl">טופס הרשמה</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4 sm:space-y-6 px-4 py-4 sm:px-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-base">שם מלא</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="h-12 text-base"
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-base">כתובת אימייל</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      {...field} 
                      className="h-12 text-base"
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-base">מספר טלפון</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      {...field} 
                      className="h-12 text-base"
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="px-4 py-4 sm:px-6">
            <Button 
              type="submit" 
              className="w-full h-12 text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                  שולח...
                </>
              ) : (
                'הירשם'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}


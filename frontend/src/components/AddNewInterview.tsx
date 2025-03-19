"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { DatePicker } from "@/components/ui/date-picker"

type FormValues = {
  role: string
  description: string
  yoe: number
  closingDate: Date
}

const AddNewInterview = () => {
  const router = useRouter()
  const form = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log("Interview Data Submitted:", data)

    // Hardcoded interview ID as '1'
    const interviewId = 1

    // Navigate to the dynamic candidate details page (e.g., /interview/1)
    router.push(`/interview/${interviewId}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role/Job Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Frontend Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description / Tech Stack</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the role, responsibilities, and tech stack" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="yoe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter years of experience" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="closingDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Closing Date</FormLabel>
              <DatePicker date={field.value} setDate={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" className="w-full sm:w-auto">
            Create Opportunity
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export default AddNewInterview

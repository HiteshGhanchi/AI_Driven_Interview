"use client"

import { format } from "date-fns";
import { Calendar, Code, Eye, Plus, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";  // You may not need this anymore if you're replacing router.push with Link

import DashboardNav from "@/components/dashboardNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link"; // Import Link from next/link

// Form schema
const formSchema = z.object({
  role: z.string().min(2, { message: "Role must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  techStack: z.string().min(2, { message: "Tech stack is required." }),
  expertise: z.string().min(2, { message: "Expertise level is required." }),
  yoe: z.string().min(1, { message: "Years of experience is required." }),
  closingDate: z.date({
    required_error: "Closing date is required.",
  }),
});

type Opportunity = {
  id: string;
  role: string;
  description: string;
  techStack: string;
  expertise: string;
  yoe: string;
  createdAt: Date;
  closingDate: Date;
  applicants?: number;
};

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: "1",
      role: "Frontend Developer",
      description: "We're looking for a React developer with experience in Next.js and TypeScript.",
      techStack: "React, Next.js, TypeScript",
      expertise: "Mid-level",
      yoe: "2-4",
      createdAt: new Date(2023, 6, 15),
      closingDate: new Date(2023, 7, 15),
      applicants: 12,
    },
    {
      id: "2",
      role: "Backend Engineer",
      description: "Seeking a Node.js developer with experience in building RESTful APIs.",
      techStack: "Node.js, Express, MongoDB",
      expertise: "Senior",
      yoe: "4+",
      createdAt: new Date(2023, 6, 10),
      closingDate: new Date(2023, 7, 20),
      applicants: 8,
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
      description: "",
      techStack: "",
      expertise: "",
      yoe: "",
    },
  });

  useEffect(() => {
    fetch("/api/get-users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newOpportunity: Opportunity = {
      id: Math.random().toString(36).substring(7), // Generate a unique ID for the new opportunity
      ...values,
      createdAt: new Date(),
      closingDate: new Date(values.closingDate), // Ensure closing date is correctly set
      applicants: 0, // Set initial applicants to 0
    };

    // Prepend the new opportunity to the existing list so it shows at the beginning
    setOpportunities((prevOpportunities) => {
      return [newOpportunity, ...prevOpportunities];
    });

    setIsDialogOpen(false); // Close the dialog
    form.reset(); // Reset the form fields
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <DashboardNav />

      {/* Dashboard Content */}
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Created Oppurtunities</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4 text-white" /> Create Opportunity
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create New Opportunity</DialogTitle>
                <DialogDescription>Fill in the details to create a new job opportunity.</DialogDescription>
              </DialogHeader>
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
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe the role and responsibilities" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="techStack"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tech Stack</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. React, Node.js, MongoDB" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expertise"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expertise Level</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Junior, Mid-level, Senior" {...field} />
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
                          <Input placeholder="e.g. 1-2, 3-5, 5+" {...field} />
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
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="opportunities" className="mb-6">
          {/* <TabsList>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            
          </TabsList> */}
          <TabsContent value="opportunities" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{opportunity.role}</CardTitle>
                        <CardDescription className="text-xs">
                          {format(opportunity.createdAt, "MMM d, yyyy")}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {opportunity.expertise}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500">{opportunity.description}</div>
                    <div className="mt-2">
                      <strong>Tech Stack:</strong> {opportunity.techStack}
                    </div>
                    <div className="mt-2">
                      <strong>Experience Required:</strong> {opportunity.yoe}
                    </div>
                    <div className="mt-2">
                      <strong>Applicants:</strong> {opportunity.applicants}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      Closing: {format(opportunity.closingDate, "MMM d, yyyy")}
                    </div>
                    {/* Use Link for navigation */}
                    <Link href={`/recruiter-analytics/${opportunity.id}`}>
                      <Button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        View Analytics
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-md shadow-sm">
                  <div>{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

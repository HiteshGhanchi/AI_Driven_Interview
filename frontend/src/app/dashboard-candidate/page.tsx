
"use client";

import { format } from "date-fns";
import { Calendar, Clock, Code, Plus, User } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

import DashboardNav from "@/components/dashboardNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";


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
  _id: string;
  job_role: string;
  job_description: string;
  job_experience: string;
  createdAt: Date;
  deadline: Date;
};

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: "",
      job_role: "",
      job_description: "",
      openings: "",
      job_experience: "",
      deadline:""
    },
  });

const handleStartInterview = async (id: string) => {
  try{
    const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found in localStorage");
      }

      console.log(token);

      // Make the request with axios
      const res = await axios.get(`http://localhost:8000/candidate/${id}/register`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      console.log(res)

  }
  catch(error){
    console.log(error)
  }
  router.push(`/interview/${id}`);
}

useEffect(() => {
  const fetchOpportunities = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found in localStorage");
      }

      // Make the request with axios
      const response = await axios.get("http://localhost:8000/interview", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      // Check if the response is successful
      if (response.status !== 200) {
        throw new Error("Failed to fetch opportunities");
      }
      // console.log(response.data)
      // Set the fetched data to the state
      setOpportunities(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching opportunities:", error);
      setError("Failed to fetch opportunities");
    } finally {
      setLoading(false);
    }
  };

  fetchOpportunities();
}, []);


  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    const newOpportunity: Opportunity = {
      id: Math.random().toString(36).substring(7), // Generate a unique ID
      ...values,
      createdAt: new Date(),
      closingDate: new Date(values.closingDate),
      applicants: 0,
    };

    // Prepend the new opportunity to the list
    setOpportunities((prev) => [newOpportunity, ...prev]);

    setIsDialogOpen(false); // Close the dialog
    form.reset(); // Reset the form
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <DashboardNav />

      {/* Dashboard Content */}
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Explore Opportunity</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" /> Create Mock
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create New Mock</DialogTitle>
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
                      <FormItem className="flex flex-col bg-white">
                        <FormLabel>Closing Date</FormLabel>
                        <DatePicker date={field.value} setDate={field.onChange} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit" className="w-full bg-black text-white sm:w-auto">
                      Create Opportunity
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="opportunities" className="mb-4">
          <TabsContent value="opportunities" className="space-y-4 mt-4">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {opportunities.map((opportunity) => (
                  <Card key={opportunity._id} className="overflow-hidden rounded-lg shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-800">{opportunity.job_role}</CardTitle>
                          <CardDescription className="mt-1 text-sm text-gray-600">{opportunity.job_description}</CardDescription>
                        </div>
                        
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-gray-500" />
                         
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{opportunity.job_experience}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          {/* <span className="text-sm text-gray-700">Created: {format(opportunity.createdAt, "MMM d, yyyy")}</span> */}
                        </div>
                      </div>
                    </CardContent>
                    <Separator className="border-t border-gray-200" />
                    <CardFooter className="flex justify-between pt-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span className="text-sm text-amber-700">
                          Closing: {format(opportunity.deadline, "MMM d, yyyy")}
                        </span>e
                      </div>
                      
                    </CardFooter>
                    <Button
                      size="sm"
                      className="w-40 bg-blue-500 text-white mt-3 py-2 rounded-lg hover:bg-blue-600 transition-colors mx-auto"
                      onClick={() => {handleStartInterview(opportunity._id)}}
                    >
                      Start
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="users">
            <div className="text-center py-8 text-gray-500">User management panel would appear here</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
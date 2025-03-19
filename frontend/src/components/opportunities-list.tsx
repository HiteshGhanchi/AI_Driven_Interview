// "use client"

// import { useState } from "react"
// import { Building, MapPin, Clock } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// // Mock data for opportunities
// const opportunities = [
//   {
//     id: 1,
//     title: "Frontend Developer",
//     company: "TechCorp",
//     location: "San Francisco, CA",
//     type: "Full-time",
//     posted: "2 days ago",
//     status: "applied",
    
//   },
//   {
//     id: 2,
//     title: "UX Designer",
//     company: "DesignHub",
//     location: "Remote",
//     type: "Contract",
//     posted: "1 week ago",
//     status: "interview",
    
//   },
//   {
//     id: 3,
//     title: "Product Manager",
//     company: "InnovateCo",
//     location: "New York, NY",
//     type: "Full-time",
//     posted: "3 days ago",
//     status: "saved",
   
//   },
//   {
//     id: 4,
//     title: "Data Scientist",
//     company: "DataWorks",
//     location: "Boston, MA",
//     type: "Full-time",
//     posted: "Just now",
//     status: "saved",
    
//   },
// ]

// export default function OpportunitiesList() {
//   const [activeTab, setActiveTab] = useState("all")

//   const filteredOpportunities =
//     activeTab === "all" ? opportunities : opportunities.filter((opp) => opp.status === activeTab)

//   return (
//     <Card>
//       <CardHeader className="pb-3">
//         <CardTitle className="text-xl">My Opportunities</CardTitle>
//         <CardDescription>Track and manage your job applications</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
//           <TabsList className="grid w-full grid-cols-4">
//             <TabsTrigger value="all">All</TabsTrigger>
//             <TabsTrigger value="saved">Saved</TabsTrigger>
//             <TabsTrigger value="applied">Applied</TabsTrigger>
//             <TabsTrigger value="interview">Interviews</TabsTrigger>
//           </TabsList>
//           <TabsContent value={activeTab} className="mt-4">
//             <div className="space-y-4">
//               {filteredOpportunities.length > 0 ? (
//                 filteredOpportunities.map((job) => (
//                   <div
//                     key={job.id}
//                     className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
//                   >
                   
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between">
//                         <h3 className="font-medium truncate">{job.title}</h3>
//                       {job.status === "interview" && (
//                           <Badge className="bg-green-500 hover:bg-green-600">Interview</Badge>
//                         )}
//                       </div>
//                       <div className="flex flex-col gap-1 mt-1 text-sm text-muted-foreground">
//                         <div className="flex items-center gap-1">
//                           <Building className="h-3.5 w-3.5" />
//                           <span>{job.company}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-3.5 w-3.5" />
//                           <span>{job.location}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Clock className="h-3.5 w-3.5" />
//                           <span>{job.posted}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <Button variant="outline" size="sm">
//                       View
//                     </Button>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-8 text-muted-foreground">No opportunities found in this category.</div>
//               )}
//             </div>
//           </TabsContent>
//         </Tabs>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { Building, Clock, MapPin } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for opportunities
const opportunities = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    posted: "2 days ago",
    status: "applied",
  },
  {
    id: 2,
    title: "UX Designer",
    company: "DesignHub",
    location: "Remote",
    type: "Contract",
    posted: "1 week ago",
    status: "interview",
  },
  {
    id: 3,
    title: "Product Manager",
    company: "InnovateCo",
    location: "New York, NY",
    type: "Full-time",
    posted: "3 days ago",
    status: "saved",
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataWorks",
    location: "Boston, MA",
    type: "Full-time",
    posted: "Just now",
    status: "saved",
  },
]

export default function OpportunitiesList() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredOpportunities =
    activeTab === "all" ? opportunities : opportunities.filter((opp) => opp.status === activeTab)

  return (
    <Card className="border-2 border-purple-500">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">My Opportunities</CardTitle>
        <CardDescription className="text-purple-600">Track and manage your job applications</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 border-purple-500 text-purple-700">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="applied">Applied</TabsTrigger>
            <TabsTrigger value="interview">Interviews</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-4">
              {filteredOpportunities.length > 0 ? (
                filteredOpportunities.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-start gap-4 p-4 border border-purple-500 rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate text-purple-700">{job.title}</h3>
                        {job.status === "interview" && (
                          <Badge className="bg-green-500 hover:bg-green-600">Interview</Badge>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 mt-1 text-sm ">
                        <div className="flex items-center gap-1">
                          <Building className="h-3.5 w-3.5 " />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 " />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 " />
                          <span>{job.posted}</span>
                        </div>
                      </div>
                    </div>
                    <Button className="border border-purple-500 text-purple-700 hover:bg-purple-200" size="sm">
                      View
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-purple-600">No opportunities found in this category.</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
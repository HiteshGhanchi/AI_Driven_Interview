// "use client"

// import { Bot, Loader2 } from "lucide-react"
// import { useState } from "react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import AddNewInterview from "./AddNewInterview"

// export default function MockInterviewGenerator() {
//   const [isGenerating, setIsGenerating] = useState(false)
//   const [jobRole, setJobRole] = useState("")
//   const [isOpen, setIsOpen] = useState(false)

//   const handleGenerateInterview = () => {
//     if (!jobRole) return

//     setIsGenerating(true)

//     // Simulate API call
//     setTimeout(() => {
//       setIsGenerating(false)
//       setIsOpen(true) // Open the form modal after generating
//     }, 2000)
//   }

//   return (
//     <>
//       {/* Card UI for Mock Interview Generator */}
//       <Card className="border-2 border-primary/20">
//         <CardHeader className="pb-3">
//           <CardTitle className="text-xl flex items-center gap-2">
//             <Bot className="h-5 w-5 text-primary" />
//             Generate Mock Interview
//           </CardTitle>
//           <CardDescription>Practice your interview skills with our AI-powered mock interviews</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <label htmlFor="job-role" className="text-sm font-medium">
//                 Job Role
//               </label>
//               <Select value={jobRole} onValueChange={setJobRole}>
//                 <SelectTrigger id="job-role">
//                   <SelectValue placeholder="Select a job role" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="software-engineer">Software Engineer</SelectItem>
//                   <SelectItem value="data-scientist">Data Scientist</SelectItem>
//                   <SelectItem value="product-manager">Product Manager</SelectItem>
//                   <SelectItem value="ux-designer">UX Designer</SelectItem>
//                   <SelectItem value="marketing-specialist">Marketing Specialist</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Button className="w-full bg-black text-white" onClick={handleGenerateInterview} disabled={isGenerating || !jobRole}>
//             {isGenerating ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Generating...
//               </>
//             ) : (
//               "Start Mock Interview"
//             )}
//           </Button>
//         </CardFooter>
//       </Card>

//       {/* Dialog (Modal) for the Interview Form */}
//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Add New Interview</DialogTitle>
//           </DialogHeader>
//           <AddNewInterview />
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }

"use client"

import { Bot, Loader2 } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AddNewInterview from "./AddNewInterview"

export default function MockInterviewGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [jobRole, setJobRole] = useState("")

  const handleGenerateInterview = () => {
    setIsGenerating(true)

    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)
      setIsOpen(true) // Open the form modal after generating
    }, 2000)
  }

  return (
    <>
      {/* Card UI for Mock Interview Generator */}
      <Card className="border-2 border-purple-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-700" />
            Generate Mock Interview
          </CardTitle>
          <CardDescription className="text-purple-600">
            Practice your interview skills with our AI-powered mock interviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="job-role" className="text-sm font-medium">
                Job Role
              </label>
              <Select value={jobRole} onValueChange={setJobRole}>
                <SelectTrigger id="job-role" className="border-purple-500">
                  <SelectValue placeholder="Select a job role" />
                </SelectTrigger>
                <SelectContent className="border-purple-500 bg-white/50 backdrop-blur-md">
                  <SelectItem value="software-engineer" className="">Software Engineer</SelectItem>
                  <SelectItem value="data-scientist" className="">Data Scientist</SelectItem>
                  <SelectItem value="product-manager" className="">Product Manager</SelectItem>
                  <SelectItem value="ux-designer" className="">UX Designer</SelectItem>
                  <SelectItem value="marketing-specialist" className="">Marketing Specialist</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Click the button below to start your mock interview.</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-purple-700 text-white hover:bg-purple-800" onClick={handleGenerateInterview} disabled={isGenerating || !jobRole}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Start Mock Interview"
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Dialog (Modal) for the Interview Form */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="border-purple-500 bg-white/80 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-purple-700">Add New Interview</DialogTitle>
          </DialogHeader>
          <AddNewInterview />
          <DialogFooter>
            <Button variant="outline" className="border-purple-500 text-purple-700 hover:bg-purple-200" onClick={() => setIsOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

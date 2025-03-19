"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertCircle, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CandidateDetailsProps {
  interviewId: string
}

export function CandidateDetails({ interviewId }: CandidateDetailsProps) {
  const [selectedCandidate, setSelectedCandidate] = useState("1")

  // Mock data for candidates
  const candidates = [
    {
      id: "1",
      name: "Alex Johnson",
      avatar: "",
      score: 92,
      status: "Passed",
      strengths: ["React", "TypeScript", "Problem Solving"],
      weaknesses: ["CSS Animations"],
      feedback:
        "Alex demonstrated strong React knowledge and excellent problem-solving skills. Their TypeScript understanding is advanced, and they communicated their thought process clearly. Could improve on CSS animations and transitions.",
      questions: [
        {
          id: "q1",
          question: "Explain React's virtual DOM and its benefits.",
          answer:
            "The virtual DOM is a lightweight copy of the actual DOM. React uses it to improve performance by minimizing direct DOM manipulations. It works by comparing the virtual DOM with the actual DOM and only updating what has changed.",
          score: 95,
          feedback: "Excellent explanation with clear understanding of the performance benefits.",
        },
        {
          id: "q2",
          question: "How would you optimize a React application?",
          answer:
            "I would use React.memo for functional components, useMemo and useCallback hooks to prevent unnecessary re-renders. Additionally, I'd implement code splitting with React.lazy and Suspense, and ensure proper key usage in lists.",
          score: 90,
          feedback: "Good understanding of optimization techniques. Could have mentioned bundle size optimization.",
        },
        {
          id: "q3",
          question: "Implement a CSS animation for a fade-in effect.",
          answer:
            "@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } .fade-in { animation: fadeIn 0.5s ease-in-out; }",
          score: 75,
          feedback:
            "Basic implementation works but lacks timing function variations and browser compatibility considerations.",
        },
      ],
      skills: [
        { name: "React", score: 95 },
        { name: "JavaScript", score: 90 },
        { name: "TypeScript", score: 88 },
        { name: "CSS", score: 75 },
        { name: "Problem Solving", score: 92 },
        { name: "Communication", score: 85 },
      ],
    },
    {
      id: "2",
      name: "Sarah Williams",
      avatar: "",
      score: 88,
      status: "Passed",
      strengths: ["JavaScript", "UI Design", "Communication"],
      weaknesses: ["State Management", "Testing"],
      feedback:
        "Sarah showed excellent JavaScript fundamentals and UI design skills. Her communication was clear and concise. Areas for improvement include advanced state management patterns and testing strategies.",
      questions: [
        {
          id: "q1",
          question: "Explain closures in JavaScript.",
          answer:
            "A closure is a function that has access to its own scope, the outer function's variables, and global variables. They're created when a function is defined within another function, allowing the inner function to access the outer function's variables even after the outer function has finished executing.",
          score: 95,
          feedback: "Comprehensive explanation with good examples.",
        },
        {
          id: "q2",
          question: "How would you implement a Redux-like state management from scratch?",
          answer:
            "I would create a central store object, implement a dispatch function to handle actions, and use reducer functions to update state based on actions. Components would subscribe to store changes.",
          score: 70,
          feedback: "Basic understanding present but lacks depth on immutability and middleware concepts.",
        },
      ],
      skills: [
        { name: "JavaScript", score: 92 },
        { name: "React", score: 85 },
        { name: "UI Design", score: 90 },
        { name: "State Management", score: 70 },
        { name: "Testing", score: 65 },
        { name: "Communication", score: 95 },
      ],
    },
  ]

  const candidate = candidates.find((c) => c.id === selectedCandidate)

  if (!candidate) {
    return <div>No candidate selected</div>
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 75) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="h-5 w-5 text-green-500" />
    if (score >= 75) return <AlertCircle className="h-5 w-5 text-yellow-500" />
    return <XCircle className="h-5 w-5 text-red-500" />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Candidate Analysis</h2>
        <Select value={selectedCandidate} onValueChange={setSelectedCandidate}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select candidate" />
          </SelectTrigger>
          <SelectContent>
            {candidates.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{candidate.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="outline"
                    className={`${
                      candidate.status === "Passed"
                        ? "bg-green-500"
                        : candidate.status === "Failed"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    } text-white border-0`}
                  >
                    {candidate.status}
                  </Badge>
                  <span className="text-sm font-medium">
                    Score: <span className={getScoreColor(candidate.score)}>{candidate.score}%</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="skills">Skills Assessment</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <ThumbsUp className="h-5 w-5 text-green-500" />
                      Strengths
                    </h3>
                    <div className="space-y-2">
                      {candidate.strengths.map((strength, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <ThumbsDown className="h-5 w-5 text-red-500" />
                      Areas for Improvement
                    </h3>
                    <div className="space-y-2">
                      {candidate.weaknesses.map((weakness, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span>{weakness}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    Overall Feedback
                  </h3>
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <p>{candidate.feedback}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="questions">
              <div className="space-y-6">
                {candidate.questions.map((question) => (
                  <Card key={question.id} className="overflow-hidden">
                    <CardHeader className="pb-2 bg-muted/30">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">{question.question}</CardTitle>
                        <div className="flex items-center gap-1">
                          {getScoreIcon(question.score)}
                          <span className={`font-medium ${getScoreColor(question.score)}`}>{question.score}%</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Candidate's Answer:</h4>
                          <p className="text-sm">{question.answer}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">Feedback:</h4>
                          <p className="text-sm text-muted-foreground">{question.feedback}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skills">
              <div className="space-y-6">
                {candidate.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className={getScoreColor(skill.score)}>{skill.score}%</span>
                    </div>
                    <Progress value={skill.score} className="h-2" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}


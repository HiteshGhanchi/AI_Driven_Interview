"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, ChevronUp, Search, Star, StarHalf } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Candidate {
  id: string
  name: string
  avatar: string
  score: number
  status: "Passed" | "Failed" | "Pending"
  strengths: string[]
  weaknesses: string[]
}

interface CandidateLeaderboardProps {
  interviewId: string
}

export function CandidateLeaderboard({ interviewId }: CandidateLeaderboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"score" | "name">("score")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Mock data for candidates
  const candidates: Candidate[] = [
    {
      id: "1",
      name: "Alex Johnson",
      avatar: "",
      score: 92,
      status: "Passed",
      strengths: ["React", "TypeScript", "Problem Solving"],
      weaknesses: ["CSS Animations"],
    },
    {
      id: "2",
      name: "Sarah Williams",
      avatar: "",
      score: 88,
      status: "Passed",
      strengths: ["JavaScript", "UI Design", "Communication"],
      weaknesses: ["State Management", "Testing"],
    },
    {
      id: "3",
      name: "Michael Brown",
      avatar: "",
      score: 76,
      status: "Pending",
      strengths: ["HTML/CSS", "Responsive Design"],
      weaknesses: ["JavaScript Fundamentals", "React Hooks"],
    },
    {
      id: "4",
      name: "Emily Davis",
      avatar: "",
      score: 65,
      status: "Failed",
      strengths: ["UI Design", "CSS"],
      weaknesses: ["JavaScript", "React", "Problem Solving"],
    },
    {
      id: "5",
      name: "David Wilson",
      avatar: "",
      score: 95,
      status: "Passed",
      strengths: ["JavaScript", "React", "TypeScript", "Testing"],
      weaknesses: ["Design Systems"],
    },
    {
      id: "6",
      name: "Jessica Martinez",
      avatar: "",
      score: 72,
      status: "Pending",
      strengths: ["CSS", "HTML", "UI Components"],
      weaknesses: ["JavaScript Logic", "State Management"],
    },
  ]

  // Sort and filter candidates
  const filteredCandidates = candidates
    .filter((candidate) => candidate.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "score") {
        return sortDirection === "asc" ? a.score - b.score : b.score - a.score
      } else {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      }
    })

  const toggleSort = (column: "score" | "name") => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("desc")
    }
  }

  const getStatusColor = (status: Candidate["status"]) => {
    switch (status) {
      case "Passed":
        return "bg-green-500"
      case "Failed":
        return "bg-red-500"
      case "Pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle>Candidate Leaderboard</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSort("name")}
                    className="font-medium flex items-center gap-1 -ml-3"
                  >
                    Candidate
                    {sortBy === "name" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSort("score")}
                    className="font-medium flex items-center gap-1 -ml-3"
                  >
                    Score
                    {sortBy === "score" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Strengths</TableHead>
                <TableHead>Areas for Improvement</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate, index) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={candidate.avatar} alt={candidate.name} />
                        <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{candidate.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{candidate.score}</span>
                      <div className="flex">
                        {candidate.score >= 90 ? (
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ) : candidate.score >= 70 ? (
                          <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ) : null}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getStatusColor(candidate.status)} text-white border-0`}>
                      {candidate.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {candidate.strengths.slice(0, 2).map((strength, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {strength}
                        </Badge>
                      ))}
                      {candidate.strengths.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{candidate.strengths.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {candidate.weaknesses.slice(0, 2).map((weakness, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {weakness}
                        </Badge>
                      ))}
                      {candidate.weaknesses.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{candidate.weaknesses.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" asChild>
                      <a href={`/interview/${interviewId}/candidate/${candidate.id}`}>View Details</a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}


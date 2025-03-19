"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Candidate {
  id: string
  name: string
  score: number
  status: "Passed" | "Failed"
}

interface CandidateLeaderboardProps {
  interviewId: string
}

export function CandidateLeaderboard({ interviewId }: CandidateLeaderboardProps) {
  const [candidates] = useState<Candidate[]>([
    { id: "1", name: "Alex Johnson", score: 92, status: "Passed" },
    { id: "2", name: "Sarah Williams", score: 88, status: "Passed" },
    { id: "3", name: "Michael Brown", score: 76, status: "Passed" },
    { id: "4", name: "Emily Davis", score: 65, status: "Failed" },
    { id: "5", name: "David Wilson", score: 95, status: "Passed" },
    { id: "6", name: "Jessica Martinez", score: 72, status: "Passed" },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>{candidate.id}</TableCell>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.score}</TableCell>
                <TableCell>{candidate.status}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" asChild>
                    <a href={`/interview/${interviewId}/candidate/${candidate.id}`}>Analysis</a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

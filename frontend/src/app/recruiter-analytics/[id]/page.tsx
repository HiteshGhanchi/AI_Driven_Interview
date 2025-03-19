"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Search } from 'lucide-react';
import DashboardNav from '@/components/dashboardNav';

const RecruiterAnalytics = () => {
  const initialCandidates = [
    { id: 1, initial: 'D', name: 'David Wilson', score: 95, status: 'Passed', strengths: ['JavaScript', 'React'], endorsements: '+2', areasForImprovement: ['Design Systems'] },
    { id: 2, initial: 'A', name: 'Alex Johnson', score: 92, status: 'Passed', strengths: ['React', 'TypeScript'], endorsements: '+1', areasForImprovement: ['CSS Animations'] },
    { id: 3, initial: 'S', name: 'Sarah Williams', score: 88, status: 'Passed', strengths: ['JavaScript', 'UI Design'], endorsements: '+1', areasForImprovement: ['State Management', 'Testing'] },
    { id: 4, initial: 'M', name: 'Michael Brown', score: 76, status: 'Pending', strengths: ['HTML/CSS', 'Responsive Design'], endorsements: '', areasForImprovement: ['JavaScript Fundamentals', 'React Hooks'] },
    { id: 5, initial: 'J', name: 'Jessica Martinez', score: 72, status: 'Pending', strengths: ['CSS', 'HTML'], endorsements: '+1', areasForImprovement: ['JavaScript Logic', 'State Management'] },
    { id: 6, initial: 'E', name: 'Emily Davis', score: 65, status: 'Failed', strengths: ['UI Design', 'CSS'], endorsements: '+1', areasForImprovement: ['JavaScript', 'React'] }
  ];

  const [candidates, setCandidates] = useState(initialCandidates);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState('desc');
  const router = useRouter(); // Initialize useRouter hook

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setCandidates(initialCandidates);
    } else {
      const filtered = initialCandidates.filter(candidate => 
        candidate.name.toLowerCase().includes(term) ||
        candidate.strengths.join(' ').toLowerCase().includes(term)
      );
      setCandidates(filtered);
    }
  };

  const toggleSort = () => {
    const newDirection = sortDirection === 'desc' ? 'asc' : 'desc';
    setSortDirection(newDirection);
    
    const sorted = [...candidates].sort((a, b) => {
      return newDirection === 'desc' 
        ? b.score - a.score
        : a.score - b.score;
    });
    
    setCandidates(sorted);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Passed':
        return <Badge className="bg-green-500">{status}</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-500">{status}</Badge>;
      case 'Failed':
        return <Badge className="bg-red-500 text-white">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const InitialBadge = ({ initial }) => (
    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-700">
      {initial}
    </div>
  );

  const handleViewDetails = () => {
    router.push('/analytics'); // Navigate to the /analytics page
  };

  return (
    <div className="bg-white "> {/* White background for entire body */}
      <DashboardNav />
      <Card className="w-full max-w-6xl mx-auto mt-24 shadow-lg text-black"> {/* Purple background for the card */}
        <CardHeader className="border-b ">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Candidate Leaderboard</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 bg-purple-100 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-8 bg-purple-100"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 bg-white text-black"> {/* White background for the content area */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead className="w-24 cursor-pointer" onClick={toggleSort}>
                  <div className="flex items-center">
                    Score
                    <span className="ml-1">{sortDirection === 'desc' ? '▼' : '▲'}</span>
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Strengths</TableHead>
                <TableHead>Areas for Improvement</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates.map((candidate, index) => (
                <TableRow key={candidate.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <InitialBadge initial={candidate.initial} />
                      <span>{candidate.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {candidate.score} {candidate.score >= 90 && '⭐'}
                  </TableCell>
                  <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {candidate.strengths.map((strength, i) => (
                        <Badge key={i} variant="outline" className="bg-gray-100">
                          {strength}
                        </Badge>
                      ))}
                      {candidate.endorsements && (
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          {candidate.endorsements}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {candidate.areasForImprovement.map((area, i) => (
                        <Badge key={i} variant="outline" className="bg-gray-100">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline"  
                      className="bg-purple-300 text-black"
                      size="sm"
                      onClick={handleViewDetails} // Trigger the navigation when clicked
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecruiterAnalytics;

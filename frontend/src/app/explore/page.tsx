"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardNav from "@/components/dashboardNav";

interface Opportunity {
  id: string;
  role: string;
  description: string;
  experience: string;
  createdAt: string;
}

export default function Explore() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch opportunities from API or local storage
    const fetchOpportunities = async () => {
      // Replace with actual API call
      const data: Opportunity[] = [
        {
          id: "1",
          role: "Frontend Developer",
          description: "React, Next.js, TypeScript",
          experience: "2-4 years experience",
          createdAt: "Jul 15, 2023",
        },
        {
          id: "2",
          role: "Backend Developer",
          description: "Node.js, Express, PostgreSQL",
          experience: "3-5 years experience",
          createdAt: "Aug 22, 2023",
        },
      ];
      setOpportunities(data);
    };
    fetchOpportunities();
  }, []);

  const handleStart = (id: string) => {
    router.push(`/opportunity/${id}`);
  };

  return (
    <div>
        <DashboardNav/>
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
      {opportunities.map((opportunity) => (
        <Card key={opportunity.id} className="p-4 shadow-lg rounded-xl">
          <CardContent>
            <h2 className="text-xl font-semibold">{opportunity.role}</h2>
            <p className="text-gray-600 my-2">{opportunity.description}</p>
            <p className="text-gray-500 text-sm">{opportunity.experience}</p>
            <p className="text-gray-400 text-xs">Created: {opportunity.createdAt}</p>
            <Button onClick={() => handleStart(opportunity.id)} className=" bg-blue-300 mt-4 w-full">
              Start
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>

    </div>
  );
}

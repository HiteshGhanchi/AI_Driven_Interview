"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface Opportunity {
  id: string;
  role: string;
  description: string;
  experience: string;
  createdAt: string;
}

export default function OpportunityDetail() {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log(id);
    // Fetch specific opportunity from API or local storage
    const fetchOpportunity = async () => {
      // Replace with actual API call
      const data: Opportunity[] = [
        {
          id: "1",
          role: "Frontend Developer",
          description: "React, Next.js, TypeScript",
          experience: "3 years",
          createdAt: "Jul 15, 2023",
        },
        {
          id: "2",
          role: "Backend Developer",
          description: "Node.js, Express, PostgreSQL",
          experience: "3-5 years",
          createdAt: "Aug 22, 2023",
        },
      ];
      const selectedOpportunity = data.find((item) => item.id === id);
      setOpportunity(selectedOpportunity || null);
    };
    fetchOpportunity();
  }, [id]);

  if (!opportunity) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Let's get started</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Details */}
        <Card className="p-4 border rounded-lg shadow-md">
          <CardContent>
            <p className="font-semibold text-lg">
              <span className="font-bold">Job Role/Job Position:</span> {opportunity.role}
            </p>
            <p className="text-gray-600 mt-2">
              <span className="font-bold">Job Description/Tech Stack:</span> {opportunity.description}
            </p>
            <p className="text-gray-600 mt-2">
              <span className="font-bold">Years of Experience:</span> {opportunity.experience}
            </p>
          </CardContent>
        </Card>

        {/* Webcam Section */}
        <div className="p-4 border rounded-lg shadow-md flex flex-col items-center justify-center bg-gray-100">
          {/* <FaVideo className="text-6xl text-gray-700" /> */}
          <p className="mt-2 text-gray-600">Enable Web Cam and Microphone</p>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
        <p className="font-semibold">⚡ Information</p>
        <p className="text-sm">
          Enable Video Web Cam and Microphone to Start your AI Generated Mock Interview. 
          It has 5 questions which you can answer and will provide a report based on your answers. 
          <strong>NOTE:</strong> We never record your video. Web cam access can be disabled at any time.
        </p>
      </div>

      {/* Start Interview Button */}
      <div className="mt-6 flex justify-end">
        <Button className="bg-black text-white px-6 py-2 rounded-md"
        onClick={() => router.push(`/interview/${id}`)} >Start Interview</Button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const SignUp = () => {
  const [userType, setUserType] = useState("candidate");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
    experience: ""
  });
  const [error, setError] = useState<string | null>(null); // Error state
  const router = useRouter();

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Simple form validation (e.g., email, password length, etc.)
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setError(null); // Clear error on valid submission

    // Simulate a successful sign-up and redirect based on user type
    router.push(userType === "recruiter" ? "/dashboard" : "/dashboard-candidate");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-6 w-96 shadow-lg bg-white rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        
        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="flex justify-center gap-4 mb-4">
          <label className="cursor-pointer">
            <input 
              type="radio" 
              value="candidate" 
              checked={userType === "candidate"} 
              onChange={() => setUserType("candidate")} 
              className="hidden"
            />
            <span className={`px-3 py-1 border rounded ${userType === "candidate" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>Candidate</span>
          </label>
          <label className="cursor-pointer">
            <input 
              type="radio" 
              value="recruiter" 
              checked={userType === "recruiter"} 
              onChange={() => setUserType("recruiter")} 
              className="hidden"
            />
            <span className={`px-3 py-1 border rounded ${userType === "recruiter" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>Recruiter</span>
          </label>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <Input type="password" name="password" placeholder="Password" onChange={handleChange} required />

          {userType === "candidate" && (
            <>
              <Input type="text" name="skills" placeholder="Skills" onChange={handleChange} required />
              <Input type="number" name="experience" placeholder="Experience (years)" onChange={handleChange} required />
            </>
          )}

          <Button type="submit" className="w-full">Sign Up</Button>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;

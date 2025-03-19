"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { default as CandidateProvider, default as useCandidate } from "../../context/CandidateContext";


const Auth = () => {
  // const { registerCandidate } = useCandidate();
  // const [isSignUp, setIsSignUp] = useState(true);
  const [userType, setUserType] = useState(()=>localStorage.getItem("userType") || "candidate");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
    experience: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSignUp = searchParams.get("isSignUp") === "true";

  // useEffect(()=>{
  //   if(sign!=undefined){
  //     setIsSignUp(sign==="true");
  //   }
  // }, [isSignUp]);

  const toggleForm = () => {
    router.push(`/auth?isSignUp=${!isSignUp}`); // Toggle value in URL
  };

  useEffect(() => {
    localStorage.setItem("userType", userType);
  }, [userType]);

  const registerCandidate = async (data) => {
    return await axios.post("http://localhost:8000/candidate/register", data);
  };

  const loginCandidate = async (data) => {
    return await axios.post("http://localhost:8000/candidate/login", data);
  };

  const registerRecruiter = async (data) => {
    return await axios.post("http://localhost:8000/recruiter/register", data);
  };

  const loginRecruiter = async (data) => {
    return await axios.post("http://localhost:8000/recruiter/login", data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const t = localStorage.getItem("userType");
    console.log(t);
    if(t=="candidate" && isSignUp){
        try {
          const { data } = await registerCandidate(formData);
          localStorage.setItem("token",  data.token);
          console.log(data.token);
          setSuccess("Candidate registered successfully!");
          setFormData({ name: "", email: "", password:"", skills: "", experience:""});
          router.push(userType === "recruiter" ? "/dashboard" : "/dashboard-candidate");

        } catch (err) {
          setError(err.response?.data?.error || "Failed to register candidate");
        } finally {
          setLoading(false);
        }
    }

    if(t=="recruiter" && isSignUp){
      try {
        const { data } = await registerRecruiter({name: formData.name, email: formData.email, password: formData.password});
        localStorage.setItem("token",  data.token);
          console.log(data.token);
        setSuccess("Candidate registered successfully!");
        setFormData({ name: "", email: "", password:"", skills: "", experience:""});
        router.push(userType === "recruiter" ? "/dashboard" : "/dashboard-candidate");

      } catch (err) {
        setError(err.response?.data?.error || "Failed to register candidate");
      } finally {
        setLoading(false);
      }
  }
  if(t=="candidate" && !isSignUp){
    try {
      const { data } = await loginCandidate({email: formData.email, password: formData.password});
      localStorage.setItem("token",  data.token);
      console.log(data.token);
      setSuccess("Candidate registered successfully!");
      setFormData({ name: "", email: "", password:"", skills: "", experience:""});
      router.push(userType === "recruiter" ? "/dashboard" : "/dashboard-candidate");

    } catch (err) {
      setError(err.response?.data?.error || "Failed to register candidate");
    } finally {
      setLoading(false);
    }
}
if(t=="recruiter" && !isSignUp){
  try {
    const { data } = await loginRecruiter({email: formData.email, password: formData.password});
    localStorage.setItem("token",  data.token);
    console.log(data.token);
    setSuccess("Candidate registered successfully!");
    setFormData({ name: "", email: "", password:"", skills: "", experience:""});
    router.push(userType === "recruiter" ? "/dashboard" : "/dashboard-candidate");

  } catch (err) {
    setError(err.response?.data?.error || "Failed to register candidate");
  } finally {
    setLoading(false);
  }
}
  };

  return (
    // <CandidateProvider>
    <div className="flex justify-center items-center min-h-screen bg-purple-100">
      <Card className="p-6 w-96 shadow-lg bg-white rounded-lg border border-purple-300">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
          <div className="flex justify-center gap-4 mb-4">
            <label className="cursor-pointer">
              <input 
                type="radio" 
                value="candidate" 
                checked={userType === "candidate"} 
                onChange={() => setUserType("candidate")} 
                className="hidden"
              />
              <span className={`px-3 py-1 border rounded ${userType === "candidate" ? "bg-purple-500 text-white" : "bg-purple-200 text-purple-700"}`}>
                Candidate
              </span>
            </label>
            <label className="cursor-pointer">
              <input 
                type="radio" 
                value="recruiter" 
                checked={userType === "recruiter"} 
                onChange={() => setUserType("recruiter")} 
                className="hidden"
              />
              <span className={`px-3 py-1 border rounded ${userType === "recruiter" ? "bg-purple-500 text-white" : "bg-purple-200 text-purple-700"}`}>
                Recruiter
              </span>
            </label>
          </div>

        <form className="flex flex-col gap-3">
          {isSignUp && <Input type="text" name="name" placeholder="Name" onChange={handleChange} required className="border-purple-300" />}
          <Input type="email" name="email" placeholder="Email" onChange={handleChange} required className="border-purple-300" />
          <Input type="password" name="password" placeholder="Password" onChange={handleChange} required className="border-purple-300" />
          {isSignUp && userType === "candidate" && (
            <>
              <Input type="text" name="skills" placeholder="Skills" onChange={handleChange} required className="border-purple-300" />
              <Input type="number" name="experience" placeholder="Experience (years)" onChange={handleChange} required className="border-purple-300" />
            </>
          )}
          <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white" onClick={handleSubmit}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>
        <Button variant="ghost" onClick={toggleForm} className="w-full mt-3 text-purple-700 hover:bg-purple-200">
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </Button>
      </Card>
    </div>
    // </CandidateProvider>
  );
};

export default Auth;
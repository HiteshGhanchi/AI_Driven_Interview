"use client"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import axios from "axios"

export default function SignInP() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [type, setType] = useState("candidate")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // You can add your authentication logic here (e.g., API calls)
    
    // Navigate based on the selected role
    if (type === "candidate") {
      const res = await axios.post(`http://localhost:8000/candidate/login`, {email, password});
      console.log(res);     
      localStorage.setItem("token", JSON.stringify(res.data.token));
      // router.push("/dashboard-candidate")
    } else if (type === "recruiter") {

      const res = await axios.post(`http://localhost:8000/recruiter/login`, {email, password});
      console.log(res);     
      localStorage.setItem("token", JSON.stringify(res.data.token));
      // router.push("/recruiter")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col gap-6 bg-white p-8 rounded-xl shadow-2xl w-96" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-gray-800 text-center">Sign In</h2>
        <p className="text-sm text-gray-500 text-center">Welcome back! Please sign in to continue</p>
        
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Role</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
          >
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
          />
        </div>

        <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Forgot password?
            </a>
          </div>

        <button 
          type="submit"
          className="mt-4 bg-black text-white font-semibold py-3 rounded-lg hover:scale-105 transition-transform duration-200 shadow-lg"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}

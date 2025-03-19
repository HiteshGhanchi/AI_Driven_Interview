import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Brain, CheckCircle, Clock, Target, Video } from "lucide-react";
import Link from "next/link";
import RandomBlurCircle from "../components/ui/random";

export default function Home() {
  
    const generateRandomFraction = () => {
      const fractions = ["1/6", "1/5", "1/4", "1/3", "1/2", "2/3", "3/4"];
      return fractions[Math.floor(Math.random() * fractions.length)];
    };

    const generateRandomSize = () => {
      const sizes = ["w-20 h-20", "w-24 h-24", "w-28 h-28", "w-32 h-32", "w-36 h-36"];
      return sizes[Math.floor(Math.random() * sizes.length)];
    };

    const RandomBlurCircles = ({ n }) => {
      const circles = Array.from({ length: n }, (_, i) => ({
        top: Math.random() > 0.5 ? `top-${generateRandomFraction()}` : `bottom-${generateRandomFraction()}`,
        left: Math.random() > 0.5 ? `left-${generateRandomFraction()}` : `right-${generateRandomFraction()}`,
        size: generateRandomSize(),
      }));
      return (
        <>
          {circles.map((circle, index) => (
            <div
              key={index}
              className={`absolute ${circle.top} ${circle.left} ${circle.size} bg-purple-500 rounded-full opacity-20 blur-xl hidden md:block`}
            ></div>
          ))}
        </>
      );
    };
    

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen overflow-x-hidden">
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-purple-50 to-white py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 z-12">
              Ace Your Next Interview with AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl z-6">
              Practice interviews with AI-powered feedback on your speech and body language to boost your confidence and
              performance.
            </p>
            <Button
              size="lg"
              className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full"
            >
              <Link href="/interview" className="flex items-center gap-2 z-12">
                Start Interview <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Abstract shapes for visual interest */}
        <RandomBlurCircle n = {50}/>
        {/* <RandomSquiggles n = {5}/> */}

      </section>

      {/* How It Works */}
      <section className="py-20 bg-white" id="how-it-works">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform makes interview preparation simple and effective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-purple-50">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 mb-6">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Receive Questions 🎯</h3>
              <p className="text-gray-600">
                Our AI generates relevant interview questions tailored to your industry and role.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-purple-50">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 mb-6">
                <Video className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Record Your Answers 🎥</h3>
              <p className="text-gray-600">
                Use our WebRTC-powered video recording to capture your responses with ease.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-purple-50">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 mb-6">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis & Feedback 📊</h3>
              <p className="text-gray-600">
                Get detailed insights on your speech patterns, body language, and content quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50" id="features">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to prepare for your next interview
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start p-6 bg-white rounded-xl shadow-sm">
              <CheckCircle className="h-6 w-6 text-purple-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">AI-Generated Questions ✅</h3>
                <p className="text-gray-600">
                  Smart question generation based on job descriptions and industry trends to ensure you're prepared for
                  anything.
                </p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-white rounded-xl shadow-sm">
              <Clock className="h-6 w-6 text-purple-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Auto-Recording & Countdown ⏳</h3>
                <p className="text-gray-600">
                  Seamless recording experience with countdown timers to simulate real interview pressure.
                </p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-white rounded-xl shadow-sm">
              <BarChart2 className="h-6 w-6 text-purple-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Speech & Body Language Analysis 📊</h3>
                <p className="text-gray-600">
                  Advanced AI analysis of your verbal communication, filler words, pace, and non-verbal cues.
                </p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-white rounded-xl shadow-sm">
              <Target className="h-6 w-6 text-purple-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Personalized Improvement Tips 🎯</h3>
                <p className="text-gray-600">
                  Actionable feedback and specific suggestions to help you improve with each practice session.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white" id="testimonials">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Users Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Success stories from people who landed their dream jobs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-purple-50 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold text-xl">
                  JS
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Jessica S.</h4>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "HireSenseAi helped me identify my tendency to use filler words. After just 3 practice sessions, I felt
                much more confident and landed my dream job at a tech giant!"
              </p>
              <div className="mt-4 flex">
                <span className="text-yellow-500">★★★★★</span>
              </div>
            </div>

            <div className="p-6 bg-purple-50 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold text-xl">
                  MK
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Michael K.</h4>
                  <p className="text-sm text-gray-500">Product Manager</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The AI feedback on my body language was eye-opening. I didn't realize how much I was fidgeting during
                interviews. This tool made a huge difference in my presentation."
              </p>
              <div className="mt-4 flex">
                <span className="text-yellow-500">★★★★★</span>
              </div>
            </div>

            <div className="p-6 bg-purple-50 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold text-xl">
                  AT
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Aisha T.</h4>
                  <p className="text-sm text-gray-500">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The personalized questions were spot-on for my industry. I was asked almost identical questions in my
                real interview! This tool gave me the edge I needed."
              </p>
              <div className="mt-4 flex">
                <span className="text-yellow-500">★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ready to Ace Your Next Interview?</h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Start practicing now and get personalized feedback to improve your interview skills.
            </p>
            <Button
              size="lg"
              className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full"
            >
              <Link href="/interview" className="flex items-center gap-2">
                Start Interview <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-50 border-t border-gray-200">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-bold text-xl text-purple-600">HireSenseAi</h3>
              <p className="text-sm text-gray-500">© {new Date().getFullYear()} HireSenseAi. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-purple-600">
                Privacy
              </Link>
              <Link href="/" className="text-gray-600 hover:text-purple-600">
                Terms
              </Link>
              <Link href="/" className="text-gray-600 hover:text-purple-600">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
      </main>
    </>
  );
}

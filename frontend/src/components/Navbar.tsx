// "use client";
// import { useUser } from "@clerk/nextjs";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function Navbar() {
//   const { isSignedIn } = useUser();
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`fixed top-0 w-full p-4 flex justify-between items-center transition-all duration-300 z-50 
//         ${isScrolled ? "bg-black/60 backdrop-blur-md" : "bg-black"}`}
//     >
//       <Link
//         href="/"
//         className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 transition-transform duration-200"
//       >
//         HireSense <span className="text-indigo-400">AI</span>
//       </Link>
//       <div>
//         {isSignedIn ? (
//           <>
//             <Link href="/dashboard" className="mr-4 font-bold text-white">
//               Dashboard
//             </Link>
//           </>
//         ) : (
//           <>
//             <Link href = {{ pathname: "/auth", query: { isSignUp: "false" } }} className="mr-4 font-bold text-white">
//               Sign In
//             </Link>
//             <Link href={{ pathname: "/auth", query: { isSignUp: "true" } }} className="font-bold text-white">
//               Sign Up
//             </Link>
//             {/* try to make these hover:text-shadow(class) if you can  */}
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

"use client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full p-4 flex justify-between items-center transition-all duration-300 z-50 
        ${isScrolled ? "bg-black/60 backdrop-blur-md" : "bg-black"}`}
    >
      <Link
        href="/"
        className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 transition-transform duration-200"
      >
        HireSense <span className="text-indigo-400">AI</span>
      </Link>
      <div>
        {isSignedIn ? (
          <>
            <Link href="/dashboard" className="mr-4 font-bold text-white">
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link href = {{ pathname: "/auth", query: { isSignUp: "false" } }} className="mr-4 font-bold text-white">
              Sign In
            </Link>
            <Link href={{ pathname: "/auth", query: { isSignUp: "true" } }} className="font-bold text-white">
              Sign Up
            </Link>
            {/* try to make these hover:text-shadow(class) if you can  */}
          </>
        )}
      </div>
    </nav>
  );
}


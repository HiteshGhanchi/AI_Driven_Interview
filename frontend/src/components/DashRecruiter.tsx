"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function DashboardNav() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold"><Link href="/" className="hover:text-gray-200">
              HireSense
            </Link></h1>
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/profile" className="hover:text-gray-200">
              Profile
            </Link>
          </li>
          <li>
            {/* <Link href="/hiresense" className="hover:text-gray-200">
              HireSense
            </Link> */}
          </li>
          <li>
            {/* <Link href="/opportunity" className="hover:text-gray-200">
              Create Opportunity
            </Link> */}
          </li>
          <li>
            {/* <Link href="/explore" className="hover:text-gray-200">
              Explore
            </Link> */}
          </li>
        </ul>
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <ChevronDown className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* HireSense dropdown or box layout */}
    
    </nav>
  );
}

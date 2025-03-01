"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <div>
        <h1 className="text-4xl font-bold mb-6">Welcome to CyberInsights</h1>
        <p className="text-lg mb-4">Exploring the human factor in cybersecurity.</p>
      </div>
      
      <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>

      {/* Post 1 */}
      <Link href="/posts/post1" className="w-2/3">
        <div className="bg-white shadow-md rounded-lg p-6 flex gap-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
          <div className="w-1/3">
            <Image
              src="/images/example1.jpg"
              alt="Buffer Overflow"
              width={200}
              height={200}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <div className="w-2/3 flex flex-col justify-center">
            <h3 className="hover:text-blue-500 hover:underline font-bold text-xl">
              Machine Problem 1: Buffer Overflow to Exit
            </h3>
            <p className="text-gray-600 mt-2">
              Understanding buffer overflow attacks and exploiting them in a controlled environment.
            </p>
          </div>
        </div>
      </Link>

      {/* Post 2 */}
      <Link href="/posts/post2" className="w-2/3 mt-4">
        <div className="bg-white shadow-md rounded-lg p-6 flex gap-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
          <div className="w-1/3">
            <Image
              src="/images/example2.jpg"
              alt="Security Concepts"
              width={200}
              height={200}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <div className="w-2/3 flex flex-col justify-center">
            <h3 className="hover:text-blue-500 hover:underline font-bold text-xl">
              The Weakest Link or the Strongest Shield?
            </h3>
            <p className="text-gray-600 mt-2">
              Understanding buffer overflow attacks and exploiting them in a controlled environment.
            </p>
          </div>
        </div>
      </Link>
    </div>


    </div>
  );
}

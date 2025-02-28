"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-6">Welcome to CyberInsights</h1>
      <p className="text-lg mb-4">Exploring the human factor in cybersecurity.</p>

      <div className="w-2/3 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
        <ul>
          <li className="mb-2">
            <Link href="/posts/post2" className="text-blue-500 hover:underline">
              Machine Problem 1: Buffer overflow to exit
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/posts/post1" className="text-blue-500 hover:underline">
              The Weakest Link or the Strongest Shield?
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

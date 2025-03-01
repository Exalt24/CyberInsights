"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-md">
        <Link href="/" className="flex items-center space-x-2 transform transition duration-300 hover:scale-105">
          <Image
            src="/logo.svg"
            alt="CyberInsights Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <h1 className="text-xl font-bold">CyberInsights</h1>
        </Link>

        <Link className="hover:underline hover:text-gray-500 transform transition duration-300 hover:scale-105" href="#about-authors" scroll={true}>
          About Us
        </Link>
      </nav>



      {/* Hero Section */}
      <header className="text-center py-12 bg-blue-50">
        <h2 className="text-6xl font-bold">CyberInsights</h2>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
        Your go-to source for insights on cybersecurity, tech trends, and online safety — helping you stay informed and protected in the digital world.
        </p>
      </header>

      {/* Blog Posts */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 py-10">
        
        {/* Blog Card 1 */}
        <Link href="/posts/post2">
          <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer flex flex-col h-full">
            <div className="relative">
              <Image src="/images/posts/post2.png" alt="Blog Image" width={400} height={250} className="w-full h-60 object-cover"/>
              <span className="absolute top-2 left-2 bg-yellow-500 text-white px-3 py-1 text-xs font-bold rounded">FEATURED</span>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-xs font-semibold text-gray-500">February 28, 2025</span>
              <h3 className="text-lg font-bold">Machine Problem 1: Buffer Overflow to Exit</h3>
              <p className="text-gray-600 mt-2 text-sm flex-grow">
                Explore how an unsafe <code>gets()</code> call in C enables a stack smash attack, as Eli Tan analyzes memory, crafts machine code, and hijacks execution to force an exit.
              </p>
              <span className="mt-4 inline-block text-green-600 font-bold hover:underline">Read full article &gt;&gt;</span>
            </div>
          </div>
        </Link>

        {/* Blog Card 2 */}
        <Link href="/posts/post1">
          <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer flex flex-col h-full">
            <Image src="/images/posts/post1.png" alt="Blog Image" width={400} height={250} className="w-full h-60 object-cover"/>
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-xs font-semibold text-gray-500">February 8, 2025</span>
              <h3 className="text-lg font-bold">The Weakest Link or the Strongest Shield? How Humans Shape Cybersecurity</h3>
              <p className="text-gray-600 mt-2 text-sm flex-grow">
                Discover how human behavior can be both the greatest vulnerability and the strongest defense in cybersecurity. 
              </p>
              <span className="mt-4 inline-block text-green-600 font-bold hover:underline">Read full article &gt;&gt; </span>
            </div>
          </div>
        </Link>

      </section>

      <section
        id="about-authors"
        aria-labelledby="about-authors-heading"
        className="min-h-screen flex flex-col items-center justify-center max-w-6xl mx-auto px-6"
      >
        <h2
          id="about-authors-heading"
          className="text-5xl font-bold mb-8 text-center hover:text-blue-500 transition-colors duration-300"
        >
          About Us
        </h2>

        <p className="mb-8 text-center w-3/4">CyberInsights is a cybersecurity-focused blog created by a team of four fourth-year Computer Science students from the CMSC 134 class at the University of the Philippines Cebu. Our goal is to explore the ever-evolving landscape of cybersecurity by breaking down technical concepts, analyzing real-world threats, and discussing defense strategies. We believe that security is not just about technology but also about the people who use it. Through our articles, we aim to bridge the gap between theory and practice, making cybersecurity knowledge more accessible and engaging for everyone—from students and professionals to everyday users navigating the digital world.</p>

        <h3
          id="about-authors-heading"
          className="text-3xl font-semibold mb-8 text-center"
        >
          Meet the Team
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full mb-6">
          <div className="flex flex-col items-center p-4 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors duration-300">
            <Image
              src="/images/carl.jpg"
              alt="Carl Asoy"
              width={40}
              height={40}
              className="w-24 h-24 rounded-full mb-2"
            />
            <p className="text-center text-lg font-medium">Asoy, Carl</p>
            <p className="text-center text-sm text-gray-500 mt-2">
              Cybersecurity researcher passionate about network defense.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors duration-300">
            <Image
              src="/images/jade.jpg"
              alt="Jade Cataques"
              width={40}
              height={40}
              className="w-24 h-24 rounded-full mb-2"
            />
            <p className="text-center text-lg font-medium">Cataques, Jade</p>
            <p className="text-center text-sm text-gray-500 mt-2">
              Innovator in cybersecurity solutions and data protection.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors duration-300">
            <Image
              src="/images/daniel.png"
              alt="Daniel Cruz"
              width={40}
              height={40}
              className="w-24 h-24 rounded-full mb-2"
            />
            <p className="text-center text-lg font-medium">Cruz, Daniel</p>
            <p className="text-center text-sm text-gray-500 mt-2">Just a chill guy.</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors duration-300">
            <Image
              src="/images/liam.jpg"
              alt="Liam Gillamac"
              width={40}
              height={40}
              className="w-24 h-24 rounded-full mb-2"
            />
            <p className="text-center text-lg font-medium">Gillamac, Liam</p>
            <p className="text-center text-sm text-gray-500 mt-2">
              Expert in software security and system resilience.
            </p>
          </div>
        </div>
      </section>



    </div>
  );
}

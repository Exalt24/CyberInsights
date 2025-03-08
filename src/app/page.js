"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, memo } from "react";
import BlogCard from "./components/BlogCard";

function ZoomableImage({ src, alt, className, width = 500, height = 500, zoomWidth = 800, zoomHeight = 800 }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => setIsZoomed(true);
  const handleClose = () => setIsZoomed(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Image
        src={imageError ? '/images/placeholder.jpg' : src}
        alt={alt}
        className={`${className} cursor-pointer transition-transform duration-300 hover:scale-105`}
        onClick={handleClick}
        onError={() => setImageError(true)}
        width={width}
        height={height}
      />
      {isZoomed && (
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        >
          <Image
            src={imageError ? '/images/placeholder.jpg' : src}
            alt={alt}
            className="max-w-full max-h-full transform transition-transform duration-300"
            onError={() => setImageError(true)}
            width={zoomWidth}
            height={zoomHeight}
          />
        </div>
      )}
    </>
  );
}

function DarkModeToggle({ isDarkMode, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-8 left-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg focus:outline-none transition duration-300 z-50"
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
}

const FloatingBackToTop = memo(function FloatingBackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg focus:outline-none transition duration-300 z-50"
        aria-label="Back to Top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    )
  );
});

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <div
      className={`${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"} min-h-screen`}
    >
      {/* Navigation Bar */}
      <nav className={`flex justify-between items-center px-10 py-4 shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <Link
          href="/"
          className="flex items-center space-x-2 transform transition duration-300 hover:scale-105"
        >
          <Image
            src="/logo.svg"
            alt="CyberInsights Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <h1 className="text-xl font-bold">CyberInsights</h1>
        </Link>

        <Link
          className="hover:underline hover:text-gray-500 transform transition duration-300 hover:scale-105"
          href="#about-authors"
          scroll={true}
        >
          About Us
        </Link>
      </nav>

      <header className={`text-center py-20 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <h2 className="text-6xl font-bold">CyberInsights</h2>
        <p className={`text-xl mt-4 mx-auto max-w-3xl ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
          Your go-to source for insights on cybersecurity, tech trends, and online safety — helping you stay informed and protected in the digital world.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 py-10">
        <BlogCard
          href="/posts/post2"
          isFeatured={true}
          imageSrc="/images/posts/post2.png"
          altText="Blog Image"
          date="February 28, 2025"
          title="Machine Problem 1: Buffer Overflow to Exit"
          description="Explore how an unsafe gets() call in C enables a stack smash attack, as Eli Tan analyzes memory, crafts machine code, and hijacks execution to force an exit."
          isDarkMode={isDarkMode}
        />

        <BlogCard
          href="/posts/post1"
          imageSrc="/images/posts/post1.png"
          altText="Blog Image"
          date="February 8, 2025"
          title="The Weakest Link or the Strongest Shield? How Humans Shape Cybersecurity"
          description="Discover how human behavior can be both the greatest vulnerability and the strongest defense in cybersecurity."
          isDarkMode={isDarkMode}
        />
      </section>

      <section
        id="about-authors"
        aria-labelledby="about-authors-heading"
        className="flex flex-col items-center justify-center max-w-6xl mx-auto px-6 py-6 mb-6"
      >
        <h2
          id="about-authors-heading"
          className="text-5xl font-bold mb-8 text-center hover:text-blue-500 transition-colors duration-300"
        >
          About Us
        </h2>

        <p className="mb-8 text-center w-3/4">
          CyberInsights is a cybersecurity-focused blog created by a team of four fourth-year Computer Science students from the CMSC 134 class at the University of the Philippines Cebu. Our goal is to explore the ever-evolving landscape of cybersecurity by breaking down technical concepts, analyzing real-world threats, and discussing defense strategies. We believe that security is not just about technology but also about the people who use it. Through our articles, we aim to bridge the gap between theory and practice, making cybersecurity knowledge more accessible and engaging for everyone—from students and professionals to everyday users navigating the digital world.
        </p>

        <h3 className="text-3xl font-semibold mb-8 text-center">
          Meet the Team
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className={`flex flex-col items-center p-4 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-blue-900' : 'bg-gray-200 hover:bg-blue-400'} transition-colors duration-300`}>
            <ZoomableImage
              src="/images/carl.jpg"
              alt="Carl Asoy"
              className="w-24 h-24 rounded-full mb-2"
            />
            <p className="text-center text-lg font-medium">
              Asoy, Carl
            </p>
            <p className="text-center text-sm text-gray-500 mt-2">
              Cybersecurity researcher passionate about network defense.
            </p>
          </div>
          <div className={`flex flex-col items-center p-4 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-blue-900' : 'bg-gray-200 hover:bg-blue-400'} transition-colors duration-300`}>
            <ZoomableImage
              src="/images/jade.jpg"
              alt="Jade Cataques"
              className="w-24 h-24 rounded-full mb-2"
            />
            <p className="text-center text-lg font-medium">
              Cataques, Jade
            </p>
            <p className="text-center text-sm text-gray-500 mt-2">
              Innovator in cybersecurity solutions and data protection.
            </p>
          </div>
          <div className={`flex flex-col items-center p-4 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-blue-900' : 'bg-gray-200 hover:bg-blue-400'} transition-colors duration-300`}>
            <ZoomableImage
              src="/images/daniel.png"
              alt="Daniel Cruz"
              className="w-24 h-24 rounded-full mb-2"
            />
            <p className="text-center text-lg font-medium">
              Cruz, Daniel
            </p>
            <p className="text-center text-sm text-gray-500 mt-2">
              Just a chill guy.
            </p>
          </div>
          <div className={`flex flex-col items-center p-4 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-blue-900' : 'bg-gray-200 hover:bg-blue-400'} transition-colors duration-300`}>
            <ZoomableImage
              src="/images/liam.jpg"
              alt="Liam Gillamac"
              className="w-24 h-24 rounded-full mb-2"
            />
            <p className="text-center text-lg font-medium">
              Gillamac, Liam
            </p>
            <p className="text-center text-sm text-gray-500 mt-2">
              Expert in software security and system resilience.
            </p>
          </div>
        </div>
      </section>

      <footer className={`${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"} py-6 px-10 text-center`}>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} CyberInsights. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Made with ❤️ by the CyberInsights Team.
        </p>
      </footer>

      {/* Dark mode toggle and floating back-to-top buttons */}
      <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <FloatingBackToTop />
    </div>
  );
}

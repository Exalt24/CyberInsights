"use client";

import Navbar from '../../components/Navbar';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState, memo } from 'react';

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

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
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
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
}

const Footer = memo(function Footer({ isDarkMode }) {
  const bgClass = isDarkMode ? "bg-gray-800" : "bg-white";
  const borderClass = isDarkMode ? "border-t border-gray-700" : "border-t border-gray-200";
  const textClass = isDarkMode ? "text-gray-300" : "text-gray-600";

  return (
    <footer className={`${bgClass} ${borderClass} py-4`}>
      <div className={`max-w-7xl mx-auto px-4 text-center ${textClass}`}>
        <p>&copy; {new Date().getFullYear()} 5B's CyberInsights. All rights reserved.</p>
        <p className="mt-2">We Love You Sir Eli!</p>
      </div>
    </footer>
  );
});

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Original() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  useEffect(() => {
    const sectionIds = [
      'introduction',
      'compiling',
      'finding-addresses',
      'obtaining-machine-code',
      'writing-down-the-shellcode',
      'running-the-program-in-gdb',
      'conclusion'
    ];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <>
      <Head>
        <title>
          Machine Problem 1: Buffer overflow to exit
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="A writeup on computer security principles, human factors, and real-world breaches."
        />
      </Head>

      <ReadingProgressBar />
      <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Navbar isDarkMode={isDarkMode}/>

      <div className={isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"}>
        <main id="top" className="min-h-screen py-7 px-4 pt-0">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 ml-5">
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
                        onClick={(e) => { e.preventDefault(); scrollToSection('introduction'); }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${activeSection === 'introduction' ? 'text-blue-600 font-bold' : ''}`}
                      >
                        Introduction
                      </a>
                    </li>
                    <li>
                      <a
                        href="#compiling"
                        onClick={(e) => { e.preventDefault(); scrollToSection('compiling'); }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${activeSection === 'compiling' ? 'text-blue-600 font-bold' : ''}`}
                      >
                        Compiling
                      </a>
                    </li>
                    <li>
                      <a
                        href="#finding-addresses"
                        onClick={(e) => { e.preventDefault(); scrollToSection('finding-addresses'); }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${activeSection === 'finding-addresses' ? 'text-blue-600 font-bold' : ''}`}
                      >
                        Finding Addresses
                      </a>
                    </li>
                    <li>
                      <a
                        href="#obtaining-machine-code"
                        onClick={(e) => { e.preventDefault(); scrollToSection('obtaining-machine-code'); }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${activeSection === 'obtaining-machine-code' ? 'text-blue-600 font-bold' : ''}`}
                      >
                        Obtaining Machine Code
                      </a>
                    </li>
                    <li>
                      <a
                        href="#writing-down-the-shellcode"
                        onClick={(e) => { e.preventDefault(); scrollToSection('writing-down-the-shellcode'); }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${activeSection === 'writing-down-the-shellcode' ? 'text-blue-600 font-bold' : ''}`}
                      >
                        Writing down the Shellcode
                      </a>
                    </li>
                    <li>
                      <a
                        href="#running-the-program-in-gdb"
                        onClick={(e) => { e.preventDefault(); scrollToSection('running-the-program-in-gdb'); }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${activeSection === 'running-the-program-in-gdb' ? 'text-blue-600 font-bold' : ''}`}
                      >
                        Running the program in gdb
                      </a>
                    </li>
                    <li>
                      <a
                        href="#conclusion"
                        onClick={(e) => { e.preventDefault(); scrollToSection('conclusion'); }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${activeSection === 'conclusion' ? 'text-blue-600 font-bold' : ''}`}
                      >
                        Conclusion
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>

            <article className="md:col-span-7 ml-11">
              <h1 className="text-6xl font-bold mb-3 hover:scale-105 transform transition duration-300 mr-6">
                Machine Problem 1: Buffer overflow to exit
              </h1>

              <div className="text-justify mb-8">
                <p className="text-sm text-gray-500">
                  February 28, 2025
                </p>
              </div>

              <section id="introduction" aria-labelledby="introduction-heading" className="mb-10">
                <h2 id="introduction-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Introduction
                </h2>
                <p className="mb-4  ">
                  Picture this: It’s a Monday morning, you still haven’t had your coffee, and you’re trying to log into your email—only to discover your password has mysteriously changed overnight. Was it a glitch, or have hackers been plotting in the shadows like movie villains in a neon-lit basement?
                </p>
                <p className="mb-4  ">
                  In reality, many security breaches start with something far less dramatic: simple human error. Welcome to our fun-filled journey into computer security, where we’ll talk about security principles, specifically the <strong>human factors principle</strong>, real-world breaches, and the occasional jokes (yes, jokes!) to keep things light.
                </p>
                <p className="mb-4  ">
                  Spoiler Alert! Even if you have the toughest firewall in the galaxy, it’s all for nothing if an unsuspecting user clicks on a shady link. Let’s dive in!
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="compiling" aria-labelledby="compiling-heading" className="mb-10">
                <h2 id="compiling-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Compiling
                </h2>
                <p className="mb-4  ">
                  Ever watch a spy movie where the hero dodges lasers, cracks a code in seconds, and casually waltzes off with top-secret files? That’s basically a blueprint for what we <em>don’t</em> want in the real world—at least when it comes to our own data. <strong>Computer security</strong> is the shield we put up to block unauthorized access to our digital lives.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  The Basics
                </h3>
                <p className="mb-4  ">
                  At its core, computer security revolves around three big goals:
                </p>
                <ol className="list-decimal ml-6 mb-4">
                  <li className="mb-2  ">
                    <strong>Confidentiality</strong>: Keeping secrets secret.
                  </li>
                  <li className="mb-2  ">
                    <strong>Integrity</strong>: Ensuring data can’t be tampered with.
                  </li>
                  <li className="mb-2  ">
                    <strong>Availability</strong>: Making sure systems work when you need them.
                  </li>
                </ol>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Why It Matters
                </h3>
                <ul className="list-disc ml-6">
                  <li className="mb-2  ">
                    <strong>Personal Privacy</strong>: You probably don’t want strangers sifting through your selfies or bank details.
                  </li>
                  <li className="mb-2  ">
                    <strong>Financial Protection</strong>: Hackers love a quick payday.
                  </li>
                  <li className="mb-2  ">
                    <strong>Business Security</strong>: One data breach could spell disaster and lots of awkward apology emails.
                  </li>
                </ul>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="finding-addresses" aria-labelledby="finding-addresses-heading" className="mb-10">
                <h2 id="finding-addresses-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Finding Addresses
                </h2>

                <div className="mb-6">
                <div className={`w-full h-64 flex items-center justify-center rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <ZoomableImage
                    src="/images/3.png"
                    alt="Defense-in-Depth cybersecurity model"
                    className="w-full h-full object-contain"
                  />
                </div>
                  <p className="text-center text-sm text-gray-500 mt-2 hover:text-blue-500 transition-colors duration-300">
                    A layered approach to cybersecurity: Defense-in-Depth model.
                  </p>
                  <p className="text-center text-xs text-gray-400 mt-1">
                    Source: <a href="https://www.cybergasha.com/blog" className="hover:underline text-blue-400">https://www.cybergasha.com/blog</a>
                  </p>
                </div>

                <p className="mb-4  ">
                  Principles are like the <em>secret sauce</em> of decision-making—they help us make choices that align with our values and goals. And just like they guide us in life, they are also the guiding light of the cybersecurity world.
                </p>
                <p className="mb-4  ">
                  In this article, we will first provide an overview of the 11 security principles before proceeding to the in-depth discussion of the <strong>human factors principle</strong>. These principles act as the shield protecting systems, data, and users from digital villains—hackers, data breaches, and malicious threats.
                </p>
                <p className="mb-8  ">
                  Ready to understand how these principles work their magic? Let's jump in and explore the cybersecurity essentials that keep the bad guys at bay!
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Threat Model
                </h3>
                <p className="mb-4  ">
                  Threat modeling is about asking: <em>What do attackers want?</em> <em>What can they do?</em> and <em>Is it worth defending?</em> Knowing your enemy means you can choose defenses that make sense for your situation—whether you’re a global enterprise or a freelance artist.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Human Factors
                </h3>
                <p className="mb-4  ">
                  The main focus of this article and this is the big one—“Humans are the weakest link.” Even the best systems fail if humans fail because <em>to err is human</em>.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Security is Economics
                </h3>
                <p className="mb-4  ">
                  There’s always a cost-benefit balance in security. No system is 100% secure without becoming 0% usable. Think about bike locks: they can all be broken, but the goal is to deter casual theft and make it <em>not worth the effort</em>.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Detect If You Can’t Prevent
                </h3>
                <p className="mb-4  ">
                  You can’t stop every attack, but if you detect weird activity early on, you can respond before it’s too late. Think of this like a home alarm system—you may not stop the break-in, but you’ll know it happened.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Defense in Depth
                </h3>
                <p className="mb-4  ">
                  Layer multiple defenses, so if one fails, others can still stand. It’s the onion approach: many layers, sometimes tears.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Least Privilege
                </h3>
                <p className="mb-4  ">
                  Only grant the minimal access needed. If an account is compromised but has limited privileges, damage remains minimal.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Separation of Responsibility
                </h3>
                <p className="mb-4  ">
                  No single person or system should have unlimited power. Requiring multiple parties to collaborate makes fraud or sabotage much harder.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Complete Mediation
                </h3>
                <p className="mb-4  ">
                  Validate <strong>every</strong> access request rather than assuming trust after the first time. It’s like checking IDs at the door every day, not just once.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Shannon’s Maxim (Kerckhoffs’ Principle)
                </h3>
                <p className="mb-4  ">
                  Assume attackers know how your system works. Security through obscurity (like hiding a house key under the mat) isn’t true security.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Fail-Safe Defaults
                </h3>
                <p className="mb-4  ">
                  If something breaks, fail <em>securely</em> rather than leaving everything open.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Security from the Start
                </h3>
                <p className="mb-8 ">
                  Building security in from the beginning is easier and cheaper than trying to retrofit it later—like adding locks during home construction instead of after you’ve moved in.
                </p>
                <p className="mb-4 ">
                  Remember these security principles because you never know when a cybersecurity breach or a malicious attack might come knocking. But don’t worry, you’ve got this!
                </p>
                <p className="mb-4 ">
                  Speaking of "you," let's shift gears and dive deep into the <strong>human factors principle</strong>—because, let's face it, the biggest security threat could be YOU or someone sitting right across from you. Let’s explore how humans play a key role in cybersecurity, for better or worse.
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="obtaining-machine-code" aria-labelledby="obtaining-machine-code-heading" className="mb-10">
                <h2 id="obtaining-machine-code-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Human Factors as One of the Key Security Principles
                </h2>

                <div className="mb-6">
                <div className={`w-full h-64 flex items-center justify-center rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <ZoomableImage
                      src="/images/4.jpg"
                      alt="Phishing scam disguised as an iPhone giveaway"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2 hover:text-blue-500 transition-colors duration-300">
                    A visual example of a phishing scam disguised as an iPhone giveaway.
                  </p>
                  <p className="text-center text-xs text-gray-400 mt-1">
                    Source: <a href="https://www.pcrisk.com/removal-guides/24044-win-a-new-iphone-13-pop-up-scam" className="hover:underline text-blue-400">https://www.pcrisk.com/removal-guides/24044-win-a-new-iphone-13-pop-up-scam</a>
                  </p>
                </div>

                <p className="mb-4  ">
                  Even with top-notch firewalls, human behavior can undermine it all in a single click. Sir Eli’s takeaway? People are lazy, gullible, or simply unaware. All it takes is one “free iPhone giveaway” email to wreak havoc.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Why Humans Are the Weakest Link
                </h3>
                <ul className="list-disc ml-6 mb-4">
                  <li className="mb-2  ">
                    <strong>Laziness:</strong> We prefer easy, memorable passwords or skip reading warnings.
                  </li>
                  <li className="mb-2  ">
                    <strong>Curiosity/Gullibility:</strong> Phishing emails exploit our desire for freebies or “urgent” info.
                  </li>
                  <li className="mb-2  ">
                    <strong>Overconfidence:</strong> “I’ll never get hacked” is often famous last words.
                  </li>
                </ul>
                <p className=" ">
                  On the bright side, once we recognize our vulnerabilities, we can take steps to become the strongest defense—through training, careful habits, and a dash of healthy paranoia.
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="writing-down-the-shellcode" aria-labelledby="writing-down-the-shellcode-heading" className="mb-10">
                <h2 id="writing-down-the-shellcode-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Writing down the Shellcode
                </h2>

                <p className="mb-6  ">
                  Let’s take a fun trip down memory lane and revisit some <em>oops</em> moments in cybersecurity history. Prepare yourselves for some facepalm-worthy breaches where humans were definitely the weakest link in the chain.
                </p>

                <h3 className="text-xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  The Equifax Data Breach – A Big Oops in Credit Reporting
                </h3>

                <div className="mb-6">
                <div className={`w-full h-64 flex items-center justify-center rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <ZoomableImage
                      src="/images/example1.jpg"
                      alt="The Equifax Data Breach"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2 hover:text-blue-500 transition-colors duration-300">
                    <em>Equifax Data Breach – A small security lapse led to one of the biggest data breaches in history. </em>
                  </p>
                  <p className="text-center text-xs text-gray-400 mt-1">
                    Source: <a href="https://www.csoonline.com/article/567833/equifax-data-breach-faq-what-happened-who-was-affected-what-was-the-impact.html" className="hover:underline text-blue-400">https://www.csoonline.com/article/567833/</a>
                  </p>
                </div>

                <p className="mb-6  ">
                  In 2017, Equifax, a major credit reporting agency, suffered one of the largest data breaches in history by failing to patch a critical Apache Struts vulnerability despite multiple warnings. Worse, an expired security certificate prevented their system from detecting the breach for months. Hackers accessed sensitive data of 145 million U.S. citizens and over 10 million people in the UK. Equifax was fined £500,000 in the UK for failing to protect consumer data.
                </p>

                <h3 className="text-xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Strathmore College Data Breach – One Upload Away from a Nightmare
                </h3>

                <div className="mb-6">
                <div className={`w-full h-64 flex items-center justify-center rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <ZoomableImage
                      src="/images/example2.jpg"
                      alt="The Strathmore College Data Breach"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2 hover:text-blue-500 transition-colors duration-300">
                    <em>Strathmore College Data Breach – A simple upload mistake exposed students’ most private information. </em>
                  </p>
                  <p className="text-center text-xs text-gray-400 mt-1">
                    Source: <a href="https://www.theguardian.com/australia-news/2018/aug/22/melbourne-student-health-records-posted-online-in-appalling-privacy-breach" className="hover:underline text-blue-400">https://www.theguardian.com/australia-news/</a>
                  </p>
                </div>

                <p className="mb-6  ">
                  In August 2018, an employee at Strathmore Secondary College accidentally uploaded over 300 students’ sensitive records to the school’s intranet, exposing medical conditions, medications, and learning difficulties. The files remained accessible for a day, allowing students and parents to view or download them. The incident highlighted the risks of mishandling sensitive data, prompting staff training and an investigation by the Australian Department of Education.
                </p>

                <h3 className="text-xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Marine Corps Data Breach – One unencrypted email, 21,500 personal records at risk
                </h3>

                <div className="mb-6">
                <div className={`w-full h-64 flex items-center justify-center rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <ZoomableImage
                      src="/images/example3.jpg"
                      alt="The Marine Corps Data Breach"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2 hover:text-blue-500 transition-colors duration-300">
                    <em>Marine Corps Data Breach</em>
                  </p>
                  <p className="text-center text-xs text-gray-400 mt-1">
                    Source: <a href="https://www.marinecorpstimes.com/news/your-marine-corps/2018/02/28/major-data-breach-at-marine-forces-reserve-impacts-thousands/" className="hover:underline text-blue-400">https://www.marinecorpstimes.com/news/</a>
                  </p>
                </div>

                <p className="mb-6  ">
                  The United States Marine Corps faced a serious data leak in early 2018 when the Defense Travel System (DTS) accidentally sent an unencrypted email with an attachment to the wrong distribution list. The email, intended for internal use, included bank account numbers, Social Security Numbers and emergency contact information of around 21,500 Marines, sailors, and civilians. Once the breach was discovered, the Marines attempted to recall the emails and announced plans to strengthen security measures for sensitive communications.
                </p>

                <p className="mb-4 ">
                  <strong><em>So, what is the moral of the story?</em></strong>
                </p>
                <p className="mb-4 ">
                  <em>To err is human, but to prevent a data breach is divine.</em> These real-world examples show how simple mistakes can lead to catastrophic consequences. By understanding the risks and implementing best practices, organizations or even us commonfolks can avoid becoming the next headline.
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="running-the-program-in-gdb" aria-labelledby="running-the-program-in-gdb-heading" className="mb-10">
                <h2 id="running-the-program-in-gdb-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Running the program in gdb
                </h2>

                <p className="mb-6  ">
                  Let’s take a fun trip down memory lane and revisit some <em>oops</em> moments in cybersecurity history. Prepare yourselves for some facepalm-worthy breaches where humans were definitely the weakest link in the chain.
                </p>

                <h3 className="text-xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  The Equifax Data Breach – A Big Oops in Credit Reporting
                </h3>

                <div className="mb-6">
                <div className={`w-full h-64 flex items-center justify-center rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <ZoomableImage
                      src="/images/example1.jpg"
                      alt="The Equifax Data Breach"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2 hover:text-blue-500 transition-colors duration-300">
                    <em>Equifax Data Breach – A small security lapse led to one of the biggest data breaches in history. </em>
                  </p>
                  <p className="text-center text-xs text-gray-400 mt-1">
                    Source: <a href="https://www.csoonline.com/article/567833/equifax-data-breach-faq-what-happened-who-was-affected-what-was-the-impact.html" className="hover:underline text-blue-400">https://www.csoonline.com/article/567833/</a>
                  </p>
                </div>

                <p className="mb-6  ">
                  In 2017, Equifax, a major credit reporting agency, suffered one of the largest data breaches in history by failing to patch a critical Apache Struts vulnerability despite multiple warnings. Worse, an expired security certificate prevented their system from detecting the breach for months. Hackers accessed sensitive data of 145 million U.S. citizens and over 10 million people in the UK. Equifax was fined £500,000 in the UK for failing to protect consumer data.
                </p>

                <h3 className="text-xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Strathmore College Data Breach – One Upload Away from a Nightmare
                </h3>

                <div className="mb-6">
                <div className={`w-full h-64 flex items-center justify-center rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <ZoomableImage
                      src="/images/example2.jpg"
                      alt="The Strathmore College Data Breach"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2 hover:text-blue-500 transition-colors duration-300">
                    <em>Strathmore College Data Breach – A simple upload mistake exposed students’ most private information. </em>
                  </p>
                  <p className="text-center text-xs text-gray-400 mt-1">
                    Source: <a href="https://www.theguardian.com/australia-news/2018/aug/22/melbourne-student-health-records-posted-online-in-appalling-privacy-breach" className="hover:underline text-blue-400">https://www.theguardian.com/australia-news/</a>
                  </p>
                </div>

                <p className="mb-6  ">
                  In August 2018, an employee at Strathmore Secondary College accidentally uploaded over 300 students’ sensitive records to the school’s intranet, exposing medical conditions, medications, and learning difficulties. The files remained accessible for a day, allowing students and parents to view or download them. The incident highlighted the risks of mishandling sensitive data, prompting staff training and an investigation by the Australian Department of Education.
                </p>

                <h3 className="text-xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Marine Corps Data Breach – One unencrypted email, 21,500 personal records at risk
                </h3>

                <div className="mb-6">
                <div className={`w-full h-64 flex items-center justify-center rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <ZoomableImage
                      src="/images/example3.jpg"
                      alt="The Marine Corps Data Breach"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2 hover:text-blue-500 transition-colors duration-300">
                    <em>Marine Corps Data Breach</em>
                  </p>
                  <p className="text-center text-xs text-gray-400 mt-1">
                    Source: <a href="https://www.marinecorpstimes.com/news/your-marine-corps/2018/02/28/major-data-breach-at-marine-forces-reserve-impacts-thousands/" className="hover:underline text-blue-400">https://www.marinecorpstimes.com/news/</a>
                  </p>
                </div>

                <p className="mb-6  ">
                  The United States Marine Corps faced a serious data leak in early 2018 when the Defense Travel System (DTS) accidentally sent an unencrypted email with an attachment to the wrong distribution list. The email, intended for internal use, included bank account numbers, Social Security Numbers and emergency contact information of around 21,500 Marines, sailors, and civilians. Once the breach was discovered, the Marines attempted to recall the emails and announced plans to strengthen security measures for sensitive communications.
                </p>

                <p className="mb-4 ">
                  <strong><em>So, what is the moral of the story?</em></strong>
                </p>
                <p className="mb-4 ">
                  <em>To err is human, but to prevent a data breach is divine.</em> These real-world examples show how simple mistakes can lead to catastrophic consequences. By understanding the risks and implementing best practices, organizations or even us commonfolks can avoid becoming the next headline.
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="conclusion" aria-labelledby="conclusion-heading">
                <h2 id="conclusion-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Conclusion
                </h2>
                <p className="mb-4  ">
                  At the end of the day, technology can only do so much—people are the real weak link in cybersecurity. But with better education, smarter habits, and a little common sense, we can turn humans from security liabilities into security assets.
                </p>
                <p className="mb-4  ">
                  And remember: If you ever receive an email saying you’ve won a free iPhone, just delete it. Unless, of course, you enjoy giving hackers VIP access to your personal data.
                </p>
                <p className="mb-4  ">
                  Stay safe, stay smart, and for the love of cybersecurity—stop using "password123"!
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="about-authors" aria-labelledby="about-authors-heading" className="mt-12 mb-4">
                <h2
                  id="about-authors-heading"
                  className="text-2xl font-semibold mb-8 text-center hover:text-blue-500 transition-colors duration-300"
                >
                  Meet the Authors
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div className={`flex flex-col items-center p-4 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-blue-900' : 'bg-gray-200 hover:bg-blue-400'} transition-colors duration-300`}>
                    <ZoomableImage
                      src="/images/carl.jpg"
                      alt="Carl Asoy"
                      className="w-24 h-24 rounded-full mb-2"
                    />
                    <p className="text-center text-lg font-medium  ">
                      Asoy, Carl
                    </p>
                    <p className="text-center text-sm text-gray-500 mt-2  ">
                      Cybersecurity researcher passionate about network defense.
                    </p>
                  </div>
                  <div className={`flex flex-col items-center p-4 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-blue-900' : 'bg-gray-200 hover:bg-blue-400'} transition-colors duration-300`}>
                    <ZoomableImage
                      src="/images/jade.jpg"
                      alt="Jade Cataques"
                      className="w-24 h-24 rounded-full mb-2"
                    />
                    <p className="text-center text-lg font-medium  ">
                      Cataques, Jade
                    </p>
                    <p className="text-center text-sm text-gray-500 mt-2  ">
                      Innovator in cybersecurity solutions and data protection.
                    </p>
                  </div>
                  <div className={`flex flex-col items-center p-4 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-blue-900' : 'bg-gray-200 hover:bg-blue-400'} transition-colors duration-300`}>
                    <ZoomableImage
                      src="/images/daniel.png"
                      alt="Daniel Cruz"
                      className="w-24 h-24 rounded-full mb-2"
                    />
                    <p className="text-center text-lg font-medium  ">
                      Cruz, Daniel
                    </p>
                    <p className="text-center text-sm text-gray-500 mt-2  ">
                      Just a chill guy.
                    </p>
                  </div>
                  <div className={`flex flex-col items-center p-4 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-blue-900' : 'bg-gray-200 hover:bg-blue-400'} transition-colors duration-300`}>
                    <ZoomableImage
                      src="/images/liam.jpg"
                      alt="Liam Gillamac"
                      className="w-24 h-24 rounded-full mb-2"
                    />
                    <p className="text-center text-lg font-medium  ">
                      Gillamac, Liam
                    </p>
                    <p className="text-center text-sm text-gray-500 mt-2  ">
                      Expert in software security and system resilience.
                    </p>
                  </div>
                </div>
              </section>


            </article>

            <aside className="md:col-span-1 hidden md:block">
            </aside>
          </div>
        </main>
      </div>

      <Footer isDarkMode={isDarkMode} />
      <FloatingBackToTop />
    </>
  );
}

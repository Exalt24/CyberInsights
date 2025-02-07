"use client";

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

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  useEffect(() => {
    const sectionIds = [
      'introduction',
      'what-is-computer-security',
      'security-principles',
      'human-factors',
      'real-world-breaches',
      'common-mistakes',
      'best-practices',
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
          The Weakest Link or the Strongest Shield? How Humans Shape Cybersecurity - CyberInsights
        </title>
        <meta
          name="description"
          content="A writeup on computer security principles, human factors, and real-world breaches."
        />
      </Head>

      <ReadingProgressBar />
      <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <div className={isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"}>
        <main id="top" className="min-h-screen py-7 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 ml-4">
            <aside className="md:col-span-3 hidden md:block">
              <div className="sticky space-y-6" style={{ top: "20px" }}>
                <div className="text-justify">
                  <h2 className="text-4xl font-bold text-blue-400 drop-shadow-lg hover:scale-105 transform transition duration-300 mb-2">
                    CyberInsights
                  </h2>
                  <p className="text-md text-blue-300 hover:scale-105 transform transition duration-300 ml-2">
                    by 5B
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-4 mt-12 hover:text-blue-500 transition-colors duration-300">
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
                        href="#what-is-computer-security"
                        onClick={(e) => { e.preventDefault(); scrollToSection('what-is-computer-security'); }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${activeSection === 'what-is-computer-security' ? 'text-blue-600 font-bold' : ''}`}
                      >
                        What is Computer Security?
                      </a>
                    </li>
                    <li>
                      <a
                        href="#security-principles"
                        onClick={(e) => { e.preventDefault(); scrollToSection('security-principles'); }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${activeSection === 'security-principles' ? 'text-blue-600 font-bold' : ''}`}
                      >
                        Security Principles
                      </a>
                    </li>
                    <li>
                      <a
                        href="#human-factors"
                        onClick={(e) => { e.preventDefault(); scrollToSection('human-factors'); }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${activeSection === 'human-factors' ? 'text-blue-600 font-bold' : ''}`}
                      >
                        Human Factors
                      </a>
                    </li>
                    <li>
                      <a
                        href="#real-world-breaches"
                        onClick={(e) => { e.preventDefault(); scrollToSection('real-world-breaches'); }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${activeSection === 'real-world-breaches' ? 'text-blue-600 font-bold' : ''}`}
                      >
                        Real-World Breaches
                      </a>
                    </li>
                    <li>
                      <a
                        href="#common-mistakes"
                        onClick={(e) => { e.preventDefault(); scrollToSection('common-mistakes'); }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${activeSection === 'common-mistakes' ? 'text-blue-600 font-bold' : ''}`}
                      >
                        Common Mistakes
                      </a>
                    </li>
                    <li>
                      <a
                        href="#best-practices"
                        onClick={(e) => { e.preventDefault(); scrollToSection('best-practices'); }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${activeSection === 'best-practices' ? 'text-blue-600 font-bold' : ''}`}
                      >
                        Best Practices
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

            <article className="md:col-span-6">
              <h1 className="text-6xl font-bold mb-3 hover:scale-105 transform transition duration-300">
                The Weakest Link or the Strongest Shield? How Humans Shape Cybersecurity
              </h1>

              <div className="text-justify mb-8">
                <p className="text-md text-gray-500 italic mb-2 mt-5">
                  How everyday actions impact cybersecurity
                </p>
                <p className="text-sm text-gray-500">
                  February 08, 2025
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

              <section id="what-is-computer-security" aria-labelledby="what-is-computer-security-heading" className="mb-10">
                <h2 id="what-is-computer-security-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  What is Computer Security?
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

              <section id="security-principles" aria-labelledby="security-principles-heading" className="mb-10">
                <h2 id="security-principles-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Overview of Security Principles
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

              <section id="human-factors" aria-labelledby="human-factors-heading" className="mb-10">
                <h2 id="human-factors-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
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

              <section id="real-world-breaches" aria-labelledby="real-world-breaches-heading" className="mb-10">

                <h2 id="real-world-breaches-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Real-World Security Breaches Due to Human Factors
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

              <section id="common-mistakes" aria-labelledby="common-mistakes-heading" className="mb-10">
                <h2 id="common-mistakes-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Common Human-Related Security Mistakes
                </h2>
                <p className="mb-4">
                  Cybersecurity is not just about firewalls and encryption. Human behavior plays a crucial role in keeping systems and data safe. Unfortunately, many people unknowingly make security mistakes that put them at risk. Here are some of the most common human-related security mistakes.
                </p>
                <ul className="list-disc pl-5 space-y-4 mb-6">
                  <li><strong>Weak Passwords.</strong> If you are using "123456" or "password," it's time for a change. A brute-force attack can crack these in seconds. Upgrade to a stronger password by using a mix of uppercase and lowercase letters, numbers, and special characters.</li>
                  <div className="mb-6">
                    <div className={`w-full h-64 flex items-center justify-center rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <ZoomableImage
                        src="/images/5.png"
                        alt="Table of times to brute force a password"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-2 hover:text-blue-500 transition-colors duration-300">
                      Time it takes to brute force a password.
                    </p>
                    <p className="text-center text-xs text-gray-400 mt-1">
                      Source: <a href="https://www.hivesystems.com/blog/are-your-passwords-in-the-green" className="hover:underline text-blue-400">https://www.hivesystems.com/blog/are-your-passwords-in-the-green</a>
                    </p>
                  </div>
                  <li><strong>Reusing Passwords.</strong> If one site gets hacked, attackers test that username-password combo everywhere. Reuse = big no-no.</li>
                  <li><strong>Falling for Phishing Scams.</strong> "You've won an iPhone 16!"—Sounds exciting, but it's likely a scam. Phishing emails often claim you've won a prize or pretend to be from your bank or employer to trick you into revealing credentials. Always verify—scammers bank on your trust.</li>
                  <li><strong>Ignoring Software Updates.</strong> “Remind me later” is the siren song of procrastination. These updates often patch major vulnerabilities, so skipping them leaves your system wide open.</li>
                  <li><strong>Trusting Public Wi-Fi.</strong> Free coffee shop Wi-Fi might be a hacker’s paradise. Avoid logging into sensitive accounts on unsecured networks, or use a VPN.</li>
                </ul>
                <p className="mb-4">
                  With all these <em>relatable mistakes</em>, one thing’s clear: the best part about being human is that we make mistakes, own up to them, and learn from them. It is what we called as being <strong>wonderfully human</strong>.
                </p>
                <p className="mb-4">
                  So, as we embrace our glorious imperfections, let’s wrap this up with the <em>final</em> chapter: <strong>Best Practices for Enhancing Human-Centric Security</strong>. Open your notes and jot down the super actionable tips that will help you keep your security game strong—because as much as we mess up, we can still turn things around in our favor.
                </p>
              </section>


              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="best-practices" aria-labelledby="best-practices-heading" className="mb-10">
                <h2 id="best-practices-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Best Practices for Enhancing Human-Centric Security
                </h2>
                <p className="mb-4">
                  By following these best practices, we can strengthen their security posture and reduce vulnerabilities:
                </p>
                <ul className="list-disc pl-5 space-y-4">
                  <li><strong>Use Multi-Factor Authentication (MFA).</strong> Password plus something else (like a code texted to you or a fingerprint). Even if someone steals your password, they still need that second factor.</li>
                  <li><strong>Don’t Be Lazy with Your Passwords!</strong> Use passphrases (e.g., “CorrectHorseBatteryStaple”), and consider a password manager. And never reuse passwords—ever.</li>
                  <li><strong>Keep Software Up-to-Date.</strong> Stop clicking “remind me later.” Updates patch holes hackers love to exploit. Automatic updates are your friend.</li>
                  <li><strong>Avoid Opening Suspicious Emails.</strong> Check the sender’s address, watch for grammar errors, and if something is “too good to be true,” it’s probably a trap.</li>
                  <li><strong>Use Secure Networks.</strong> Steer clear of public Wi-Fi for sensitive transactions. If you must, a VPN is your digital invisibility cloak.</li>
                  <li><strong>Back Up Your Data.</strong> Whether it’s ransomware or a spilled drink on your laptop, periodic backups can save your day.</li>
                  <li><strong>Stay Informed &amp; Train Regularly.</strong> Cyber threats evolve; staying updated on phishing techniques or new scams keeps you one step ahead. Conduct quick security refresher training or “phish drills” in your organization.</li>
                </ul>
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

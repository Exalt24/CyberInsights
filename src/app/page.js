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
          <div className="max-7xl mx-auto grid grid-cols-1 md:grid-cols-12 ml-4">
            <aside className="md:col-span-3 hidden md:block">
              <div className="sticky space-y-6" style={{ top: "20px" }}>
                <div className="text-justify">
                  <h2 className="text-4xl font-bold text-blue-400 drop-shadow-lg hover:scale-105 transform transition duration-300">
                    CyberInsights
                  </h2>
                  <p className="text-md text-blue-300 hover:scale-105 transform transition duration-300">
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
              <h1 className="text-6xl font-bold mb-2 hover:scale-105 transform transition duration-300">
                The Weakest Link or the Strongest Shield? How Humans Shape Cybersecurity
              </h1>

              <div className="text-justify mb-8">
                <p className="text-md text-gray-500 italic mb-2 mt-4 hover:text-blue-500 transition-colors duration-300">
                  How everyday actions impact cybersecurity
                </p>
                <p className="text-sm text-gray-500 hover:text-blue-500 transition-colors duration-300">
                  February 08, 2025
                </p>
              </div>

              <section id="introduction" aria-labelledby="introduction-heading" className="mb-10">
                <h2 id="introduction-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Introduction
                </h2>
                <p className="mb-4 hover:underline transition duration-300">
                  Picture this: It’s a Monday morning, you still haven’t had your coffee, and you’re trying to log into your email—only to discover your password has mysteriously changed overnight. Was it a glitch, or have hackers been plotting in the shadows like movie villains in a neon-lit basement?
                </p>
                <p className="mb-4 hover:underline transition duration-300">
                  In reality, many security breaches start with something far less dramatic: simple human error. Welcome to our fun-filled journey into computer security, where we’ll talk about <strong>Sir Eli’s</strong> principles, real-world breaches, and the occasional meme (yes, memes!) to keep things light.
                </p>
                <p className="mb-4 hover:underline transition duration-300">
                  Spoiler: even if you have the toughest firewall in the galaxy, it’s all for naught if an unsuspecting user clicks on a shady link. Let’s dive in!
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="what-is-computer-security" aria-labelledby="what-is-computer-security-heading" className="mb-10">
                <h2 id="what-is-computer-security-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  What is Computer Security?
                </h2>
                <p className="mb-4 hover:underline transition duration-300">
                  Ever watch a spy movie where the hero dodges lasers, cracks a code in seconds, and casually waltzes off with top-secret files? That’s basically a blueprint for what we <em>don’t</em> want in the real world—at least when it comes to our own data. <strong>Computer security</strong> is the shield we put up to block unauthorized access to our digital lives.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  The Basics
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  At its core, computer security revolves around three big goals:
                </p>
                <ol className="list-decimal ml-6 mb-4">
                  <li className="mb-2 hover:underline transition duration-300">
                    <strong>Confidentiality</strong>: Keeping secrets secret.
                  </li>
                  <li className="mb-2 hover:underline transition duration-300">
                    <strong>Integrity</strong>: Ensuring data can’t be tampered with.
                  </li>
                  <li className="mb-2 hover:underline transition duration-300">
                    <strong>Availability</strong>: Making sure systems work when you need them.
                  </li>
                </ol>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Why It Matters
                </h3>
                <ul className="list-disc ml-6">
                  <li className="mb-2 hover:underline transition duration-300">
                    <strong>Personal Privacy</strong>: You probably don’t want strangers sifting through your selfies or bank details.
                  </li>
                  <li className="mb-2 hover:underline transition duration-300">
                    <strong>Financial Protection</strong>: Hackers love a quick payday.
                  </li>
                  <li className="mb-2 hover:underline transition duration-300">
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
                  <div className="w-full h-64 flex items-center justify-center rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
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

                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Threat Model
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  Threat modeling is about asking: <em>What do attackers want?</em> <em>What can they do?</em> and <em>Is it worth defending?</em> Knowing your enemy means you can choose defenses that make sense for your situation—whether you’re a global enterprise or a freelance artist.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Human Factors
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  This is the big one—“Humans are the weakest link.” Even the best systems fail if we’re clicking away on dubious links or ignoring warnings.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Security is Economics
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  There’s always a cost-benefit balance in security. No system is 100% secure without becoming 0% usable. Think about bike locks: they can all be broken, but the goal is to deter casual theft and make it <em>not worth the effort</em>.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Detect If You Can’t Prevent
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  You can’t stop every attack, but if you detect weird activity early, you can respond before it’s too late. Think of this like a home alarm system—you may not stop the break-in, but you’ll know it happened.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Defense in Depth
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  Layer multiple defenses, so if one fails, others can still stand. It’s the onion approach: many layers, sometimes tears.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Least Privilege
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  Only grant the minimal access needed. If an account is compromised but has limited privileges, damage remains minimal.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Separation of Responsibility
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  No single person or system should have unlimited power. Requiring multiple parties to collaborate makes fraud or sabotage much harder.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Complete Mediation
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  Validate <strong>every</strong> access request rather than assuming trust after the first time. It’s like checking IDs at the door every day, not just once.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Shannon’s Maxim (Kerckhoffs’ Principle)
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  Assume attackers know how your system works. Security through obscurity (like hiding a house key under the mat) isn’t true security.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Fail-Safe Defaults
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  If something breaks, fail <em>securely</em> rather than leaving everything open.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Security from the Start
                </h3>
                <p className="hover:underline transition duration-300">
                  Building security in from the beginning is easier and cheaper than trying to retrofit it later—like adding locks during home construction instead of after you’ve moved in.
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="human-factors" aria-labelledby="human-factors-heading" className="mb-10">
                <h2 id="human-factors-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Human Factors as One of the Key Security Principles
                </h2>
                
                <div className="mb-6">
                  <div className="w-full h-64 flex items-center justify-center rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
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

                <p className="mb-4 hover:underline transition duration-300">
                  Even with top-notch firewalls, human behavior can undermine it all in a single click. Sir Eli’s takeaway? People are lazy, gullible, or simply unaware. All it takes is one “free iPhone giveaway” email to wreak havoc.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Why Humans Are the Weakest Link
                </h3>
                <ul className="list-disc ml-6 mb-4">
                  <li className="mb-2 hover:underline transition duration-300">
                    <strong>Laziness:</strong> We prefer easy, memorable passwords or skip reading warnings.
                  </li>
                  <li className="mb-2 hover:underline transition duration-300">
                    <strong>Curiosity/Gullibility:</strong> Phishing emails exploit our desire for freebies or “urgent” info.
                  </li>
                  <li className="mb-2 hover:underline transition duration-300">
                    <strong>Overconfidence:</strong> “I’ll never get hacked” is often famous last words.
                  </li>
                </ul>
                <p className="hover:underline transition duration-300">
                  On the bright side, once we recognize our vulnerabilities, we can take steps to become the strongest defense—through training, careful habits, and a dash of healthy paranoia.
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="real-world-breaches" aria-labelledby="real-world-breaches-heading" className="mb-10">
                <h2 id="real-world-breaches-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Real-World Security Breaches Due to Human Factors
                </h2>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  The Equifax Data Breach
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  In 2017, Equifax exposed sensitive data of over 147 million people. The root cause? A missed software patch. Translation: someone snoozed on an urgent update, leading to a meltdown.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Strathmore College Data Breach
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  A story of <em>phishing success</em>—faculty and staff clicked on questionable links, entering login details on a fake website. Chaos ensued. Weak password policies and poor oversight made it worse.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Marine Corps Data Breach
                </h3>
                <p className="hover:underline transition duration-300">
                  Sensitive info was leaked due to misconfigurations or accidental exposure. Even highly disciplined organizations can be undone by a single oversight, showing <em>no one is immune</em> to human error.
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="common-mistakes" aria-labelledby="common-mistakes-heading" className="mb-10">
                <h2 id="common-mistakes-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Common Human-Related Security Mistakes
                </h2>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Weak Passwords
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  “123456” and “password” still top the charts. A brute-force attack can crack these in seconds. Time to upgrade!
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Reusing Passwords
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  If one site gets hacked, attackers test that username-password combo everywhere. Reuse = big no-no.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Falling for Phishing Scams
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  Emails pretending to be your bank or boss can trick you into handing over credentials. Always verify—scammers bank on your trust.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Ignoring Software Updates
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  “Remind me later” is the siren song of procrastination. These updates often patch major vulnerabilities, so skipping them leaves your system wide open.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Trusting Public Wi-Fi
                </h3>
                <p className="hover:underline transition duration-300">
                  Free coffee shop Wi-Fi might be a hacker’s paradise. Avoid logging into sensitive accounts on unsecured networks, or use a VPN.
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="best-practices" aria-labelledby="best-practices-heading" className="mb-10">
                <h2 id="best-practices-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Best Practices for Enhancing Human-Centric Security
                </h2>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Use Multi-Factor Authentication (MFA)
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  Password plus something else (like a code texted to you or a fingerprint). Even if someone steals your password, they still need that second factor.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Don’t Be Lazy with Your Passwords!
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  Use passphrases (e.g., “CorrectHorseBatteryStaple”), and consider a password manager. And never reuse passwords—ever.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Keep Software Up-to-Date
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  Stop clicking “remind me later.” Updates patch holes hackers love to exploit. Automatic updates are your friend.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Avoid Opening Suspicious Emails
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  Check the sender’s address, watch for grammar errors, and if something is “too good to be true,” it’s probably a trap.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Use Secure Networks
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  Steer clear of public Wi-Fi for sensitive transactions. If you must, a VPN is your digital invisibility cloak.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Back Up Your Data
                </h3>
                <p className="mb-4 hover:underline transition duration-300">
                  Whether it’s ransomware or a spilled drink on your laptop, periodic backups can save your day.
                </p>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                  Stay Informed &amp; Train Regularly
                </h3>
                <p className="hover:underline transition duration-300">
                  Cyber threats evolve; staying updated on phishing techniques or new scams keeps you one step ahead. Conduct quick security refresher training or “phish drills” in your organization.
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="conclusion" aria-labelledby="conclusion-heading">
                <h2 id="conclusion-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Conclusion
                </h2>
                <p className="mb-4 hover:underline transition duration-300">
                  We’ve explored just how crucial the human element is in computer security. Even the strongest locks can’t stop someone who opens the door voluntarily! By combining robust technology with sensible, vigilant habits, we can turn the so-called weakest link into a formidable line of defense.
                </p>
                <p className="mb-4 hover:underline transition duration-300">
                  So the next time you’re tempted to reuse “password123,” or click that shady “Claim Your Free iPhone!” link, remember: a moment of caution can save you from a world of trouble. Stay smart, stay safe, and may the <em>firewall</em> be ever in your favor!
                </p>
                <p className="mb-4 hover:underline transition duration-300">
                  <strong>Call to Action:</strong>
                </p>
                <ul className="list-disc ml-6">
                  <li className="mb-2 hover:underline transition duration-300">
                    Enable MFA on key accounts immediately.
                  </li>
                  <li className="mb-2 hover:underline transition duration-300">
                    Share this article with a friend who’s dangerously close to “123456.”
                  </li>
                  <li className="mb-2 hover:underline transition duration-300">
                    Keep learning—cybersecurity is a moving target, and staying informed is your best shield.
                  </li>
                </ul>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="about-authors" aria-labelledby="about-authors-heading" className="mt-12 mb-4">
                <h2 id="about-authors-heading" className="text-2xl font-semibold mb-8 text-center hover:text-blue-500 transition-colors duration-300">
                  Meet the Authors
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center">
                    <ZoomableImage
                      src="/images/carl.jpg"
                      alt="Carl Asoy"
                      className="w-24 h-24 rounded-full mb-2"
                    />
                    <p className="text-center text-lg font-medium hover:underline transition duration-300">
                      Asoy, Carl
                    </p>
                    <p className="text-center text-sm text-gray-500 mt-2 hover:text-blue-500 transition-colors duration-300">
                      Cybersecurity researcher passionate about network defense.
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <ZoomableImage
                      src="/images/jade.jpg"
                      alt="Jade Cataques"
                      className="w-24 h-24 rounded-full mb-2"
                    />
                    <p className="text-center text-lg font-medium hover:underline transition duration-300">
                      Cataques, Jade
                    </p>
                    <p className="text-center text-sm text-gray-500 mt-2 hover:text-blue-500 transition-colors duration-300">
                      Innovator in cybersecurity solutions and data protection.
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <ZoomableImage
                      src="/images/daniel.jpg"
                      alt="Daniel Cruz"
                      className="w-24 h-24 rounded-full mb-2"
                    />
                    <p className="text-center text-lg font-medium hover:underline transition duration-300">
                      Cruz, Daniel
                    </p>
                    <p className="text-center text-sm text-gray-500 mt-2 hover:text-blue-500 transition-colors duration-300">
                      Just a chill guy.
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <ZoomableImage
                      src="/images/liam.jpg"
                      alt="Liam Gillamac"
                      className="w-24 h-24 rounded-full mb-2"
                    />
                    <p className="text-center text-lg font-medium hover:underline transition duration-300">
                      Gillamac, Liam
                    </p>
                    <p className="text-center text-sm text-gray-500 mt-2 hover:text-blue-500 transition-colors duration-300">
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

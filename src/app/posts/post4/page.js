"use client";

import Navbar from "../../components/Navbar";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, memo } from "react";

import "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-c";
import "prismjs/components/prism-bash";
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

export default function MP3() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    const sectionIds = [
      "introduction",
      "sql-injection",
      "csrf-protection",
      "xss-protection",
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
        <title>Machine Problem 3: Fixing Web App Vulnerabilities</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="A writeup for Machine Problem 3"
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
                        href="#sql-injection"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection("sql-injection");
                        }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${
                          activeSection === "sql-injection"
                            ? "text-blue-600 font-bold"
                            : ""
                        }`}
                      >
                        SQL Injection
                      </a>
                    </li>
                    <li>
                      <a
                        href="#csrf-protection"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection("csrf-protection");
                        }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${
                          activeSection === "csrf-protection"
                            ? "text-blue-600 font-bold"
                            : ""
                        }`}
                      >
                        CSRF Protection
                      </a>
                    </li>
                    <li>
                      <a
                        href="#xss-protection"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection("xss-protection");
                        }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${
                          activeSection === "xss-protection"
                            ? "text-blue-600 font-bold"
                            : ""
                        }`}
                      >
                        Cross-Site Scripting (XSS)
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
                Machine Problem 3: Fixing Web App Vulnerabilities
              </h1>

              <div className="text-justify mb-8">
                <p className="text-sm text-gray-500">April 27, 2025</p>
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
                  It was a cloudy Saturday afternoon when Eli Tan decided
                  to finally sit down and tackle Machine Problem 3. He had
                  spent the last few weeks hearing whispers about it from his
                  classmates—whispers of SQL injections, CSRF vulnerabilities,
                  and XSS nightmares.
                </p>
                <p className="mb-4">
                  Eli Tan, undeterred, brewed a strong cup of coffee, opened
                  his laptop, and pulled up the provided zip file. A simple
                  Flask web application stood before him: login, logout, and
                  posting features—all seemingly harmless. But deep down, he
                  knew that lurking beneath the surface were fatal security
                  flaws waiting to be uncovered.
                </p>
                <p className="mb-4">
                  Rolling up his sleeves, Eli Tan cracked his knuckles and
                  muttered to himself, <q><em>Let's hunt some vulnerabilities.</em></q>
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section
                id="sql-injection"
                aria-labelledby="sql-injection-heading"
                className="mb-10"
              >
                <h2
                  id="sql-injection-heading"
                  className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300"
                >
                  SQL Injection
                </h2>
                <p className="mb-4">
                  Upon examining the <code>app.py</code>, Eli Tan immediately
                  noticed the red flags—user inputs were being directly embedded
                  into SQL queries without any sanitization.
                  In the <code>/login</code> route, the username and password
                  fields were concatenated into a raw query:
                </p>
                <pre>
                  <code className="language-sql">
                    {`res = cur.execute("SELECT id from users WHERE username = '"
+ request.form["username"] + "' AND password = '"
+ request.form["password"] + "'")`}
                  </code>
                </pre>

                <h3 className="text-2xl font-semibold mt-6 mb-4">A. Login Bypass Test</h3>
                <p className="mb-4">
                  Eli Tan started the server and fired up an incognito browser window.
                  On the <code>/login</code> page, he entered:
                </p>
                <pre>
                  <code className="language-text">
                    {`Username: ' OR '1'='1
Password: (any random password)`}
                  </code>
                </pre>
                <p className="mt-4">
                  He hit "Login" and, as expected, <strong>gained access without valid credentials</strong>. Classic SQL Injection.
                </p>
                <p className="mb-4"><strong>Before Fix:</strong> Vulnerable to login bypass.</p>

                <h3 className="text-2xl font-semibold mt-6 mb-4">B. Malicious Payload in /posts</h3>
                <p className="mb-4">
                  After logging in normally, Eli Tan posted the message:
                </p>
                <pre>
                  <code className="language-text">
                    '; DROP TABLE users; --
                  </code>
                </pre>
                <p className="mt-4">
                  Submitting the form caused the application to crash with an
                  <code>Internal Server Error</code>, a clear indication that
                  the malicious SQL payload had broken the query execution.
                </p>
                <p className="mb-4"><strong>Before Fix:</strong> Vulnerable to SQL corruption and denial-of-service.</p>

                <h3 className="text-2xl font-semibold mt-6 mb-4">C. Fixes Done</h3>
                <p className="mb-4">
                  To patch this vulnerability, Eli Tan <strong>replaced all direct SQL concatenations with parameterized queries</strong> using <code>?</code> placeholders:
                </p>
                <p className="mt-4"><strong>Before:</strong> </p>
                <pre>
                  <code className="language-python">
                    {`cur.execute("SELECT id from users WHERE username = '"
+ username + "' AND password = '" + password + "'")`}
                  </code>
                </pre>
                <p className="mt-4"><strong>After:</strong> </p>
                <pre>
                  <code className="language-python">
                    {`cur.execute("SELECT id FROM users WHERE username = ?
AND password = ?", (username, password))`}
                  </code>
                </pre>
                <p className="mb-4">
                  ✅ Now, the database safely handles user inputs as parameters, neutralizing SQL Injection attempts.
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section
                id="csrf-protection"
                aria-labelledby="csrf-protection-heading"
                className="mb-10"
              >
                <h2
                  id="csrf-protection-heading"
                  className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300"
                >
                  CSRF Protection
                </h2>
                <p className="mb-4">
                  Moving on, Eli Tan noticed that none of the POST forms (<code>/login</code>, <code>/posts</code>) had CSRF protection. Anyone could forge a request from another site!
                </p>
                <p className="mb-4">
                  To confirm, he did a quick <strong>cURL</strong>test:
                </p>
                <pre>
                  <code className="language-bash">
                    {`curl -v -b "session_token=YOUR_TOKEN_HERE" -d "message=hello" http://localhost:5000/posts`}
                  </code>
                </pre>
                <p className="mt-4">
                  Without a CSRF token, the post was successfully created — <strong>definitely a problem.</strong>
                </p>

                <h3 className="text-2xl font-semibold mt-6 mb-4">A. Fixes Done</h3>
                <p className="mb-4">
                  Eli Tan implemented a basic CSRF protection mechanism manually:
                </p>
                <pre>
                  <code className="language-python">
                    {`# Session-based CSRF Token:
app.secret_key = secrets.token_hex(16)

@app.before_request
def ensure_csrf_token():
    if 'csrf_token' not in session:
        session['csrf_token'] = secrets.token_hex(16)

# Adding CSRF token to Forms:
<input type="hidden" name="csrf_token" value="{{ session['csrf_token'] }}">

# Validating CSRF token on POST requests:
if request.form.get("csrf_token") != session.get("csrf_token"):
    abort(400)`}
                  </code>
                </pre>
                <p className="mt-4">
                  ✅ With this, any forged request missing a valid CSRF token would get a 400 Bad Request.
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section
                id="xss-protection"
                aria-labelledby="xss-protection-heading"
                className="mb-10"
              >
                <h2
                  id="xss-protection-heading"
                  className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300"
                >
                  Cross-Site Scripting (XSS)
                </h2>
                <p className="mb-4">
                  Finally, Eli Tan turned his attention to the HTML templates. In <code>home.html</code>, he found this disturbing line:
                </p>
                <pre>
                  <code className="language-html">
                    {`<li>{{ post[0] | safe }}</li>`}
                  </code>
                </pre>
                <p className="mt-4">
                  The <code>| safe</code> filter disabled Jinja2's automatic escaping, allowing raw HTML (and JavaScript) to be executed. To confirm, he posted:
                </p>
                <pre>
                  <code className="language-html">
                    {`<script>alert("XSS!")</script>`}
                  </code>
                </pre>
                <p className="mt-4">
                  And sure enough — <strong>a popup appeared</strong>.
                </p>

                <h3 className="text-2xl font-semibold mt-6 mb-4">A. Fixes Done</h3>
                <p className="mb-4">
                  Eli Tan <strong>removed the <code>| safe</code> filter:</strong>
                </p>
                <p className="mt-4"><strong>Before:</strong> </p>
                <pre>
                  <code className="language-html">
                    {`<li>{{ post[0] | safe }}</li>`}
                  </code>
                </pre>
                <p className="mt-4"><strong>After:</strong> </p>
                <pre>
                  <code className="language-html">
                    {`<li>{{ post[0] }}</li>`}
                  </code>
                </pre>
                <p className="mt-4">
                  ✅ Now, user input would be escaped automatically by Jinja2, and <code>&lt;script&gt;</code> tags would be rendered harmlessly as text.
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
                  After hours of debugging and patching, Eli Tan leaned back in his chair,
                  proud of what he had accomplished. He had slain the three-headed beast
                  of <strong>SQL Injection</strong>, <strong>CSRF</strong>, and
                  <strong>XSS vulnerabilities</strong>. The once vulnerable web
                  application was now fortified, ready to stand strong against common attacks.
                </p>
                <p className="mb-4">
                  The sun was starting to rise, and with a contented sigh,
                  Eli Tan whispered, <q><em>Another demon defeated.</em></q>
                </p>
                <p className="mb-4">
                  He closed his laptop and drifted off to sleep, knowing that he had grown
                  stronger—both as a developer and a security warrior.
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

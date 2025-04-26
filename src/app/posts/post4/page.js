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

export default function MP2() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    const sectionIds = [
      "introduction",
      "key-generation",
      "encryption-and-signing",
      "verification-and-decryption",
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
        <title>Machine Problem 2: RSA Encrypt-then-Sign</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="A writeup demonstrating RSA-OAEP encryption and RSA-PSS signing (encrypt-then-sign) for short messages."
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
                        href="#key-generation"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection("key-generation");
                        }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${
                          activeSection === "key-generation"
                            ? "text-blue-600 font-bold"
                            : ""
                        }`}
                      >
                        Key Generation
                      </a>
                    </li>
                    <li>
                      <a
                        href="#encryption-and-signing"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection("encryption-and-signing");
                        }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${
                          activeSection === "encryption-and-signing"
                            ? "text-blue-600 font-bold"
                            : ""
                        }`}
                      >
                        Encryption &amp; Signing
                      </a>
                    </li>
                    <li>
                      <a
                        href="#verification-and-decryption"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection("verification-and-decryption");
                        }}
                        className={`transition-colors duration-200 hover:text-blue-600 ${
                          activeSection === "verification-and-decryption"
                            ? "text-blue-600 font-bold"
                            : ""
                        }`}
                      >
                        Verification &amp; Decryption
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
                Machine Problem 2: RSA Encrypt-then-Sign
              </h1>

              <div className="text-justify mb-8">
                <p className="text-sm text-gray-500">March 17, 2025</p>
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
                  Fresh off his triumph in taming an unruly buffer overflow, Eli
                  Tan now finds himself at the threshold of a new challenge—one
                  where he must secure messages using public-key cryptography.
                  Although he often grumbled that these assignments were just
                  routine exercises imposed by the curriculum, deep down he knew
                  that mastering these techniques was vital.
                </p>
                <p className="mb-4">
                  His task is to transform a short, 140-character message into
                  an impenetrable cipher by leveraging RSA-OAEP for encryption
                  and RSA-PSS for digital signatures. This approach not only
                  guarantees confidentiality but also ensures that each message
                  is verifiably authentic.
                </p>
                <p className="mb-4">
                  To accomplish this, Eli Tan generates two distinct RSA key
                  pairs—one dedicated to encryption and the other to signing. By
                  reading the message from a file, encrypting it, and then
                  signing the resulting ciphertext, he constructs an elegant
                  encrypt-then-sign system that marries security with integrity.
                </p>
                <p className="mb-4">
                  While he might secretly wish he could break free from these
                  rigid requirements and innovate on the fly, he recognizes that
                  these structured steps sharpen his technical acumen and
                  prepare him for the complex challenges of real-world
                  cybersecurity.
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section
                id="key-generation"
                aria-labelledby="key-generation-heading"
                className="mb-10"
              >
                <h2
                  id="key-generation-heading"
                  className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300"
                >
                  Key Generation
                </h2>
                <p className="mb-4">
                  To begin securing his messages, Eli Tan first generates two
                  distinct RSA key pairs—one for encryption using RSA-OAEP and
                  another for signing using RSA-PSS. This separation is crucial
                  as it ensures that the processes of encryption and
                  authentication remain isolated, bolstering overall security.
                </p>
                <p className="mb-4">
                  He leverages Python’s{" "}
                  <code className="language-python">cryptography</code> library
                  to handle the heavy lifting. Although generating keys might
                  seem like a rote task, Eli knows that this discipline lays a
                  solid foundation for all subsequent cryptographic operations.
                </p>
                <p className="mb-4">
                  Below is an excerpt from his code that demonstrates how he
                  generates the key pairs:
                </p>
                <pre>
                  <code className="language-python">
                    {`# Generate RSA key pair for encryption (RSA-OAEP)
def generate_encryption_keys():
    encryption_private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
    )
    return encryption_private_key, encryption_private_key.public_key()

# Generate RSA key pair for signing (RSA-PSS)
def generate_signing_keys():
    signing_private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
    )
    return signing_private_key, signing_private_key.public_key()`}
                  </code>
                </pre>
                <p className="mb-4">
                  Once generated, Eli Tan saves each key in PEM format using a
                  helper function. This method not only facilitates easier
                  storage and retrieval but also ensures that the keys are ready
                  for the encryption and signing processes that follow:
                </p>
                <pre>
                  <code className="language-python">
                    {`# Save key (private or public) to a file in PEM format.
def save_key_to_file(key, filename, is_private=False):
    if is_private:
        pem = key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption()
        )
    else:
        pem = key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        )
    with open(filename, "wb") as f:
        f.write(pem)
    print(f"Saved key to {filename}")`}
                  </code>
                </pre>
                <p className="mb-4">
                  The encryption keys are stored as{" "}
                  <code>enc_private_key.pem</code> and{" "}
                  <code>enc_public_key.pem</code>, while the signing keys are
                  saved as <code>sign_private_key.pem</code> and{" "}
                  <code>sign_public_key.pem</code>. Although these steps may
                  appear mundane, Eli appreciates that such rigorous adherence
                  to best practices is indispensable in the realm of
                  cybersecurity.
                </p>
                <p>
                  With the keys securely generated and stored, Eli Tan is now
                  poised to advance to the encryption and signing stages,
                  confident that his cryptographic foundation is rock-solid.
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section
                id="encryption-and-signing"
                aria-labelledby="encryption-and-signing-heading"
                className="mb-10"
              >
                <h2
                  id="encryption-and-signing-heading"
                  className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300"
                >
                  Encryption &amp; Signing
                </h2>
                <p className="mb-4">
                  With the keys securely generated, Eli Tan turns his attention
                  to protecting his message. He begins by reading a short ASCII
                  message (up to 140 characters) from a file. This message is
                  then encrypted using RSA-OAEP, ensuring that only someone with
                  the correct decryption key can access its contents.
                </p>
                <p className="mb-4">
                  Immediately after encryption, he applies a digital signature
                  to the ciphertext using RSA-PSS. This signature guarantees
                  that the encrypted message is authentic and has not been
                  tampered with. In essence, the process—encrypting first and
                  then signing—ensures both confidentiality and integrity.
                </p>
                <p className="mb-4">
                  Below is an excerpt from his Python code that demonstrates how
                  the encryption and signing are performed:
                </p>
                <pre>
                  <code className="language-python">
                    {`def encrypt_then_sign(message, encryption_public_key, signing_private_key):
    # Encrypt the message using RSA-OAEP
    ciphertext = encryption_public_key.encrypt(
        message.encode("ascii"),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    # Sign the ciphertext using RSA-PSS
    signature = signing_private_key.sign(
        ciphertext,
        padding.PSS(
            mgf=padding.MGF1(hashes.SHA256()),
            salt_length=padding.PSS.MAX_LENGTH
        ),
        hashes.SHA256()
    )
    return ciphertext, signature`}
                  </code>
                </pre>
                <p className="mb-4">
                  After generating the ciphertext and signature, Eli Tan
                  Base64-encodes them and saves the result in{" "}
                  <code>ciphertext_and_signature.txt</code>, ensuring that both
                  the encrypted message and its signature are safely recorded.
                </p>
                <p>
                  This method, known as the encrypt-then-sign scheme, solidifies
                  the trust in the communication process by verifying that any
                  alteration to the ciphertext would invalidate the signature.
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section
                id="verification-and-decryption"
                aria-labelledby="verification-and-decryption-heading"
                className="mb-10"
              >
                <h2
                  id="verification-and-decryption-heading"
                  className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300"
                >
                  Verification &amp; Decryption
                </h2>
                <p className="mb-4">
                  With the ciphertext and its accompanying signature safely
                  stored, the next critical phase is to verify and decrypt the
                  message. Eli Tan employs a sequential process: he first
                  validates the digital signature using the signing public key,
                  ensuring that the ciphertext has not been tampered with. Only
                  then does he proceed to decrypt the ciphertext using the
                  private encryption key.
                </p>
                <p className="mb-4">
                  This dual-stage process guarantees both authenticity and
                  confidentiality. If the signature fails to verify, the
                  decryption process is halted immediately, preventing any
                  corrupted or malicious data from being processed.
                </p>
                <p className="mb-4">
                  The Python code below outlines the verification and decryption
                  functions:
                </p>
                <pre>
                  <code className="language-python">
                    {`def verify_then_decrypt(ciphertext, signature, encryption_private_key, signing_public_key):
    try:
        # Verify the signature using RSA-PSS
        signing_public_key.verify(
            signature,
            ciphertext,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )
        # If verification succeeds, decrypt the ciphertext using RSA-OAEP
        decrypted_message = encryption_private_key.decrypt(
            ciphertext,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )
        return decrypted_message.decode("ascii")
    except Exception as e:
        print("Error during verification or decryption:", e)
        return None`}
                  </code>
                </pre>
                <p className="mb-4">
                  After integrating this functionality into his program, Eli Tan
                  ran the script. The terminal output confirmed that the keys
                  were saved, the ciphertext and signature were generated,
                  and—most importantly—the original message was successfully
                  recovered. Here is a sample output from his session:
                </p>
                <pre>
                  <code className="language-bash">
                    {`PS C:\Projects\CMSC134WriteUps\MP2> python rsa_encrypt_decrypt.py
Saved key to enc_private_key.pem
Saved key to enc_public_key.pem
Saved key to sign_private_key.pem
Saved key to sign_public_key.pem
Saved ciphertext and signature to ciphertext_and_signature.txt
Saved decrypted message to decrypted.txt
Decrypted message: We love CMSC 134 and Sir Eli`}
                  </code>
                </pre>
                <p>
                  This output not only validates the correctness of the
                  verification and decryption process but also demonstrates the
                  overall reliability of the encrypt-then-sign scheme. Through
                  this method, Eli Tan ensures that any recipient of the message
                  can be confident in both its integrity and its
                  confidentiality.
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
                  Eli Tan exhaled deeply with a wide grin on his face. At last,
                  he had successfully implemented a robust RSA encrypt-then-sign
                  system that not only secured his short messages with RSA-OAEP
                  encryption but also guaranteed their authenticity through
                  RSA-PSS digital signatures.
                </p>
                <p className="mb-4">
                  Just a few days ago, the thought of juggling separate key
                  pairs, managing file-based inputs and outputs, and ensuring
                  flawless verification had kept him up at night. Although he
                  sometimes felt that these strict guidelines were more about
                  mere compliance than innovation, deep down he knew that this
                  structured approach sharpened his technical acumen and
                  disciplined his methods.
                </p>
                <p className="mb-4">
                  When the terminal output confirmed that the decrypted message
                  read <code>"We love CMSC 134 and Sir Eli"</code>, a surge of
                  triumph swept over him. The seamless integration of
                  encryption, signing, and verification demonstrated that his
                  secure communication system was both reliable and effective.
                </p>
                <p className="mb-4">
                  Glancing at the clock, Eli Tan realized it was nearly 10:30
                  AM—he was already late for his{" "}
                  <code className="language-python">CMSC 134</code> class!
                  Despite his occasional frustrations with rigid assignment
                  requirements, he appreciated that such discipline was
                  essential for tackling real-world cybersecurity challenges.
                </p>
                <p>
                  With a final satisfied nod at his accomplishment, he quickly
                  gathered his things, ready to head out—late for class, yet
                  confident in his mastery of another formidable cybersecurity
                  challenge.
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

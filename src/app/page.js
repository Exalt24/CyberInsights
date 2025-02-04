import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>The Weakest Link or the Strongest Shield? How Humans Shape Cybersecurity (tentative)</title>
        <meta
          name="description"
          content="A writeup on computer security principles, human factors, and real-world breaches."
        />
      </Head>

      <main className="bg-gray-100 dark:bg-gray-900 min-h-screen py-10 px-4">
        <article className="max-w-3xl mx-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center">
            The Weakest Link or the Strongest Shield? How Humans Shape Cybersecurity (tentative)
          </h1>

          {/* INTRODUCTION */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Picture this: It’s a Monday morning, you still haven’t had your coffee, and you’re trying to log into your email—only to discover your password has mysteriously changed overnight. Was it a glitch, or have hackers been plotting in the shadows like movie villains in a neon-lit basement?
            </p>
            <p className="mb-4">
              In reality, many security breaches start with something far less dramatic: simple human error. Welcome to our fun-filled journey into computer security, where we’ll talk about <strong>Sir Eli’s</strong> principles, real-world breaches, and the occasional meme (yes, memes!) to keep things light.
            </p>
            <p className="mb-4">
              Spoiler: even if you have the toughest firewall in the galaxy, it’s all for naught if an unsuspecting user clicks on a shady link. Let’s dive in!
            </p>
          </section>

          {/* WHAT IS COMPUTER SECURITY */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">2. What is Computer Security?</h2>
            <p className="mb-4">
              Ever watch a spy movie where the hero dodges lasers, cracks a code in seconds, and casually waltzes off with top-secret files? That’s basically a blueprint for what we <em>don’t</em> want in the real world—at least when it comes to our own data. <strong>Computer security</strong> is the shield we put up to block unauthorized access to our digital lives.
            </p>
            <h3 className="text-xl font-semibold mb-2">The Basics</h3>
            <p className="mb-4">
              At its core, computer security revolves around three big goals:
            </p>
            <ol className="list-decimal ml-6 mb-4">
              <li className="mb-2">
                <strong>Confidentiality</strong>: Keeping secrets secret.
              </li>
              <li className="mb-2">
                <strong>Integrity</strong>: Ensuring data can’t be tampered with.
              </li>
              <li className="mb-2">
                <strong>Availability</strong>: Making sure systems work when you need them.
              </li>
            </ol>
            <h3 className="text-xl font-semibold mb-2">Why It Matters</h3>
            <ul className="list-disc ml-6">
              <li className="mb-2">
                <strong>Personal Privacy</strong>: You probably don’t want strangers sifting through your selfies or bank details.
              </li>
              <li className="mb-2">
                <strong>Financial Protection</strong>: Hackers love a quick payday.
              </li>
              <li className="mb-2">
                <strong>Business Security</strong>: One data breach could spell disaster and lots of awkward apology emails.
              </li>
            </ul>
          </section>

          {/* OVERVIEW OF SECURITY PRINCIPLES */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">3. Overview of Security Principles</h2>

            <h3 className="text-xl font-semibold mb-2">3.1 Threat Model</h3>
            <p className="mb-4">
              Threat modeling is about asking: <em>What do attackers want?</em> <em>What can they do?</em> and <em>Is it worth defending?</em> Knowing your enemy means you can choose defenses that make sense for your situation—whether you’re a global enterprise or a freelance artist.
            </p>

            <h3 className="text-xl font-semibold mb-2">3.2 Human Factors</h3>
            <p className="mb-4">
              This is the big one—“Humans are the weakest link.” Even the best systems fail if we’re clicking away on dubious links or ignoring warnings.
            </p>

            <h3 className="text-xl font-semibold mb-2">3.3 Security is Economics</h3>
            <p className="mb-4">
              There’s always a cost-benefit balance in security. No system is 100% secure without becoming 0% usable. Think about bike locks: they can all be broken, but the goal is to deter casual theft and make it <em>not worth the effort</em>.
            </p>

            <h3 className="text-xl font-semibold mb-2">3.4 Detect If You Can’t Prevent</h3>
            <p className="mb-4">
              You can’t stop every attack, but if you detect weird activity early, you can respond before it’s too late. Think of this like a home alarm system—you may not stop the break-in, but you’ll know it happened.
            </p>

            <h3 className="text-xl font-semibold mb-2">3.5 Defense in Depth</h3>
            <p className="mb-4">
              Layer multiple defenses, so if one fails, others can still stand. It’s the onion approach: many layers, sometimes tears.
            </p>

            <h3 className="text-xl font-semibold mb-2">3.6 Least Privilege</h3>
            <p className="mb-4">
              Only grant the minimal access needed. If an account is compromised but has limited privileges, damage remains minimal.
            </p>

            <h3 className="text-xl font-semibold mb-2">3.7 Separation of Responsibility</h3>
            <p className="mb-4">
              No single person or system should have unlimited power. Requiring multiple parties to collaborate makes fraud or sabotage much harder.
            </p>

            <h3 className="text-xl font-semibold mb-2">3.8 Complete Mediation</h3>
            <p className="mb-4">
              Validate <strong>every</strong> access request rather than assuming trust after the first time. It’s like checking IDs at the door every day, not just once.
            </p>

            <h3 className="text-xl font-semibold mb-2">3.9 Shannon’s Maxim (Kerckhoffs’ Principle)</h3>
            <p className="mb-4">
              Assume attackers know how your system works. Security through obscurity (like hiding a house key under the mat) isn’t true security.
            </p>

            <h3 className="text-xl font-semibold mb-2">3.10 Fail-Safe Defaults</h3>
            <p className="mb-4">
              If something breaks, fail <em>securely</em> rather than leaving everything open.
            </p>

            <h3 className="text-xl font-semibold mb-2">3.11 Security from the Start</h3>
            <p>
              Building security in from the beginning is easier and cheaper than trying to retrofit it later—like adding locks during home construction instead of after you’ve moved in.
            </p>
          </section>

          {/* HUMAN FACTORS AS KEY SECURITY PRINCIPLE */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">4. Human Factors as One of the Key Security Principles</h2>
            <p className="mb-4">
              Even with top-notch firewalls, human behavior can undermine it all in a single click. Sir Eli’s takeaway? People are lazy, gullible, or simply unaware. All it takes is one “free iPhone giveaway” email to wreak havoc.
            </p>
            <h3 className="text-xl font-semibold mb-2">Why Humans Are the Weakest Link</h3>
            <ul className="list-disc ml-6 mb-4">
              <li className="mb-2">
                <strong>Laziness:</strong> We prefer easy, memorable passwords or skip reading warnings.
              </li>
              <li className="mb-2">
                <strong>Curiosity/Gullibility:</strong> Phishing emails exploit our desire for freebies or “urgent” info.
              </li>
              <li className="mb-2">
                <strong>Overconfidence:</strong> “I’ll never get hacked” is often famous last words.
              </li>
            </ul>
            <p>
              On the bright side, once we recognize our vulnerabilities, we can take steps to become the strongest defense—through training, careful habits, and a dash of healthy paranoia.
            </p>
          </section>

          {/* REAL WORLD SECURITY BREACHES */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">5. Real-World Security Breaches Due to Human Factors</h2>

            <h3 className="text-xl font-semibold mb-2">5.1 The Equifax Data Breach</h3>
            <p className="mb-4">
              In 2017, Equifax exposed sensitive data of over 147 million people. The root cause? A missed software patch. Translation: someone snoozed on an urgent update, leading to a meltdown.
            </p>

            <h3 className="text-xl font-semibold mb-2">5.2 Strathmore College Data Breach</h3>
            <p className="mb-4">
              A story of <em>phishing success</em>—faculty and staff clicked on questionable links, entering login details on a fake website. Chaos ensued. Weak password policies and poor oversight made it worse.
            </p>

            <h3 className="text-xl font-semibold mb-2">5.3 Marine Corps Data Breach</h3>
            <p>
              Sensitive info was leaked due to misconfigurations or accidental exposure. Even highly disciplined organizations can be undone by a single oversight, showing <em>no one is immune</em> to human error.
            </p>
          </section>

          {/* COMMON HUMAN-RELATED SECURITY MISTAKES */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">6. Common Human-Related Security Mistakes</h2>

            <h3 className="text-xl font-semibold mb-2">6.1 Weak Passwords</h3>
            <p className="mb-4">
              “123456” and “password” still top the charts. A brute-force attack can crack these in seconds. Time to upgrade!
            </p>

            <h3 className="text-xl font-semibold mb-2">6.2 Reusing Passwords</h3>
            <p className="mb-4">
              If one site gets hacked, attackers test that username-password combo everywhere. Reuse = big no-no.
            </p>

            <h3 className="text-xl font-semibold mb-2">6.3 Falling for Phishing Scams</h3>
            <p className="mb-4">
              Emails pretending to be your bank or boss can trick you into handing over credentials. Always verify—scammers bank on your trust.
            </p>

            <h3 className="text-xl font-semibold mb-2">6.4 Ignoring Software Updates</h3>
            <p className="mb-4">
              “Remind me later” is the siren song of procrastination. These updates often patch major vulnerabilities, so skipping them leaves your system wide open.
            </p>

            <h3 className="text-xl font-semibold mb-2">6.5 Trusting Public Wi-Fi</h3>
            <p>
              Free coffee shop Wi-Fi might be a hacker’s paradise. Avoid logging into sensitive accounts on unsecured networks, or use a VPN.
            </p>
          </section>

          {/* BEST PRACTICES */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">7. Best Practices for Enhancing Human-Centric Security</h2>

            <h3 className="text-xl font-semibold mb-2">7.1 Use Multi-Factor Authentication (MFA)</h3>
            <p className="mb-4">
              Password plus something else (like a code texted to you or a fingerprint). Even if someone steals your password, they still need that second factor.
            </p>

            <h3 className="text-xl font-semibold mb-2">7.2 Don’t Be Lazy with Your Passwords!</h3>
            <p className="mb-4">
              Use passphrases (e.g., “CorrectHorseBatteryStaple”), and consider a password manager. And never reuse passwords—ever.
            </p>

            <h3 className="text-xl font-semibold mb-2">7.3 Keep Software Up-to-Date</h3>
            <p className="mb-4">
              Stop clicking “remind me later.” Updates patch holes hackers love to exploit. Automatic updates are your friend.
            </p>

            <h3 className="text-xl font-semibold mb-2">7.4 Avoid Opening Suspicious Emails</h3>
            <p className="mb-4">
              Check the sender’s address, watch for grammar errors, and if something is “too good to be true,” it’s probably a trap.
            </p>

            <h3 className="text-xl font-semibold mb-2">7.5 Use Secure Networks</h3>
            <p className="mb-4">
              Steer clear of public Wi-Fi for sensitive transactions. If you must, a VPN is your digital invisibility cloak.
            </p>

            <h3 className="text-xl font-semibold mb-2">7.6 Back Up Your Data</h3>
            <p className="mb-4">
              Whether it’s ransomware or a spilled drink on your laptop, periodic backups can save your day.
            </p>

            <h3 className="text-xl font-semibold mb-2">7.7 Stay Informed & Train Regularly</h3>
            <p>
              Cyber threats evolve; staying updated on phishing techniques or new scams keeps you one step ahead. Conduct quick security refresher training or “phish drills” in your organization.
            </p>
          </section>

          {/* CONCLUSION */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Conclusion</h2>
            <p className="mb-4">
              We’ve explored just how crucial the human element is in computer security. Even the strongest locks can’t stop someone who opens the door voluntarily! By combining robust technology with sensible, vigilant habits, we can turn the so-called weakest link into a formidable line of defense.
            </p>
            <p className="mb-4">
              So the next time you’re tempted to reuse “password123,” or click that shady “Claim Your Free iPhone!” link, remember: a moment of caution can save you from a world of trouble. Stay smart, stay safe, and may the <em>firewall</em> be ever in your favor!
            </p>
            <p className="mb-4">
              <strong>Call to Action:</strong>
            </p>
            <ul className="list-disc ml-6">
              <li className="mb-2">Enable MFA on key accounts immediately.</li>
              <li className="mb-2">Share this article with a friend who’s dangerously close to “123456.”</li>
              <li className="mb-2">Keep learning—cybersecurity is a moving target, and staying informed is your best shield.</li>
            </ul>
          </section>
        </article>
      </main>
    </>
  );
}

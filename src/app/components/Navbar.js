import Image from 'next/image';
import Link from 'next/link';

export default function Navbar({ isDarkMode }) {
  return (
    <nav className={`flex justify-between items-center py-8 px-8 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"}`}>
        <Link href="/" className="text-3xl font-bold">CyberInsights </Link>
        <Link href="/">
            <Image
              src="/logo.svg"
              alt="CyberInsights Logo"
              width={50}
              height={50}
            />
        </Link>
    </nav>
  );
}
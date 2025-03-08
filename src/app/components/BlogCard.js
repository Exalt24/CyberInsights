import Link from "next/link";
import Image from "next/image";

export default function BlogCard({
  href,
  isFeatured = false,
  imageSrc,
  altText,
  date,
  title,
  description,
  isDarkMode,
}) {
  return (
    <Link href={href}>
      <div
        className={`shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer flex flex-col h-full ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="relative">
          <Image
            src={imageSrc}
            alt={altText}
            width={400}
            height={250}
            className="w-full h-60 object-cover"
          />
          {isFeatured && (
            <span className="absolute top-2 left-2 bg-yellow-500 text-white px-3 py-1 text-xs font-bold rounded">
              FEATURED
            </span>
          )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <span
            className={`text-xs font-semibold ${
              isDarkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            {date}
          </span>
          <h3
            className={`text-lg font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {title}
          </h3>
          <p
            className={`mt-2 text-sm flex-grow ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {description}
          </p>
          <span className="mt-4 inline-block text-green-600 font-bold hover:underline">
            Read full article &gt;&gt;
          </span>
        </div>
      </div>
    </Link>
  );
}

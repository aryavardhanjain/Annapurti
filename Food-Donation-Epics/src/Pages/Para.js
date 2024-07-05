import React from "react";

function Para({ children, readMoreUrl, imageUrl, imageAlt }) {
  return (
    <div className="bg-yellow-100 flex m-5 mt-11 shadow-lg rounded-lg overflow-hidden">
      <img
        className="h-48 w-48 object-cover border-4 border-white rounded-lg m-3"
        src={imageUrl}
        alt={imageAlt}
      />
      <div className="flex flex-col justify-center m-3 p-6">
        <p className="text-justify text-gray-700 font-mono leading-relaxed">
          {children}
        </p>
        <a
          href={readMoreUrl}
          target="_blank"
          rel="noopener noreferrer" // This is added for safety with target="_blank"
          className="mt-4 text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          Read More
        </a>
      </div>
    </div>
  );
}

export default Para;

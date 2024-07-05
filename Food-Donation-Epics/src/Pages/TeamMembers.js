import React from "react";

const TeamMembers = ({ name, title, imageUrl, socialLinks }) => {
  return (
    <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
      <div className="flex flex-col">
        <a href="#" className="mx-auto">
          <img
            className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
            src={imageUrl}
            alt={name}
          />
        </a>
        <div className="text-center mt-6">
          <h1 className="text-gray-900 text-xl font-bold mb-1">{name}</h1>
          <div className="text-gray-700 font-light mb-2">{title}</div>
          <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="flex rounded-full hover:bg-indigo-50 h-10 w-10"
              >
                <i
                  className={`mdi ${link.icon} text-indigo-700 mx-auto mt-2`}
                ></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;

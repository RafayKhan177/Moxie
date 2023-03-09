import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="text-xl text-gray-500 mt-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="mt-8 px-4 py-2 bg-color_green hover:bg-color_teal text-white rounded-md font-medium"
      >
        Go to Home
      </a>
    </div>
  );
};

export default NotFound;

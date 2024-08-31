import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-6 mt-12 rounded-t-md">
      <div className="container mx-auto flex flex-col items-center">
        <h5 className="text-lg font-semibold">Recipe Sharing</h5>
        <p className="text-sm mt-2">© 2024 Hot Cook. All rights reserved.</p>
        <div className="flex mt-4 space-x-6">
          <a
            href="https://twitter.com"
            className="hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://facebook.com"
            className="hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            className="hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

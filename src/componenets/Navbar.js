import React from "react";

export default function Navbar() {
  return (
    <div className="w-full bg-white    flex items-center justify-between">
      <h1 className="text-3xl font-semibold">LOGO</h1>
      <div>
        <ul className="flex gap-16 pl-2 nav-link">
          <li>Home</li>
          <li>Blog</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
}

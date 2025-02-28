import React from "react";

const HeroSection = () => {
  return (
    <div className="video-container">
      <video autoPlay loop muted playsInline className="video-bg">
        <source
          src="https://rocketexpansion.com/wp-content/uploads/2022/10/Background-Video-2.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="overlay">
        <div className="w-full bg-[#045754] p-4  flex items-center justify-between">
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

        <div className=" h-full flex flex-col justify-center items-center text-white text-center bg-opacity-50 px-96">
          <div className="class">
            <h1 className="text-5xl font-bold mb-4 text-heading-1">
              Discover Your Next Great Read
            </h1>
            <h2 className="text-2xl mb-8">
              Explore a World of Stories, Knowledge, and Imagination
            </h2>
            <button className="bg-blue-600 text-button-1 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
              Browse Our Collection
            </button>
            <p className="mt-6 max-w-2xl text-lg text-para">
              Whether you're looking for the latest bestsellers, timeless
              classics, or hidden gems, our curated collection has something for
              every reader. Dive into a world of endless possibilities and find
              the perfect book for your next adventure.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .text-button-1 {
          background: #045754;
          padding: 12px;
          margin-bottom: 15px;
        }
        .text-para {
          font-size: 18px;
        }
        .video-container {
          position: relative;
          width: 100%;
          height: 100vh;
          background: pink;
          overflow: hidden;
        }

        .video-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          color: white;
          height: 100%;
          z-index: 2;
        }

        .nav-link {
          gap: 30px;
          cursor: pointer;
          padding: 14px;
          font-size: 22px;
        }
        .class {
          width: 700px;
        }
        .text-heading-1 {
          font-size: 42px;
          font-weight: 800;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;

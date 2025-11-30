import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Block() {

  let navigate = useNavigate();

  return (
    <section
      className="
        w-full 
        bg-linear-to-b from-blue-600 to-blue-800
        flex items-center justify-center
        text-center
        pt-28 sm:pt-32 md:pt-36 lg:pt-40
        pb-16
      "
    >
      <div className="w-full max-w-[1100px] px-4 sm:px-6 lg:px-10 flex flex-col items-center gap-6">

        {/* Title */}
        <h1
          className="
            text-white font-bold
            xsz:text-2xl
            sm:text-3xl
            md:text-4xl
            lg:text-5xl
            2xl:text-6xl
          "
        >
          Advanced Crime Record Management System
        </h1>

        {/* Subtitle */}
        <p
          className="
            text-white/85
            max-w-[820px]
            leading-relaxed
            xsz:text-sm
            sm:text-base
            md:text-lg
            lg:text-xl
          "
        >
          Empower law enforcement with cutting-edge technology for efficient crime tracking,
          analysis, and management. Secure, reliable, and comprehensive.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4">

          {/* Primary */}
          <button
            className="
              bg-white text-blue-700
              font-semibold
              px-8 py-3
              rounded-lg
              hover:bg-blue-50
              transition
              shadow-md
              w-[200px]
            "
            onClick={() => navigate('/records') }
          >
            Access Records
          </button>

          {/* Secondary */}
          <button
            className="
              border border-white
              text-white
              px-8 py-3
              rounded-lg
              hover:bg-white hover:text-blue-700
              transition
              w-[200px]
            "
          >
            Learn More
          </button>

        </div>

      </div>
    </section>
  );
}

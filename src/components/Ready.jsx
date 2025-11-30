import React from "react";

export default function Ready() {
  return (
    <section className="w-full px-4 py-20 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-[#1a3f7a] mb-6">
        Ready to Get Started?
      </h2>

      <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-10">
        Join hundreds of law enforcement agencies using our system to manage crime records more effectively.
      </p>

      <a
        href="#contact"
        className="text-[#1a3f7a] font-medium text-lg hover:underline transition-all duration-200"
      >
        Contact Us Today
      </a>
    </section>
  );
}
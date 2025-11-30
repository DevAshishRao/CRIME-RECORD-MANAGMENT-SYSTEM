import React from "react";
import { Shield } from "lucide-react";

export default function About() {
  return (
    <section className="w-full bg-white flex justify-center">
      <div className="w-full px-6 xsz:px-4 sm:px-6 md:px-10 lg:px-16 py-12">

        {/* Layout */}
        <div className="
          flex flex-col
          lg:flex-row
          items-center
          justify-between
          gap-10
          lg:gap-16
        ">

          {/* Left Text */}
          <div className="flex flex-col gap-4 max-w-[600px] text-center lg:text-left">

            <h2 className="
              text-primary
              font-semibold
              xsz:text-2xl
              sm:text-3xl
              md:text-4xl
            ">
              About Our System
            </h2>

            <p className="
              text-gray-600
              leading-relaxed
              xsz:text-sm
              sm:text-base
              md:text-lg
            ">
              Our Crime Record Management System provides law enforcement
              agencies with a comprehensive platform to store, manage,
              and analyze crime data. With advanced security protocols
              and intuitive interfaces, we help agencies operate more
              efficiently while maintaining the highest standards of
              data protection and accessibility.
            </p>

          </div>

          {/* Right Card */}
          <div className="
            w-full
            max-w-[520px]
            h-[220px]
            sm:h-[260px]
            md:h-[300px]
            lg:h-80
            rounded-2xl
            bg-linear-to-br from-blue-500 to-blue-800
            flex items-center justify-center
            shadow-xl
          ">

            <Shield
              className="
                text-cyan-300/90
                xsz:w-16 xsz:h-16
                sm:w-20 sm:h-20
                md:w-24 md:h-24
                lg:w-28 lg:h-28
              "
              strokeWidth={1.5}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

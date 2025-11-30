import React from "react";
import { BarChart3, Search, LineChart, Shield } from "lucide-react";

const features = [
  {
    title: "Case Management",
    description:
      "Comprehensive case tracking with real-time updates, document management, and timeline visualization.",
    icon: <BarChart3 className="w-12 h-12" />,
  },
  {
    title: "Advanced Search",
    description:
      "Powerful search capabilities with filters, cross-referencing, and intelligent query suggestions.",
    icon: <Search className="w-12 h-12" />,
  },
  {
    title: "Analytics & Reports",
    description:
      "Generate detailed reports with data visualization, trend analysis, and predictive insights.",
    icon: <LineChart className="w-12 h-12" />,
  },
  {
    title: "Secure Storage",
    description:
      "Military-grade encryption, role-based access control, and comprehensive audit trails.",
    icon: <Shield className="w-12 h-12" />,
  },
];

export default function Core() {
  return (
    <section className="w-full px-4 py-16 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-[#1a3f7a]">
          Core Features
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="text-[#2457c5] mb-4">{feature.icon}</div>
              <h3 className="text-xl font-medium mb-3 text-[#1a3f7a]">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
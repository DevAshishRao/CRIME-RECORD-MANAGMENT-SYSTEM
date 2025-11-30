import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#142033] text-gray-300 px-4 py-14">
      <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Records</a></li>
            <li><a href="#" className="hover:underline">Reports</a></li>
            <li><a href="#" className="hover:underline">Analytics</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Case Studies</a></li>
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Documentation</a></li>
            <li><a href="#" className="hover:underline">Training</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
          <p className="text-sm leading-relaxed">123 Law Enforcement Ave, Security City, SC 12345</p>
          <p className="mt-2 text-sm">Phone: (555) 123-4567</p>
          <p className="mt-2 text-sm">Email: info@crms.gov</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-600 mt-10 pt-6 text-center text-sm">
        © 2025 Crime Record Management System. All rights reserved. Secure & Confidential.
      </div>
    </footer>
  );
}
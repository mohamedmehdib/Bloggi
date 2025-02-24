import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className=" font-sans pt-16 pb-10 space-y-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
          <div className="text-left">
            <h3 className="text-xl font-semibold text-black mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="" className="text-gray-600 hover:text-blue-500 transition">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="" className="text-gray-600 hover:text-blue-500 transition">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-left">
            <h3 className="text-xl font-semibold text-black mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Phone: <span className="font-medium">23 456 789</span></li>
              <li>Adresse : Rue Bassatin , Thrayet , Ksibet Sousse , Sousse 4041</li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-300 mt-10" />

        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0 mt-6">
          <span className="text-gray-500">
            © 2025 <span className="font-semibold text-black">Bloggi</span>. All rights reserved.
          </span>
          <span className="text-gray-500">
            Powered by{' '}
            <Link target='_blank' href="https://mohamedmehdi.me/" className="font-medium text-black hover:text-blue-500 transition">
              Mohamed Mehdi
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

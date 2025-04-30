"use client";

import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Logo from '../assets/mainicon.png'

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand & Social */}
        <div className="space-y-4">
          <div className=" w-[100px] p-2 rounded-2xl bg-white">
          <Image src={Logo} alt="logo" width={80} height={80}/>
          </div>
          <p className="text-gray-400">Peer-to-peer tool sharing marketplace.</p>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="w-6 h-6 hover:text-white transition" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <Facebook className="w-6 h-6 hover:text-white transition" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="w-6 h-6 hover:text-white transition" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6 hover:text-white transition" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {['Home', 'Browse Tools', 'My Dashboard', 'FAQs', 'Contact'].map((item) => (
              <li key={item}>
                <Link href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-white transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            <li>
              <Link href="mailto:support@toolxchange.com" className="hover:text-white transition">
                support@toolxchange.com
              </Link>
            </li>
            <li>
              <Link href="tel:+1234567890" className="hover:text-white transition">
                +1 (234) 567-890
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-white transition">
                Contact Form
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Stay Updated</h4>
          <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-gray-800 border-gray-700 placeholder-gray-500 text-gray-100 focus:ring-2 focus:ring-indigo-500"
            />
            <Button variant="secondary" className="w-full sm:w-auto">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ToolXchange. All rights reserved.
      </div>
    </footer>
  );
}

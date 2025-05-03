'use client';

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/shared/Header";

import Image from "next/image";
import contact from "../../../public/assets/contact.png";

export default function ContactPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <Header />

      {/* Left side: Contact Form */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg space-y-6">
            <div className="space-y-1 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
              <p className="text-muted-foreground text-sm">
                We'd love to hear from you. Fill in the form below.
              </p>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
              </div>
              <Input type="email" placeholder="Email Address" />
              <Input placeholder="Subject" />
              <Textarea placeholder="Your Message..." className="min-h-[100px]" />
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={contact}
          alt="Contact Illustration"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

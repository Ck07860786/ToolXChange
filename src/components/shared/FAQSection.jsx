"use client";

import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

// FAQ data
const faqs = [
  {
    question: "What is ToolXchange and how does it work?",
    answer:
      "ToolXchange is a peer-to-peer platform where users can list tools they own and borrow tools from others. You create an account, list your available tools with photos and descriptions, and browse or request tools from other members in your area.",
  },
  {
    question: "How do I list a tool on ToolXchange?",
    answer:
      "After signing in, go to your dashboard and click 'Add New Tool.' Fill in the tool’s name, description, availability dates, rental rate (if any), and upload clear photos. Once you save, your listing will be discoverable by other users.",
  },
  {
    question: "Is there a fee to list or borrow tools?",
    answer:
      "Listing tools is always free. Borrowing tools may incur a rental fee set by the owner—this is clearly displayed on each listing. ToolXchange charges a small service fee (5% of the rental fee) to cover platform costs.",
  },
  {
    question: "How do I request to borrow a tool?",
    answer:
      "On any tool listing, click 'Request to Borrow,' select your desired dates, and send the request. The owner will get a notification and can approve or decline. You’ll receive an email once they respond.",
  },
  {
    question: "What happens if the tool is damaged or not returned?",
    answer:
      "Every transaction is covered by our Security Deposit feature: the borrower authorizes a refundable deposit when they confirm a booking. If the tool is returned in good condition, the deposit is fully refunded. In case of damage or loss, the owner can submit a claim and have the deposit applied toward repairs or replacement.",
  },
  {
    question: "Can I communicate with the owner before borrowing?",
    answer:
      "Yes—each listing has a 'Message Owner' button. You can ask questions, arrange pickup details, or clarify usage instructions before sending a formal borrow request.",
  },
  {
    question: "How do I change my availability or remove a listing?",
    answer:
      "Go to your dashboard > My Tools tab. Find the tool you want to edit, click 'Edit' to update availability or details, or 'Remove' to take it offline. Any pending requests for removed listings will be automatically cancelled.",
  },
  {
    question: "What safety measures does ToolXchange provide?",
    answer:
      "We verify every user’s identity via email and phone, offer in-app messaging (no need to share personal contact info), and provide a security deposit system. Plus, reviews and ratings help you choose trustworthy community members.",
  },
  {
    question: "How do I leave a review after borrowing or lending?",
    answer:
      "After a completed transaction, you’ll see a prompt in your dashboard under 'History' to rate your experience. Leave star ratings and a written review—this helps build trust and reputation for everyone.",
  },
  {
    question: "Who do I contact if I need help?",
    answer:
      "If you encounter any issues, click 'Help' in the footer or email our support team at support@toolxchange.com. We aim to respond within 24 hours.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-16 px-16 w-full">
      <div className="w-full px-0">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-4 w-full">
          {faqs.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg">
              <AccordionTrigger className="px-4 py-3 text-lg font-medium text-gray-800">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

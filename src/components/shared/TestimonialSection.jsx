"use client";
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Aria Patel",
    role: "Startup Founder",
    image: "https://img.freepik.com/premium-photo/smiling-indian-businessman-png-round-badge-transparent-background_53876-953643.jpg?uid=R192994205&ga=GA1.1.293498645.1690197407&semt=ais_hybrid&w=740",
    rating: 5,
    comment:
      "Absolutely love the simplicity and ease of renting tools here. It's transformed my workflow!",
  },
  {
    name: "Liam Wang",
    role: "Photographer",
    image: "https://img.freepik.com/premium-photo/artsy-woman-png-round-badge-transparent-background_53876-952777.jpg?uid=R192994205&ga=GA1.1.293498645.1690197407&semt=ais_hybrid&w=740",
    rating: 4,
    comment:
      "The tools were in perfect condition and the experience was seamless. Highly recommend it!",
  },
  {
    name: "Nora Alvarez",
    role: "Interior Designer",
    image: "https://img.freepik.com/premium-photo/happy-businessman-png-round-badge-transparent-background_53876-952434.jpg?uid=R192994205&ga=GA1.1.293498645.1690197407&semt=ais_hybrid&w=740",
    rating: 5,
    comment:
      "An intuitive platform that just works. Super happy with the service and quality!",
  },
  {
    name: "David Kim",
    role: "Freelance Engineer",
    image: "https://img.freepik.com/premium-photo/png-smiling-man-with-beard-round-badge-transparent-background_53876-953494.jpg?uid=R192994205&ga=GA1.1.293498645.1690197407&semt=ais_hybrid&w=740",
    rating: 5,
    comment:
      "Smooth experience, great prices, and quick responses. Can’t ask for more!",
  },
];

const TestimonialSection = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1.2,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2.5, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3.2, spacing: 32 },
      },
    },
    created(s) {
      setInterval(() => s.next(), 4000); // auto-scroll every 4 seconds
    },
  });

  return (
    <section className="py-20 ">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">What People Are Saying</h2>
      <div ref={sliderRef} className="keen-slider px-6 max-w-7xl mx-auto">
        {testimonials.map((item, i) => (
          <div key={i} className="keen-slider__slide">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 m-2">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-lg">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">"{item.comment}"</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;

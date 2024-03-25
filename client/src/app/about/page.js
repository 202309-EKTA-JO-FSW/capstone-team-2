"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// Mock data for the stats section
const stats = [
  { label: "Years in Business", value: "25" },
  { label: "Original Recipes", value: "65+" },
  { label: "Satisfaction Rate", value: "100%" },
];

// Mock data for the testimonials section
const testimonials = [
  {
    name: "Terry Johnson",
    quote: "The best restaurant experience I've had in a long time!",
    rating: "5 Stars",
  },
];

function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative text-center bg-gray-200">
        <img
          src="/healthyfood.jpg"
          alt="Delicious Dish"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-white text-4xl font-semibold mb-2">
            We provide healthy food for your family.
          </h1>
          <p className="text-white max-w-2xl mx-auto">Eat Smart !</p>
        </div>
      </div>

      {/* Value Propositions Section */}
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-wrap justify-around items-center text-center">
          <div className="w-full sm:w-1/3 lg:w-1/4 p-4">
            <img
              src="/fresh.jpeg"
              alt="Quality Ingredient"
              className="mx-auto mb-3"
            />
            <h2 className="text-xl font-semibold mb-2 text-black">
              Fresh Ingredients
            </h2>
            <p style={{ color: "black" }}>
              Only the freshest ingredients for your meals.
            </p>
          </div>
        </div>
      </div>

      {/* Authenticity Section */}
      <div className="p-10 text-center">
        <h2 className="text-2xl font-semibold mb-2 text-black">
          Feel the authentic & original taste from us
        </h2>
        <img
          src="/authintic.jpeg"
          alt="Restaurant Interior"
          className="mx-auto "
        />
      </div>

      {/* About Stats Section */}
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-wrap justify-center items-center text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="w-full sm:w-1/3 lg:w-1/4 p-4  text-black"
            >
              <h3 className="text-3xl font-semibold  text-black">
                {stat.value}
              </h3>
              <p className=" text-black">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className=" p-10 text-black">
        <div className="container mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center text-lack">
            What Our Customers Say
          </h3>
          <div className="flex flex-wrap justify-center  text-black">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-full md:w-1/2 lg:w-1/3 p-4  text-black"
              >
                <div className="h-full bg-white p-6 shadow-lg">
                  <blockquote className="mb-4  text-black">
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="font-semibold  text-black">
                    {testimonial.name}
                  </p>
                  <p className=" text-black">{testimonial.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=" text-black p-10">
        <div className="container mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center text-black">
            Connect with Our Developers
          </h3>
          <div className="flex flex-wrap justify-center">
            {/* Muna Al Haj Eid */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="h-full bg-white p-6 shadow-lg text-center">
                <img
                  src="/Muna.jpg"
                  alt="Muna Al Haj Eid"
                  className="h-16 w-16 rounded-full mx-auto"
                />
                <div className="mt-2 flex justify-center gap-4">
                  <a
                    href="https://github.com/MonaAlHajEid"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/github.png"
                      alt="GitHub"
                      className="h-8 w-8 rounded-full"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/monabadei/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/linkedin.webp"
                      alt="LinkedIn"
                      className="h-8 w-8 rounded-full"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Hammam */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="h-full bg-white p-6 shadow-lg text-center">
                <img
                  src="/Hammam.jpeg"
                  alt="Hammam Abu Shehadeh"
                  className="h-16 w-16 rounded-full mx-auto"
                />
                <div className="mt-2 flex justify-center gap-4">
                  <a
                    href="https://github.com/HammamAbuShehadeh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/github.png"
                      alt="GitHub"
                      className="h-8 w-8 rounded-full"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/hammam-abu-shehadeh-779525295/26a/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/linkedin.webp"
                      alt="LinkedIn"
                      className="h-8 w-8 rounded-full"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Ahmad */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="h-full bg-white p-6 shadow-lg text-center">
                <img
                  src="/Ahmed.jpg"
                  alt="Ahmed Juma"
                  className="h-16 w-16 rounded-full mx-auto"
                />
                <div className="mt-2 flex justify-center gap-4">
                  <a
                    href="https://github.com/AHMADJUAM"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/github.png"
                      alt="GitHub"
                      className="h-8 w-8 rounded-full"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ahamd-juam-6a07142b9/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/linkedin.webp"
                      alt="LinkedIn"
                      className="h-8 w-8 rounded-full"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Ramah */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="h-full bg-white p-6 shadow-lg text-center">
                <img
                  src="/Ramah.jpg"
                  alt="Ramah Madi"
                  className="h-16 w-16 rounded-full mx-auto"
                />
                <div className="mt-2 flex justify-center gap-4">
                  <a
                    href="https://github.com/ramah-madi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/github.png"
                      alt="GitHub"
                      className="h-8 w-8 rounded-full"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ramah-madi/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/linkedin.webp"
                      alt="LinkedIn"
                      className="h-8 w-8 rounded-full"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Farah */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="h-full bg-white p-6 shadow-lg text-center">
                <img
                  src="/Farah.jpg"
                  alt="Farah Alsoqi"
                  className="h-16 w-16 rounded-full mx-auto"
                />
                <div className="mt-2 flex justify-center gap-4">
                  <a
                    href="https://github.com/FarahAlsoqi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/github.png"
                      alt="GitHub"
                      className="h-8 w-8 rounded-full"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/farah-alsoqi0/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/linkedin.webp"
                      alt="LinkedIn"
                      className="h-8 w-8 rounded-full"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xl font-semibold mt-6 text-center  text-black">
            Connect with us on social media for the latest updates and more!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;

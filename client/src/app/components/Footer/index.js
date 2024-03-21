// // import Link from "next/link"
// import React from "react"

// function Footer() {
//   return (
//     <div className="text-center h-32 flex items-center justify-around">
//       <p className="text-xl text-gray-800">
//         Hammam <span className="font-bold">Abu Shehadeh</span>
//         <a
//           className="flex flex-col "
//           href="https://www.linkedin.com/in/hammam-abu-shehadeh-779525295/"
//           target={"_blank"}
//         >
//           LinkedIn
//         </a>
//         <a
//           className="flex flex-col "
//           href="https://github.com/HammamAbuShehadeh"
//           target={"_blank"}
//         >
//           Git Hub
//         </a>
//       </p>
//     </div>
//   )
// }

// export default Footer

"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  const teamMembers = [
    {
      name: "Hammam Abu Shehadeh",
      github: "https://github.com/HammamAbuShehadeh",
      linkedin:
        "https://www.linkedin.com/in/hammam-abu-shehadeh-779525295/26a/",
    },
    {
      name: "Muna Al Haj Eid",
      github: "https://github.com/MonaAlHajEid",
      linkedin: "https://www.linkedin.com/in/monabadei/",
    },
    {
      name: "Ahmed Juma",
      github: "https://github.com/AHMADJUAM",
      linkedin: "https://www.linkedin.com/in/ahamd-juam-6a07142b9/",
    },
    {
      name: "Ramah Madi",
      github: "https://github.com/ramah-madi",
      linkedin: "https://www.linkedin.com/in/ramah-madi/",
    },
    {
      name: "Farah Alsoqi",
      github: "https://github.com/FarahAlsoqi",
      linkedin: "https://www.linkedin.com/in/farah-alsoqi0/",
    },
  ];

  return (
    <footer className="relative bg-[#222222] top-0 left-0 w-full z-10 px-4 py-5 sm:px-6 lg:px-10">
      <div>
        <div className="absolute logo flex 2xs:justify-center text-white">
          <a style={{ cursor: "pointer" }} href="#">
            OrderJo
          </a>
        </div>

        <div className="xl:flex xl:justify-center xl:gap-8">
          <div className="mt-10 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16 text-center">
            <div className="col-span-2">
              <p
                className="text-white
              xl:mt-6 xl:text-[16px]
              md:mt-4 md:text-[12px]
              2xs:mt-2 2xs:text-[8px]
              "
              >
                is your ultimate destination for exploring global flavors!
                <br />
                Dive into a world of culinary delights, where each dish carries
                its own unique story to tell.
                <br />
                because every dish is an adventure waiting to be savored.
                <br />
                Join us in creating unforgettable dining moment
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <ul className="mt-6 space-y-4 xl:text-sm md:text-xs 2xs:text-[6px]">
                <li>
                  <Link
                    href="/"
                    className="text-white transition hover:opacity-75"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-white transition hover:opacity-75"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contactus"
                    className="text-white transition hover:opacity-75"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-3 sm:col-span-1 justify-center">
              <p className="xl:font-medium md:text-sm 2xs:text-[8px] text-white ">
                Our Developers Team
              </p>

              <ul
                className="
                xl:mt-6 md:mt-4 2xs:mt-2
                xl:space-y-4 md:space-y-2 2xs:space-y-1
                xl:text-sm md:text-xs 2xs:text-[6px]"
              >
                <div>
                  <div className=" xl:space-y-4 md:space-y-2 2xs:space-y-1 ">
                    {teamMembers.map((member, index) => (
                      <div
                        key={index}
                        className="col-span-2 flex justify-start gap-3 "
                      >
                        <p className="container xl:w-40 md:w-20 2xs:w-10 text-white transition">
                          {member.name}
                        </p>

                        <li className="">
                          <a
                            href={member.github}
                            target="_blank"
                            className="text-white transition hover:opacity-75"
                          >
                            <span className="sr-only">GitHub</span>
                            <img
                              src="/github.png"
                              alt="GitHub"
                              className="h-8 w-8 rounded-full"
                            />
                          </a>
                        </li>

                        <li>
                          <a
                            href={member.linkedin}
                            target="_blank"
                            className="text-white transition hover:opacity-75"
                          >
                            <span className="sr-only">Linkedin</span>
                            <img
                              src="/linkedin.webp"
                              alt="LinkedIn"
                              className="h-8 w-8 rounded-full"
                            />
                          </a>
                        </li>
                      </div>
                    ))}
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-8">
          <div className="sm:flex sm:justify-between">
            <p className="xl:text-xs md:text-2xs 2xs:text-[7px] text-gray-500">
              &copy; 2024. OrderJo. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

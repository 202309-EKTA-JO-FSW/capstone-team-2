"use client";
// import React from 'react';
// // import 'path/to/your/tailwind.css'; // Ensure you import your Tailwind CSS file

// const LoginForm = () => {
//   return (
//     <div className="font-poppins bg-gradient-to-b from-gray-800 to-black text-white overflow-hidden h-screen flex flex-col items-center justify-center space-y-8">
//       {/* Stars Background Placeholder */}
//       <div className="absolute top-0 left-0 w-full h-full" id="stars"></div>
      
//       <div className="text-center">
//         <h6 className="text-lg mb-4">
//           <span className="mx-4">Log In</span>
//           <span className="mx-4">Sign Up</span>
//         </h6>

//         <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-md space-y-6">
//           <h4 className="text-xl font-bold mb-4">Log In</h4>
//           <div className="space-y-4">
//             <div className="relative">
//               <input type="email" placeholder="Email" className="bg-gray-800 text-white rounded-md w-full px-4 py-2 pl-10"/>
//               <i className="uil uil-at absolute left-0 top-0 ml-4 mt-3"></i>
//             </div>
//             <div className="relative">
//               <input type="password" placeholder="Password" className="bg-gray-800 text-white rounded-md w-full px-4 py-2 pl-10"/>
//               <i className="uil uil-lock-alt absolute left-0 top-0 ml-4 mt-3"></i>
//             </div>
//           </div>
//           <button className="mt-4 px-6 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-colors">Login</button>
//           <p className="mt-4">
//             <a href="#" className="text-yellow-500 hover:text-yellow-300">Forgot your password?</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

// import React from "react";
// import { StytchLogin } from "@stytch/nextjs";
// import { Products } from "@stytch/vanilla-js";

// /*
// Login configures and renders the StytchLogin component which is a prebuilt UI component for auth powered by Stytch

// This component accepts style, config, and callbacks props. To learn more about possible options review the documentation at
// https://stytch.com/docs/sdks/javascript-sdk#ui-configs
// */
// const Login = () => {
//   const styles = {
//     container: {
//       width: "100%",
//     },
//     buttons: {
//       primary: {
//         backgroundColor: "#4A37BE",
//         borderColor: "#4A37BE",
//       },
//     },
//   };

//   const REDIRECT_URL = "http://localhost:3000/authenticate";

//   const config = {
//     products: [Products.emailMagicLinks, Products.oauth],
//     emailMagicLinksOptions: {
//       loginRedirectURL: REDIRECT_URL,
//       loginExpirationMinutes: 60,
//       signupRedirectURL: REDIRECT_URL,
//       signupExpirationMinutes: 60,
//     },
//     oauthOptions: {
//       providers: [{ type: "google" }],
//       loginRedirectURL: REDIRECT_URL,
//       signupRedirectURL: REDIRECT_URL,
//     },
//   };

//   return <StytchLogin config={config} styles={styles} />;
// };

// export default Login;

"use client";
import Link from 'next/link'
import { useRouter } from 'next/router'
// import { useSession } from 'next-auth/react'

import GoogleButton from './Button/GoogleButton'
// import BrandLogo from '../components/Logo'

const Login = () => {
  // Retrieve the session and router so that we can navigate
  // the user back home if they are already authenticated
//   const { status } = useSession()
//   const router = useRouter()

  // If the user is authenticated, redirect them to the home
  // page
//   if (status === 'authenticated') {
//     router.replace('/')
//   }

  return (
    <div className="grid h-screen grid-cols-8 overflow-hidden">
      <div
        className="col-span-5 overflow-hidden"
        style={{
          backgroundImage: "url('https://placeimg.com/1000/1000/nature/grayscale')",
          backgroundSize: 'cover',
        }}
      ></div>

      <div className="col-span-3 px-12 py-12">
        {/* <BrandLogo className="mx-auto w-96" /> */}
        <p className="mt-2 text-center">Gain immediate access to thousands of news articles from around the world.</p>
        <h2 className="mb-8 mt-12 text-2xl font-bold">Sign In</h2>
        <div className="mb-8">
          <GoogleButton />
        </div>
        <Link href="/" className="block text-center text-sm text-gray-500 underline">
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default Login

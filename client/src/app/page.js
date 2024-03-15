import Test from "./components/Test";
import Link from "next/link";
import HomePage from "./landingpage/page";
export default function Home() {
  return (
    <main>
      <div> 
    {/* // <main className="flex min-h-screen flex-col items-center justify-between p-24"> */}
      {/* // <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"> */}
        {/* <Test /> */}
        {/* <Link href="/restaurents"> Hi </Link> */}
  

        <HomePage/>
      </div>
    </main>
  );
}

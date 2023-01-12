import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-black">
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
          <p className="text-sm text-white">
            © Copyright 2023 Team 53 All rights reserved.
          </p>
          <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
            <li>
              <Link
                href="/"
                className="text-sm text-white transition-colors duration-300 hover:text-green-500"
              >
                F.A.Q
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-sm text-white transition-colors duration-300 hover:text-green-500"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-sm text-white transition-colors duration-300 hover:text-green-500"
              >
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { useState } from "react";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-black">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <Link
            href="/"
            aria-label="Home"
            title="Home"
            className="inline-flex items-center"
          >
            <svg
              className="w-8"
              viewBox="0 0 293 427"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M146.298 323.755L81.3049 282.283V239.616L54.2117 225.792V299.307L146.298 358.059L220.594 310.656L190.712 295.403L146.298 323.755Z"
                fill="#FFFFFF"
              />
              <path
                d="M292.583 249.28V93.3333L146.292 0L0 93.3333V100.075V132.757V165.461V198.144V333.333L146.292 426.667L280.353 341.141L292.583 333.333V314.667V281.984L265.49 268.16L238.377 254.336L211.284 240.512L153.879 211.243L81.2992 174.229V144.384L82.5475 143.595L83.7764 142.805L146.292 102.912L211.284 144.384V207.829L238.377 221.653V127.36L146.292 68.608L54.2059 127.36V127.723V160.405V193.109L81.2992 206.912L174.009 254.208L211.284 273.216L225.757 280.597L238.377 287.04L265.49 300.864V316.309L250.471 325.888L146.292 392.363L27.0932 316.309V211.968V179.264V146.581V113.877V110.357L146.292 34.304L265.49 110.357V235.477L292.583 249.28Z"
                fill="#FFFFFF"
              />
            </svg>

            <span className="ml-2 text-xl font-bold tracking-wide text-gray-100">
              Team 53
            </span>
          </Link>
          <ul className="items-center hidden space-x-8 lg:flex">
            <li>
              <Link
                href="/scan"
                aria-label="Scan Items"
                title="Scan Items"
                className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-green-500"
              >
                Scan
              </Link>
            </li>
            <li>
              <Link
                href="/dispatch"
                aria-label="Dispatch Items"
                title="Dispatch Items"
                className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-green-500"
              >
                Dispatch
              </Link>
            </li>
            <li>
              <Link
                href="/deliver"
                aria-label="Deliver/Pickup Items"
                title="Deliver/Pickup Items "
                className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-green-500"
              >
                Deliver/Pickup
              </Link>
            </li>
          </ul>
          <ul className="items-center hidden space-x-8 lg:flex">
            <li>
              <Link
                href="/"
                className="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-green-600 hover:bg-green-500 focus:ring-2 focus:ring-green-600"
                aria-label="Sign up"
                title="Sign up"
              >
                Sign up
              </Link>
            </li>
          </ul>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-white" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link
                        href="/"
                        aria-label="Home"
                        title="Home"
                        className="inline-flex items-center"
                      >
                        <svg
                          className="w-8"
                          viewBox="0 0 293 427"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          stroke="currentColor"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M146.298 323.755L81.3049 282.283V239.616L54.2117 225.792V299.307L146.298 358.059L220.594 310.656L190.712 295.403L146.298 323.755Z"
                            fill="#000000"
                          />
                          <path
                            d="M292.583 249.28V93.3333L146.292 0L0 93.3333V100.075V132.757V165.461V198.144V333.333L146.292 426.667L280.353 341.141L292.583 333.333V314.667V281.984L265.49 268.16L238.377 254.336L211.284 240.512L153.879 211.243L81.2992 174.229V144.384L82.5475 143.595L83.7764 142.805L146.292 102.912L211.284 144.384V207.829L238.377 221.653V127.36L146.292 68.608L54.2059 127.36V127.723V160.405V193.109L81.2992 206.912L174.009 254.208L211.284 273.216L225.757 280.597L238.377 287.04L265.49 300.864V316.309L250.471 325.888L146.292 392.363L27.0932 316.309V211.968V179.264V146.581V113.877V110.357L146.292 34.304L265.49 110.357V235.477L292.583 249.28Z"
                            fill="#000000"
                          />
                        </svg>
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800">
                          Team 53
                        </span>
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <Link
                          href="/"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-green-500"
                        >
                          Scanning Personnel
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-green-500"
                        >
                          Warehouse Manager
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/"
                          aria-label="Product pricing"
                          title="Product pricing"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-green-500"
                        >
                          Delivery Rider
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/"
                          className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-600 "
                          aria-label="Sign up"
                          title="Sign up"
                        >
                          Sign up
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function Feature() {
  return (
    <div className="bg-black">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-green-500 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="df31b9f6-a505-42f8-af91-d2b7c3218e5c"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#df31b9f6-a505-42f8-af91-d2b7c3218e5c)"
                  width="52"
                  height="24"
                />
              </svg>
              <span className="relative">Route</span>
            </span>{" "}
            Planning for Optimized On-Time Delivery
          </h2>
          <p className="text-base text-white md:text-lg">
            It creates a space for the item scanning employees and warehouse
            managers to efficiently manage the scanning, logging, dispatch, and
            monitoring of goods from a single place.
          </p>
        </div>
        <div className="grid gap-8 row-gap-8 lg:grid-cols-3">
          <div className="sm:text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-50 sm:mx-auto sm:w-24 sm:h-24">
              <svg
                className="w-10"
                strokeLinejoin="round"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M50.7 58.5L0 160H208V32H93.7C75.5 32 58.9 42.3 50.7 58.5zM240 160H448L397.3 58.5C389.1 42.3 372.5 32 354.3 32H240V160zm208 32H0V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192z" />
              </svg>
            </div>
            <h6 className="mb-2 font-semibold leading-5 text-green-500">
              Scanning Personnel
            </h6>
            <p className="max-w-md mb-3 text-sm text-white sm:mx-auto">
              Cheese on toast airedale the big cheese. Danish fontina cheesy
              grin airedale danish
            </p>
            <Link
              href="/scanner"
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-white bg-green-500 px-6 rounded h-9 hover:bg-green-600"
            >
              Sign in
            </Link>
          </div>
          <div className="sm:text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-50 sm:mx-auto sm:w-24 sm:h-24">
              <svg
                className="w-10"
                strokeLinejoin="round"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path d="M0 488V171.3c0-26.2 15.9-49.7 40.2-59.4L308.1 4.8c7.6-3.1 16.1-3.1 23.8 0L599.8 111.9c24.3 9.7 40.2 33.3 40.2 59.4V488c0 13.3-10.7 24-24 24H568c-13.3 0-24-10.7-24-24V224c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32V488c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zm488 24l-336 0c-13.3 0-24-10.7-24-24V432H512l0 56c0 13.3-10.7 24-24 24zM128 400V336H512v64H128zm0-96V224H512l0 80H128z" />
              </svg>
            </div>
            <h6 className="mb-2 font-semibold leading-5 text-green-500">
              Warehouse Manager
            </h6>
            <p className="max-w-md mb-3 text-sm text-white sm:mx-auto">
              Satoshi Nakamoto launched lots of decentralisation when Litecoin
              required
            </p>
            <Link
              href="/manager"
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-white bg-green-500 px-6 rounded h-9 hover:bg-green-600"
            >
              Sign in
            </Link>
          </div>
          <div className="sm:text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-50 sm:mx-auto sm:w-24 sm:h-24">
              <svg
                className="w-10"
                strokeLinejoin="round"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path d="M280 32c-13.3 0-24 10.7-24 24s10.7 24 24 24h57.7l16.4 30.3L256 192l-45.3-45.3c-12-12-28.3-18.7-45.3-18.7H64c-17.7 0-32 14.3-32 32v32h96c88.4 0 160 71.6 160 160c0 11-1.1 21.7-3.2 32h70.4c-2.1-10.3-3.2-21-3.2-32c0-52.2 25-98.6 63.7-127.8l15.4 28.6C402.4 276.3 384 312 384 352c0 70.7 57.3 128 128 128s128-57.3 128-128s-57.3-128-128-128c-13.5 0-26.5 2.1-38.7 6L418.2 128H480c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H459.6c-7.5 0-14.7 2.6-20.5 7.4L391.7 78.9l-14-26c-7-12.9-20.5-21-35.2-21H280zM462.7 311.2l28.2 52.2c6.3 11.7 20.9 16 32.5 9.7s16-20.9 9.7-32.5l-28.2-52.2c2.3-.3 4.7-.4 7.1-.4c35.3 0 64 28.7 64 64s-28.7 64-64 64s-64-28.7-64-64c0-15.5 5.5-29.7 14.7-40.8zM187.3 376c-9.5 23.5-32.5 40-59.3 40c-35.3 0-64-28.7-64-64s28.7-64 64-64c26.9 0 49.9 16.5 59.3 40h66.4C242.5 268.8 190.5 224 128 224C57.3 224 0 281.3 0 352s57.3 128 128 128c62.5 0 114.5-44.8 125.8-104H187.3zM128 384c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32z" />
              </svg>
            </div>
            <h6 className="mb-2 font-semibold leading-5 text-green-500">
              Delivery Rider
            </h6>
            <p className="max-w-md mb-3 text-sm text-white sm:mx-auto">
              Bavaria ipsum dolor sit amet Radler Schneid vui huift vui ognudelt
              i mechad
            </p>
            <Link
              href="/rider"
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-white bg-green-500 px-6 rounded h-9 hover:bg-green-600"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

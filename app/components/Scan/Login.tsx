import Link from "next/link";

export default function Login() {
  return (
    <div className="bg-black">
      <div className="flex flex-col items-center justify-center px-6 py-16 h-[72vh] md:h-[85vh] mx-auto lg:py-16">
        <Link
          href="/"
          className="flex items-center text-2xl font-semibold text-white"
        >
          <svg
            className="w-8 mr-2"
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
          <h1>Team 53</h1>
        </Link>
        <h2 className="text-white text-lg mt-2 mb-4">Scan Items</h2>
        <div className="w-full bg-gray-800 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border sm:text-sm rounded-lg focus:border-green-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-green-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="border sm:text-sm rounded-lg focus:border-green-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-green-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border rounded focus:ring-3  bg-gray-700 border-gray-600 focus:ring-green-500 ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  href="/scan/dashboard"
                  className="text-sm font-medium hover:underline text-primary-500 text-white"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

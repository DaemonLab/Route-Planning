export default function Page404() {
  return (
    <section className="flex items-center h-screen p-16 bg-black">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-green-500">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl text-white">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 text-gray-200">
            But don't worry, you can find plenty of other things on our homepage.
          </p>
          <a
            aria-label="Home"
            href="/"
            className="px-8 py-3 font-semibold rounded text-black bg-green-600 hover:bg-green-500"
          >
            Back to Home
          </a>
        </div>
      </div>
    </section>
  );
}

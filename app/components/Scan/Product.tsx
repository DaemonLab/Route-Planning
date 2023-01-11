export default function Product() {
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <a className="block relative h-48 rounded overflow-hidden">
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src="https://dummyimage.com/420x260"
        />
      </a>
      <div className="mt-4">
        <h2 className="text-white title-font text-lg font-medium">
          ID 879-10-940
        </h2>
        <p className="mt-1">Volume:</p>
        <p className="mt-1">Weight:</p>
      </div>
    </div>
  );
}

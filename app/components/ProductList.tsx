import Product from "./Product"

export default function ProductList() {
  return (
    <div className="text-gray-400 bg-black">
      <div className="container px-5 py-12 mx-auto">
        <h1 className="text-white text-center text-3xl pb-8 font-bold">
          Scanned Items
        </h1>
        <div className="flex flex-wrap -m-4">
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
        </div>
      </div>
    </div>
  );
}

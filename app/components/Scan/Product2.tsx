import { Item } from "../../@types/item";

interface ItemProp {
  item: Item;
}

export const Product: React.FC<ItemProp> = ({ item }) => {
  return (
    <section className="bg-black">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="https://dummyimage.com/720x600"
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            ID {item.item_id}
          </h1>
          <div className="mb-8 leading-relaxed">
            <p className="mt-1 text-lg">Volume: {item.volume}</p>
            <p className="mt-1 text-lg">Weight: {item.weight}</p>
          </div>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-500 rounded text-lg">
              Add Item
            </button>
            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
              Approve Items
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

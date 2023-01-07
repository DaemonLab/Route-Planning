function Riders() {
  return (
    <div className="riders-wrapper w-[95%] h-[80%] p-5 m-6 rounded-xl">
      <div className="relative">
        <h1 className="absolute left-0 text-[40px] flex flex-end font-bold">
          Riders
        </h1>
      </div>
      <div className="h-[70%] overflow-scroll mt-20"></div>
      <div className="w-[100%] flex justify-center mt-4">
        <button className="z-auto bg-[#111111] text-[#02f97b] px-5 py-5 rounded-3xl w-[50%] font-bold">
          Allot Items to Riders
        </button>
      </div>
    </div>
  );
}

export default Riders;

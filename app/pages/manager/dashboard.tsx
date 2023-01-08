import Items from "../../components/Items";
import Navbar from "../../components/Nav";
import Riders from "../../components/Riders";
export default function Dashboard() {
  return (
    <div className="bg-[#111111] h-screen w-screen">
      <Navbar></Navbar>
      <div className="grid grid-cols-5 h-[100%] gap-3">
        <div className="col-span-2 h-[100%]">
          <Items></Items>
        </div>
        <div className="col-span-3 h-[100%]">
          <Riders></Riders>
        </div>
      </div>
    </div>
  );
}

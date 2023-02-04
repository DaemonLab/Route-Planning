import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../../components/Map"), {
  ssr: false,
});

export default function Map() {
  return (
    <>
      <div className="h-[500px] w-[500px]">
        <MapWithNoSSR></MapWithNoSSR>
      </div>
    </>
  );
}

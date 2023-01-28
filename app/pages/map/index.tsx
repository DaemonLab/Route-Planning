import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('../../components/Map/Map'), {
  ssr: false,
});

export default function Map() {
  return (
    <>
      <h1>Hello this is Mihir</h1>
      <br />
      <br />
      <br />
      <div className="h-[500px] w-[500px]">
        <MapWithNoSSR></MapWithNoSSR>
      </div>

    </>
  );
}

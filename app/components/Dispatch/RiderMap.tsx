import React, { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Rider } from "../../@types/rider";

const MapWithNoSSR = dynamic(() => import("../Map"), {
    ssr: false,
});

export default function RiderMap(props: any) {
    
    const [rider, setRider] = React.useState<Rider | undefined>(undefined);

    useEffect(() => {
        setRider(
            props.rider
        );
        console.log(props.rider)

    }, [props.rider]);


    return (
        <>
            {rider === undefined || rider['tasks'].length === 0 ? (
                <h1>Rider is at the Hub</h1>
            ) : (
                <div className="h-[500px] w-[500px]">
                    <MapWithNoSSR rider={rider}></MapWithNoSSR>
                </div>
            )
            }
        </>
    );
}

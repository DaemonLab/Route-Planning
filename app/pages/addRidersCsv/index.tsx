import React, { useEffect, useState } from "react";

import { NavigationContextWrapper } from "../../@types/navigation";
import { Rider, RiderContextWrapper } from "../../@types/rider";
import { RiderContext } from "../../context/riderContext";

export default function AddRiders() {

    const { addRiders } = React.useContext(RiderContext) as RiderContextWrapper;

    const [file, setFile] = useState();
    let riders : Rider[] = []

    useEffect(() => {

        const fileReader = new FileReader();

        if (file) 
        {
            fileReader.onload = function (event: any) 
            {
                let csvOutput = event.target.result;
                csvOutput = csvOutput.split("\n");
                const headers = csvOutput[0].split(",");

                for (let i = 1; i < csvOutput.length - 1; i++) {

                    let element = csvOutput[i].toString();
                    element = element.split(",");
                    let rider_id = element[0];
                    let name = element[1];
                    let age = parseInt(element[2]);
                    let bag_volume = parseInt((element[3].match(/\d+/) || ["SKU_1"])[0])

                    let rider: Rider = {

                        rider_id: rider_id,
                        name: name,
                        age: age,
                        bag_volume:bag_volume ,
                        
                        current_location: {lat:0.0,lng:0.0},
                        current_route: [],
                        route_details: [],
                        route_polyline: [],
                        route_index: 0,

                        tasks: [],
                        task_index: 0
                    }

                    riders.push(rider);
                }
            };
                
            fileReader.readAsText(file);
        }
    });

    const handleOnChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const handleOnSubmitRiders = (e: any) => {
        e.preventDefault();
        addRiders(riders)
    };

    return (
        <div style={{ textAlign: "center" }}>
        <h1>Import CSV file for Riders</h1>
        <form>
            <input
            type={"file"}
            id={"csvFileInput"}
            accept={".csv"}
            onChange={handleOnChange}
            />

            <button
                onClick={(e) => {
                    handleOnSubmitRiders(e);
                }}
            >
            IMPORT CSV
            </button>
        </form>
        </div>
    );
}

import React, { useEffect, useState } from "react";

import { NavigationContextWrapper } from "../../@types/navigation";
import { LocationDetail } from "../../@types/route";
import { NavigationContext } from "../../context/navigationContext";

export default function AddLocations() {

    const { addLocationDetails } = React.useContext(NavigationContext) as NavigationContextWrapper;

    const [file, setFile] = useState();
    let locationDetails : LocationDetail[] = []

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
                    let element1 = element.slice(1, element.length);
                    let element2 = element1.slice(
                        element1.indexOf(`"`) + 2,
                        element1.length
                    );

                    let address = element1.slice(0, element1.indexOf(`"`));
                    let others = element2.split(",");
                    let area = others[0];
                    let awb_id = others[1];
                    let names = others[2];
                    let product_id = (others[3].match(/SKU_\d+/) || ["SKU_1"])[0]


                    let location = {
                        address: address,
                        area: area,
                        awb_id: awb_id,
                        lat: 0.0,
                        lng: 0.0,
                        item_id: product_id
                    };

                    locationDetails.push(location)
                    
                }
            };
                
            fileReader.readAsText(file);
        }
    });

    const handleOnChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const handleOnSubmitItems = (e: any) => {
        e.preventDefault();
        addLocationDetails(locationDetails)
    };

    return (
        <div style={{ textAlign: "center" }}>
        <h1>Import CSV file for Items</h1>
        <form>
            <input
            type={"file"}
            id={"csvFileInput"}
            accept={".csv"}
            onChange={handleOnChange}
            />

            <button
                onClick={(e) => {
                    handleOnSubmitItems(e);
                }}
            >
            IMPORT CSV
            </button>
        </form>
        </div>
    );
}

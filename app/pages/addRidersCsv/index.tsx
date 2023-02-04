import React, { useEffect, useState } from "react";

export default function AddCsv() {
    const [file, setFile] = useState();
    useEffect(() => {
        const fileReader = new FileReader;
        if (file) {
            fileReader.onload = function (event: any) {
                let csvOutput = event.target.result;
                csvOutput = csvOutput.split("\n");
                const headers = csvOutput[0].split(",");
                console.log(headers)
                let obj = []
                for (let i = 1; i < csvOutput.length; i++) {
                    let element = csvOutput[i].toString();
                    element = element.split(",");
                    let rider_id = element[0];
                    let name = element[1];
                    let age = element[2];
                    let bag_volume = element[3];
                    let data = {
                        rider_id: rider_id,
                        name: name,
                        age: age,
                        bag_volume: bag_volume
                    }
                    obj.push(data);
                    console.log(element)
                }
                console.log(obj);

                // send obj as data to the backend/API
            };
            fileReader.readAsText(file);
        }
    })

    // console.log(fileReader)

    const handleOnChange = (e: any) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0])
    };

    const handleOnSubmitItems = (e: any) => {
        e.preventDefault();
        if (file) {
            console.log(file)
        }
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
                        handleOnSubmitItems(e);
                    }}
                >
                    IMPORT CSV
                </button>
            </form>
        </div>
    );
}
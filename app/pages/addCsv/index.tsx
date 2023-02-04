import React, { useEffect, useState } from "react";

export default function AddCsv() {
    const [file, setFile] = useState();
    const [data, setData] = useState([]);
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
                    let element1 = element.slice(1, element.length);
                    let element2 = element1.slice(element1.indexOf(`"`) + 2, element1.length);
                    let address = element1.slice(0, element1.indexOf(`"`));
                    let others = element2.split(",");
                    let area = others[0];
                    let awb_id = others[1];
                    let names = others[2];
                    let product_id = others[3];
                    let data = {
                        location:{
                            address: address,
                            area: area,
                            awb_id: awb_id
                        }, 
                        names: names,
                        item_id: product_id
                    }
                    obj.push(data)
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

    const handleOnSubmit = (e: any) => {
        e.preventDefault();

        if (file) {
            console.log(file)
        }
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
                        handleOnSubmit(e);
                    }}
                >
                    IMPORT CSV
                </button>
            </form>
        </div>
    );
}
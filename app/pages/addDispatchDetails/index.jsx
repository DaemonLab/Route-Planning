import React,{ useState } from 'react';
import * as XLSX from 'xlsx';
import '../../components/Home/Navbar'
import Navbar from '../../components/Home/Navbar';
import Footer from '../../components/Footer';

import { ItemContext } from "../../context/itemContext"

const day_start = new Date("07-02-2023")

const get_algthm_edd = (edd) => {

  let delta_seconds = parseInt(((new Date(edd)).getTime() - day_start.getTime())/1000);

  let edd_time_algthm

  if(delta_seconds > 0) {
    edd_time_algthm = 48600
  }
  else {
    edd_time_algthm = delta_seconds + parseInt(Math.random() * (30000 - 3600) + 3600)
  }

  return edd_time_algthm

}

function AddDispatchDetails() {

  const { addDispatchDetails } = React.useContext(ItemContext) 

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    console.log("Columns",columns)
    console.log("Data",data)

    const handleSubmit = (e)=>{

      let dispatchDetails = []

      if(!(columns.length===5 && columns[0]['name']==='address' && columns[1]['name']==='AWB' 
                              && columns[2]['name']==='names' && columns[3]['name']==='product_id'
                              && columns[4]['name']==='EDD'))
      {
        alert('Invalid file uploaded for dispatch items.')
        return
      }

      data.forEach((dispatchDetail)=>{

        dispatchDetails.push({
          item_id: dispatchDetail['product_id'],
          name: 'Delivery Item',
          description: 'This is an Item',
          task_type: "Delivery",

          volume: parseInt(Math.random() * (30 - 10) + 10),
          weight: parseInt(Math.random() * (500 - 100) + 100),

          awb_id: dispatchDetail['AWB'],
          task_location: {
            address: dispatchDetail['address'],
            lat: 0.0,
            lng: 0.0
          },
          scan_time: new Date(),
          edd: get_algthm_edd(dispatchDetail['EDD'])
        })
      })

      console.log("Adding dispatch details",dispatchDetails)

      addDispatchDetails(dispatchDetails);
      alert("Dispatch Details Added")
    }

    const processData = (dataString) => {
      const dataStringLines = dataString.split(/\r\n|\n/);
      const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
   
      const list = [];
      for (let i = 1; i < dataStringLines.length; i++) {
        const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        if (headers && row.length === headers.length) {
          const obj = {};
          for (let j = 0; j < headers.length; j++) {
            let d = row[j];
            if (d.length > 0) {
              if (d[0] === '"')
                d = d.substring(1, d.length - 1);
              if (d[d.length - 1] === '"')
                d = d.substring(d.length - 2, 1);
            }
            if (headers[j]) {
              obj[headers[j]] = d;
            }
          }
   
          // remove the blank rows
          if (Object.values(obj).filter(x => x).length > 0) {
            list.push(obj);
          }
        }
      }
   
      // prepare columns list from headers
      const columns = headers.map(c => ({
        name: c,
        selector: c,
      }));
   
      setData(list);
      setColumns(columns);
    }

    // handle file upload
    const handleFileUpload = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        processData(data);
      };
      reader.readAsBinaryString(file);
      
    }
    
    return (
      <>
      <Navbar />
          <div className="flex items-center justify-start bg-black px-4" style={{height:'83vh'}}>
          <div className="mx-auto w-full max-w-lg ">
          <h1 className="text-4xl font-bold text-center text-white">Add Dispatch Items</h1>
          <form action="/" className="mt-10">
            <div className="gap:6">
              <div className="relative z-0 mt-10 pt-2 col-span-2">              
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="peer block w-full appearance-none border-0 border-b border-white bg-transparent py-3 px-0 text-sm text-gray-100 focus:border-green-500 focus:outline-none focus:ring-0"
                  placeholder=" "
                                
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-md text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-green-500">
                  Upload File Here
                </label>
              </div>
              <div className="flex justify-center align-items-center">
                <button
                  type="submit"
                  className="mt-10 rounded-md bg-green-600 hover:bg-green-500 px-10 py-2 text-white"
                  onClick={handleSubmit}
                >
                  Add
                </button>
            </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      </>
    )
}

export default AddDispatchDetails;
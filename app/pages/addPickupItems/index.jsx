import React,{ useState } from 'react';
import * as XLSX from 'xlsx';
import '../../components/Home/Navbar'
import Navbar from '../../components/Home/Navbar';
import Footer from '../../components/Footer';

import { NavigationContext } from "../../context/navigationContext"

function AddPickupItems() {

  const { addPickupItems } = React.useContext(NavigationContext) 

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    const [numHours, setNumHours] = useState(1);

    console.log("Columns",columns)
    console.log("Data",data)

    const handleSubmit = ()=>{

      let pickupItems = []

      if(!(columns.length===7 && columns[0]['name']=='srno' && columns[1]['name']==='address' && columns[2]['name']==='AWB' 
                              && columns[3]['name']==='names' && columns[4]['name']==='sku'
                              && columns[5]['name']==='EDD' && columns[6]['name']==='Volume'))
      {
        alert('Invalid file uploaded for pickup items.')
        return
      }

      data.forEach((pickupItem)=>{

        pickupItems.push({
            'item_id': pickupItem['sku'],
            'name': 'Pickup Item',
            'description': '',
            'task_type': 'Pickup',

            'volume': (pickupItem['Volume']==='') ? (Math.random() * (31 - 10) + 10) : parseInt(pickupItem['Volume']),
            'weight': (Math.random() * (500 - 100) + 100), 

            'awb_id': pickupItem['AWB'],
            'task_location': {
              'address': pickupItem['address'],
              'lat': 0.0,
              'lng': 0.0
            },
            'scan_time': new Date(),
            'edd': new Date()
        })
      })

      addPickupItems({num_hours:numHours, items:pickupItems});


      alert("Pickup Items Added")
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
          <h1 className="text-4xl font-bold text-center text-white">Add Pickup Items</h1>
          <form action="/addCsv" className="mt-10">
           <div className="relative z-0 mt-10 mb-10 pt-2 col-span-2">
              <input
                type="number"                              
                className="peer block w-full appearance-none border-0 border-b border-white bg-transparent py-3 px-0 text-sm text-gray-100 focus:border-green-500 focus:outline-none focus:ring-0"
                placeholder=" "

              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-md text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-green-500">
                Enter number of hours
              </label>
            </div>
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

export default AddPickupItems;
import React,{ useState } from 'react';
import * as XLSX from 'xlsx';


import { NavigationContext } from "../../context/navigationContext"

function AddPickupLocations() {

  const { addPickupItems } = React.useContext(NavigationContext) 

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    console.log("Columns",columns)
    console.log("Data",data)

    const handleSubmit = ()=>{

      let pickupItems = []

      if(!(columns.length===5 && columns[0]['name']==='address' && columns[1]['name']==='AWB' 
                              && columns[2]['name']==='names' && columns[3]['name']==='sku'
                              && columns[4]['name']==='EDD' && columns[5]['name']==='Volume'))
      {
        alert('Invalid file uploaded for dispatch items.')
        return
      }

      data.forEach((pickupItem)=>{

        pickupItems.push({
            'item_id': pickupItem['sku'],
            'awb_id': pickupItem['AWB']
        })
      })

      addLocationDetails(locationDetails);


      alert("Instructors Added")
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
           <div>
              <form action="/addCsv">
                  <br></br>
                  <h3>Add Instructors</h3>
                  <br></br> <br></br> 

                  <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  />
                  <br></br> <br></br> 
              </form> 
          </div>
          <br/><br/>
          <button onClick={handleSubmit}>Upload CSV</button>
        </>
    )
}

export default AddPickupLocations;
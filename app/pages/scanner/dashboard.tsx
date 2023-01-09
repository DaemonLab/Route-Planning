import * as React from 'react';
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ScannerOutput from '../../components/ScannerOutput';
import ScannedItems from '../../components/ScannedItems';

export default function Scanner() {

    return (
        <>
            
            <Navbar/>

            <div className="flex">
                <ScannerOutput/>
                <ScannedItems/>
            </div>

            

            <Footer/>
        </>
    )
}

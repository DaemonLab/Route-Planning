import * as React from 'react';
import Image from 'next/image';
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import groceryImg from '../../public/grocery.png'

export default function Scanner() {

    return (
        <>
            
            <Navbar/>

            <div className='flex items-center space-x-3 left-4 top-28'>
                <Image
                    src={groceryImg}
                    alt="Picture of the author"
                    className='max-w-sm'
                />
                <div className='bg-gray-500 border-2 rounded-md p-2'>   
                    <ul>
                        <li>Name : zxc</li>
                        <li>Volume : 10</li>
                        <li>Weight : 23</li>
                        <li>id : as123as</li>
                    </ul>
                </div>
                
            </div>

            <Footer/>
        </>
    )
}

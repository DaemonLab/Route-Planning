import * as React from 'react';
import Image from 'next/image';
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import groceryImg from '../../public/grocery.png'

export default function Scanner() {

    return (
        <>
            
            <Navbar/>

            <div className='flex items-center space-x-3'>
                <Image
                    src={groceryImg}
                    alt="Picture of the author"
                    className='max-w-sm'
                />
                <div className='bg-gray-800 rounded-lg shadow text-white text-lg'>   
                    <ul className='list-[">"] p-4'> 
                        <li className='px-1'>Name : zxc</li>
                        <li className='px-1'>Volume : 10</li>
                        <li className='px-1'>Weight : 23</li>
                        <li className='px-1'>id : as123as</li>
                    </ul>
                </div>
                
            </div>

            <Footer/>
        </>
    )
}

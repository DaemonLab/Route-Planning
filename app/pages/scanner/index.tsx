<<<<<<< HEAD
import * as React from 'react';
import Image from 'next/image';
import groceryImg from '../../public/grocery.png'

export default function Scanner() {

    return (
        <>
            
            <nav className='flex justify-between items-center bg-green-300 p-1 w-[100%]'>

                <span>Grow Simplee</span>
                
                <ul className='flex justify-around'>
                    <li className='p-2'>Home</li>
                    <li className='p-2'>About</li>
                    <li className='p-2'>Contact</li>
                </ul>

            </nav>

            <div className='absolute flex items-center space-x-3 left-4 top-28'>
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


        </>
    )
=======
export default function Scanner() {
  return (
    <>
      <h1>Scanner Home Page</h1>
    </>
  );
>>>>>>> main
}

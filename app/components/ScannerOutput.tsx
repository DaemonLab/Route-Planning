import Image from 'next/image';
import groceryImg from '../public/images/grocery.png'

export default function ScannerOutput() {
  return (
    <div className="bg-black">
        <div className="flex items-center space-x-8 p-20">
                <Image
                    src={groceryImg}
                    alt="Picture of the author"
                    className="max-w-sm"
                />

                <div className="flex flex-col items-center space-y-4">
                    <div className="bg-gray-800 rounded-lg shadow text-white w-72">   
                        <div className="text-3xl pt-2 px-4">Soda Bottle</div>

                        <div className="text-slate-300 text-xs p-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, sit.
                            <hr className="mt-3 bg-transparent"/>
                        </div>
                        
                        <div className="p-4">
                            <div className="flex space-x-2 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                                </svg>
                                <div> Weight : 23kg </div>
                                
                            </div>
                            <div className="flex space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                                <div> Volume : 100L </div> 
                            </div>
                        </div>

                    </div>

                    <button
                    type="submit"
                    aria-label=""
                    className="inline-flex items-center justify-center font-semibold transition-colors duration-200 text-white bg-green-500 px-6 rounded h-9 w-32 hover:bg-green-600"
                    >
                        Add Item
                    </button>

                </div>

        </div>
    </div>
  )
}
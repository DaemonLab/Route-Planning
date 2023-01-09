import Image from 'next/image';
import itemImg from '../public/images/item.png'

export default function ScannedItems() {
  return (
    <div className="bg-black w-full">
        <div className="flex flex-col items-cente p-14">
            
            <div className="w-full max-w-md p-4 bg-gray-800 border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-white">Scanned Items</h5>
                </div>

                <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <Image className="w-8 h-8 rounded-full" src={itemImg} alt="Neil image"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate">
                                            Neil Sims
                                        </p>
                                        <p className="text-sm text-white truncate">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-white">
                                        $320
                                    </div>
                                </div>
                            </li>
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <Image className="w-8 h-8 rounded-full" src={itemImg} alt="Bonnie image"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate ">
                                            Bonnie Green
                                        </p>
                                        <p className="text-sm text-white truncate ">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-white ">
                                        $3467
                                    </div>
                                </div>
                            </li>
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <Image className="w-8 h-8 rounded-full" src={itemImg} alt="Bonnie image"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate ">
                                            Bonnie Green
                                        </p>
                                        <p className="text-sm text-white truncate ">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-white ">
                                        $3467
                                    </div>
                                </div>
                            </li>

                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <Image className="w-8 h-8 rounded-full" src={itemImg} alt="Bonnie image"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate ">
                                            Bonnie Green
                                        </p>
                                        <p className="text-sm text-white truncate ">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-white ">
                                        $3467
                                    </div>
                                </div>
                            </li>
                            
                            
                        </ul>
                </div>
            </div>

        </div>
    </div>
    
  )
}
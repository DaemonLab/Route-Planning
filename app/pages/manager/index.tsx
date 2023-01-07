import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
export default function ManagerHome() {
    const router = useRouter();
    const onLogin = () => {
        //verification
        router.push("/manager/dashboard")
    }
    return (
        <>
            <div className='absolute'>
                <Image width={200} height={100} alt="Grow Simplee Logo" src="/interIITLogo.png"></Image>
            </div>
            <div className='flex justify-center items-center h-screen bg-[#111111]'>

                <div className='w-[400px] h-auto'>
                    <div className=''>
                        <Image width={500} height={100} alt="Grow Simplee Logo" src="/growSimplee.png"></Image>
                    </div>
                    <h1 className='text-center text-2xl font-bold text-[#02f97b] mb-10'>LOGIN AS MANAGER</h1>
                    <div className='bg-[#cee0d5] w-[100%] h-[250px] rounded-lg p-5'>
                        <div className='mb-5'>
                            <p className='text-[#696b6a]'>Username</p>
                            <input className='bg-[#e4f0e8] border-b-2 border-[#84a38f] rounded h-10 p-3 w-[100%]'></input>
                        </div>
                        <div className='mb-6'>
                            <p className='text-[#696b6a]'>Password</p>
                            <input className='bg-[#e4f0e8] border-b-2 border-[#84a38f] rounded h-10 p-3 w-[100%]' type={"password"}></input>
                        </div>
                        <div className='flex justify-center'>
                            <div onClick={onLogin} className="w-[30%]">
                                <button className='z-auto bg-[#111111] text-[#02f97b] px-5 py-2 rounded-md w-[100%]' onClick={() => { }}>
                                    Login
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

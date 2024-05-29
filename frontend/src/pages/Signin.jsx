import { useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ongc_logo from "../assets/Oil_and_Natural_Gas_Corporation-Logo.wine.svg"
import BlobButton from "../components/BlobButton";

export default function Signin() {
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [invalid, setInvalid] = useState(false)
    useEffect(() => {
        try {
            const token = localStorage.getItem('token')
            
        }
        catch {
            
        }
    }, [])
    return (
        <div className="flex bg-black">

            <div className="w-full md:w-2/5 bg-white flex justify-center items-center h-screen max-sm:hidden max-md:hidden">
                <div className="flex flex-col items-center">
                    <img src={ongc_logo} alt="" className="h-44 w-44" />
                    <br />
                    <h1 className="text-4xl font-bold mb-4 text-red-700">Complaint Portal</h1>
                </div>
            </div>
            <div className="w-full h-screen md:w-3/5 bg-red-800 flex justify-center items-center">
                <div className="w-full max-w-md">
                    <div className="p-5">
                        <h2 className="text-2xl font-semibold mb-2 text-white text-center">Sign In</h2>
                    </div>
                    <div className=' mb-4  justify-center py-1 sm:px-6 lg:px-8 '>
                        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                            <div className='bg-white py-12 px-4 shadow sm:rounded-lg sm:px-10'>
                                <div className='flex flex-col items-center justify-center gap-4'>
                                    <p className='font-normal text-2xl text-gray-900'>Welcome</p>

                                    <p className='font-light text-sm text-gray-600'>
                                        Enter your credentials.
                                    </p>
                                    <InputBox type={"text"} label={"CPF"} stateVariable={cpf} onChange={(e) => setCpf(Number(e.target.value))} />
                                    <InputBox type={"password"} label={"Password"} stateVariable={password} onChange={(e) => setPassword(e.target.value)} />
                                    {invalid ?
                                        <p className="text-red-800 text-opacity-80 text-sm font-medium">*incorrect credentials*</p>
                                        : <></>
                                    }
                                    <br />
                                    <BlobButton label={"Sign In"} onClick={async () => {
                                        setInvalid(false)
                                        try {
                                            await axios.post('http://localhost:3000/v1/user/who', {
                                                cpf: cpf,
                                                password: password
                                            })
                                                .then(async (res) => {
                                                    const response = await axios.post(`http://localhost:3000/v1/${res.data.who}/signin`, {
                                                        cpf: cpf,
                                                        password: password
                                                    })
                                                    localStorage.setItem('token', response.data.token)
                                                    localStorage.setItem('who', res.data.who)
                                                })
                                            navigate('/dashboard')
                                        }
                                        catch (err) {
                                            setCpf(String(''))
                                            setPassword('')
                                            setInvalid(true)
                                            console.log(err)
                                        }
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
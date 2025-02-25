import { useState } from "react";
import ButtonWrapper from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your infromation to create an account"} />
                <InputBox placeholder="Kshitij" label={"First Name"} onChange={(e)=>setFirstName(e.target.value)}/>
                <InputBox placeholder="Gupta" label={"Last Name"} onChange={(e)=>setLastName(e.target.value)}/>
                <InputBox placeholder="76538" label={"CPF"} onChange={(e)=>setCpf(e.target.value)}/>
                <InputBox placeholder="meganfox" label={"Password"} onChange={(e)=>setPassword(e.target.value)}/>
                    
                <div className="pt-4">
                    <ButtonWrapper label={"Sign up"} onClick={async()=>{
                        const response = await axios.post('http://localhost:3000/api/v1/user/signup',{
                            cpf: cpf,
                            password: password,
                            firstName: firstName,
                            lastName: lastName
                        })
                        localStorage.setItem('token', response.data.token)
                        navigate('/complaint')
                    }} />
                </div>
            </div>
        </div>
    </div>
}
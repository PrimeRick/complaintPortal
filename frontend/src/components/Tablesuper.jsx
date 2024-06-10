import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Department from './Department'
import { useNavigate } from 'react-router-dom'

function TableSuper() {
    const token = localStorage.getItem('token')
    const [admins, setAdmins] = useState([])
    const [cpf, setCpf] = useState("")
    const [dept, setDept] = useState("Department")
    const navigate = useNavigate()
    useEffect(() => {
        try {
            axios.get('http://localhost:3000/v1/superAdmin/admins', {
                headers: {
                    Authorization: token
                }
            })
                .then((response) => {
                    if (response.data.msg == 'token expired') {
                        localStorage.removeItem('token')
                        localStorage.removeItem('who')
                        localStorage.removeItem('complaintType')
                        alert('Session Expired !! \nPlease Sign In Again')
                        navigate('/signin')
                    }
                    setAdmins(response.data.admins)
                })
        }
        catch (err) {
            const msg = err.response.data.msg
            console.log(`hollllaaaaa${err}`)
            console.log(msg);
        }
    }, [])

    return (
        <>
            <div className='w-10/12 grid-cols-12'>
                <div className='col-span-9'>
                    <div className='flex flex-row items-center pl-12'>
                        <div>
                            <div className="text-sm font-medium text-left py-2 -mt-8">
                                CPF {<span className="text-red-600 font-semibold">*</span>}
                            </div>
                            <input placeholder='' value={cpf} type='text' className="w-40 px-2 py-1 border rounded border-slate-200 text-black" onChange={(e) => {
                                setCpf(Number(e.target.value))
                            }} />
                        </div>
                        <Department type={dept} setType={setDept} />
                        <button type="button" class="btn btn-success" onClick={() => {
                            axios.post('http://localhost:3000/v1/superAdmin/createAdmin',
                                {
                                    cpf: cpf,
                                    dept: dept
                                }, {
                                headers: {
                                    Authorization: localStorage.getItem('token'),
                                    "Content-Type": 'application/json'
                                }
                            })
                                .then((response) => {
                                    if (response.data.msg == 'token expired') {
                                        localStorage.removeItem('token')
                                        localStorage.removeItem('who')
                                        localStorage.removeItem('complaintType')
                                        alert('Session Expired !! \nPlease Sign In Again')
                                        navigate('/signin')
                                    }
                                    setAdmins(response.data.admins)
                                    setCpf('')
                                    setDept('Dept')
                                })
                        }}>Create Admin</button>
                    </div>
                    <table className="w-full">
                        {/* Table content */}
                        <colgroup>
                            <col style={{ width: "13%" }} />
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "22%" }} />
                        </colgroup>
                        <thead className="text-[#4D4D4D]">
                            <tr className="bg-[#F2F2F2]">
                                <th className="px-3 py-[10px] text-center text-sm font-medium tracking-wider">

                                </th>
                                <th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider">
                                    CPF
                                </th>
                                <th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider">
                                    Dept
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-[#E6E6E6]">
                            {admins.map((elem) => (
                                <tr className="text-sm relative" key={elem._id}>
                                    <td className="px-3 py-[10px] whitespace-wrap text-[#1A181E] ">
                                        <button type="button" class="btn btn-danger" onClick={() => {
                                            const config = {
                                                headers: {
                                                    Authorization: localStorage.getItem('token'),
                                                    'Content-Type': 'application/json'
                                                },
                                                data: {
                                                    cpf: elem.cpf,
                                                    dept: elem.dept
                                                }
                                            }
                                            axios.delete('http://localhost:3000/v1/superAdmin/removeAdmin', config)
                                                .then((response) => {
                                                    if (response.data.msg == 'token expired') {
                                                        localStorage.removeItem('token')
                                                        localStorage.removeItem('who')
                                                        localStorage.removeItem('complaintType')
                                                        alert('Session Expired !! \nPlease Sign In Again')
                                                        navigate('/signin')
                                                    }
                                                    setAdmins(response.data.admins)
                                                })
                                        }}>Remove</button>
                                    </td>
                                    <td className="px-3 py-[10px] whitespace-wrap text-[#4D4D4D]">
                                        {elem.cpf}
                                    </td>
                                    <td className="px-3 py-[10px] whitespace-wrap text-[#1A181E] ">
                                        {elem.dept}
                                    </td>
                                    <span className="absolute bg-[#E6E6E6] w-[calc(50%)] h-[1px] bottom-0 left-[10px]"></span>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='col-span-2'>
                    <button type='button' class="btn btn-danger" onClick={()=>{
                        const config = {
                            headers: {
                                Authorization: localStorage.getItem('token'),
                                'Content-Type': 'application/json'
                            }
                        }
                        axios.delete('http://localhost:3000/v1/superAdmin/reset', config)
                        .then((response)=>{
                            console.log(response.data)
                        })
                    }}>Reset</button>
                    <button type='button' class="btn btn-success" onClick={()=>{
                        const config = {
                            headers: {
                                Authorization: localStorage.getItem('token'),
                                'Content-Type': 'application/json'
                            }, 
                            responseType: 'blob'
                        }
                        axios.get('http://localhost:3000/v1/superAdmin/downloadExcel', config)
                        .then((response)=>{
                            const url = window.URL.createObjectURL(new Blob([response.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', 'complaints.xlsx'); // Specify the file name
                            document.body.appendChild(link);
                            link.click();
                            link.parentNode.removeChild(link); // Clean up the DOM
                        })
                    }}>Downlaod</button>
                </div>
            </div>
        </>
    )
}

export default TableSuper;
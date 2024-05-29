import axios from "axios"

export default function Entrysuper({ cpf, dept, setAdmins }) {
    return (
            <tr className="text-sm relative" key={cpf}>
                <td className="px-3 py-[10px] whitespace-wrap text-[#4D4D4D]">
                    <button type="button" class="btn btn-danger" onClick={() => {
                        const config = {
                            headers: {
                                Authorization: localStorage.getItem('token'),
                                'Content-Type': 'application/json'
                            },
                            data: {
                                cpf: cpf,
                                dept: dept
                            }
                        }
                        axios.delete('http://localhost:3000/v1/superAdmin/removeAdmin', config)
                            .then((response) => {
                                setAdmins(response.data.admins)
                            })
                    }}>Remove</button>
                </td>

                <td className="px-3 py-[10px] whitespace-wrap text-[#4D4D4D]">
                    {cpf}
                </td>
                <td className="px-3 py-[10px] whitespace-wrap text-[#1A181E] ">
                    {dept}
                </td>
                <span className="absolute bg-[#E6E6E6] w-[calc(100%-20px)] h-[1px] bottom-0 left-[10px]"></span>
            </tr>
    )
}
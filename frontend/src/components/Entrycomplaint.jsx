import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StatusButton from './StatusButton';

function Entry({ cpf, status, description, createdAt, complaintId, dept, isTableVisible, index, location }) {
	const phaseExists = location.split(' / ')[0]
	{phaseExists=='undefined'?
	location=location.split(' / ')[1]:<></>}
	// const [status2, setStatus2] = useState(status)
	// const token = localStorage.getItem('token')
	// useEffect(() => {
	// 	axios.put(`http://localhost:3000/v1/superAdmin/${status2}`, {
	// 		complaintId: complaintId
	// 	}, {
	// 		headers: {
	// 			Authorization: token
	// 		}
	// 	}).then((response) => {
	// 		if (response.data.msg == 'token expired') {
	// 			localStorage.removeItem('token')
	// 			localStorage.removeItem('who')
	// 			localStorage.removeItem('complaintType')
	// 			alert('Session Expired !! \nPlease Sign In Again')
	// 			navigate('/signin')
	// 		}
	// 		setStatus2(response.data.state)
	// 	})
	// }, [status2])
	return (
		<>
			<tr className="text-sm " key={complaintId}>
				<th scope="row">{complaintId}</th>
				<td className="px-3 py-[10px] whitespace-wrap text-[#4D4D4D " >{cpf}</td>
				<td className="px-3 py-[10px] whitespace-wrap text-[#4D4D4D" >{dept}</td>
				<td className="px-3 py-[10px] whitespace-wrap align-middle gap-[6px] text-[#1A181E] z-10">
					{/* <StatusButton type={status2} setType={setStatus2} /> */}
					{status}
				</td>
				<td className="px-3 py-[10px] whitespace-wrap text-[#1A181E]">{location}</td>
				<td className="px-3 py-[10px] whitespace-wrap text-[#1A181E]">{description}</td>
				<td className="px-3 py-[10px] whitespace-wrap text-[#4D4D4D]">{createdAt}</td>
				{isTableVisible && (
					<span className="absolute bg-[#E6E6E6] w-[calc(100%-20px)] h-[1px] bottom-0 left-[10px]"></span>
				)}
			</tr>
		</>
	)
}

export default Entry
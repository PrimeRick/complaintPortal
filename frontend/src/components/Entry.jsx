
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StatusButton from './StatusButton';

function Entry({ cpf, status, description, createdAt, complaintId, isTableVisible, feedback, index }) {
	const [status2, setStatus2] = useState(status)
	const token = localStorage.getItem('token')
	console.log(status2);
	useEffect(() => {
		axios.put(`http://localhost:3000/v1/admin/${status2}`, {
			complaintId: complaintId
		}, {
			headers: {
				Authorization: token
			}
		}).then((response) => {
			if (response.data.msg == 'token expired') {
				localStorage.removeItem('token')
				localStorage.removeItem('who')
				localStorage.removeItem('complaintType')
				alert('Session Expired !! \nPlease Sign In Again')
				navigate('/signin')
			}
			setStatus2(response.data.state)
		})
	}, [status2])
	return (
		<>
			<tr className="text-sm relative" key={complaintId}>
				<th scope="row">{index}</th>
				<td className="px-3 py-[10px] whitespace-wrap" >{cpf}</td>
				<td className="px-3 py-[10px] whitespace-wrap align-middle gap-[6px] z-10">
					<StatusButton type={status2} setType={setStatus2} />
				</td>
				<td className="px-3 py-[10px] whitespace-wrap">{description}</td>
				<td className="px-3 py-[10px] whitespace-wrap">{createdAt}</td>
				<td className="px-3 py-[10px] whitespace-wrap" >{feedback}</td>
				{isTableVisible && (
					<span className="absolute w-[calc(100%-20px)] h-[1px] bottom-0 left-[10px]"></span>
				)}
			</tr>
		</>
	)
}

export default Entry
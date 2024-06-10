import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Space({ phase, quarter, location}) {
	const complaintType = localStorage.getItem('complaintType');
	let whichSerial;
	{complaintType=='Civil'?
		whichSerial='civilSerial': complaintType=='Canteen'?
			whichSerial='canteenSerial': complaintType=='Electrical'?
				whichSerial='electricalSerial': whichSerial='housekeepingSerial'}
	const who = localStorage.getItem('who')
	const [desc, setDesc] = useState('')
	const navigate = useNavigate();
	console.log(phase)
	console.log(quarter)
	return (
		<div>
			<br />
			<b style={{ color: 'maroon' }}>COMPLAINT</b>
			<div className='text-center'>
				<label for="exampleFormControlTextarea1" ></label>
				<textarea value={desc} onChange={(e)=>setDesc(e.target.value)}
				style={{ backgroundColor: "#edd8d8" }} class="form-control" id="exampleFormControlTextarea1" rows="15" placeholder='ENTER YOUR COMPLAINT '></textarea>
				<br />
				<br />
				<button type="button" class="btn btn-success" onClick={() => {
					axios.get(`http://localhost:3000/v1/${who}/${whichSerial}`, {
						headers: {
							Authorization: localStorage.getItem('token')
						}
					})
					.then((response)=>{
						const serial = response.data.serial
						console.log(serial)
						{location=='Plant'?
						axios.post(`http://localhost:3000/v1/${who}/complaint`, {
							dept: complaintType,
							serial: serial,
							location: location,
							qtrNo: quarter,
							description: desc
						}, {
							headers: {
								Authorization: localStorage.getItem('token'),
							}
						})
						.then(()=>{
							axios.put(`http://localhost:3000/v1/${who}/updateSerial`,{
								serial: serial,
								whichSerial: whichSerial
							}, {
								headers: {
									Authorization: localStorage.getItem('token')
								}
							})
							.then(()=>{
								localStorage.removeItem('complaintType');
								navigate('/dashboard')
							})
						})
						:
						axios.post(`http://localhost:3000/v1/${who}/complaint`, {
							dept: complaintType,
							location: location,
							serial: serial,
							phase: phase,
							qtrNo: quarter,
							description: desc
						}, {
							headers: {
								Authorization: localStorage.getItem('token'),
							}
						})
						.then(()=>{
							axios.put(`http://localhost:3000/v1/${who}/updateSerial`,{
								serial: serial,
								whichSerial: whichSerial
							}, {
								headers: {
									Authorization: localStorage.getItem('token')
								}
							})
							.then(()=>{
								localStorage.removeItem('complaintType');
								navigate('/dashboard')
							})
						})
					}
					})
				}}>SUBMIT</button>
				<br />
			</div>
		</div>
	)
}

export default Space
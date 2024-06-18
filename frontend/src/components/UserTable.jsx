import React, { useEffect, useState } from 'react'
import axios from 'axios'
import InputBox from './InputBox'
import Button from './Button'

function UserTable() {
	const [complaints, setComplaints] = useState([]);
	const [isTableVisible, setIsTableVisible] = useState(false);
	const [isMediumScreen, setIsMediumScreen] = useState(false);
	const token = localStorage.getItem('token');
	const [feedback, setFeedback] = useState('')
	const who = localStorage.getItem('who');

	useEffect(() => {
		// Fetch complaints data
		{
			who == 'user' ?
				axios.get(`http://localhost:3000/v1/user/dashboard`, {
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
						setComplaints(response.data.complaints);
						setIsTableVisible(true); // Show the table after fetching data
					})
					.catch((error) => {
						console.error('Error fetching complaints:', error);
					})
				:
				axios.get(`http://localhost:3000/v1/${who}/userDashboard`, {
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
						setComplaints(response.data.complaints);
						setIsTableVisible(true); // Show the table after fetching data
					})
					.catch((error) => {
						console.error('Error fetching complaints:', error);
					})

		}

		// Check initial screen size
		handleScreenSizeChange();

		// Add event listener for screen size changes
		window.addEventListener('resize', handleScreenSizeChange);

		// Cleanup function
		return () => {
			window.removeEventListener('resize', handleScreenSizeChange);
		};
	}, []);
	useEffect(() => {
		// Fetch complaints data
		{
			who == 'user' ?
				axios.get(`http://localhost:3000/v1/user/dashboard`, {
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
						setComplaints(response.data.complaints);
						setIsTableVisible(true); // Show the table after fetching data
					})
					.catch((error) => {
						console.error('Error fetching complaints:', error);
					})
				:
				axios.get(`http://localhost:3000/v1/${who}/userDashboard`, {
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
						setComplaints(response.data.complaints);
						setIsTableVisible(true); // Show the table after fetching data
					})
					.catch((error) => {
						console.error('Error fetching complaints:', error);
					})

		}

		// Check initial screen size
		handleScreenSizeChange();

		// Add event listener for screen size changes
		window.addEventListener('resize', handleScreenSizeChange);

		// Cleanup function
		return () => {
			window.removeEventListener('resize', handleScreenSizeChange);
		};
	}, [complaints]);

	// Function to handle screen size changes
	const handleScreenSizeChange = () => {
		setIsMediumScreen(window.matchMedia('(min-width: 768px)').matches);
	};

	return (
		<>
			{isTableVisible && (
				<div className={isMediumScreen ? "overflow-visible" : "hidden"}>
					<span className="flex text-red-700 text-3xl mt-[6%]" style={{display:'flex',justifyContent:'center'}}><b>Complaints</b></span>
					<br />
					<table className="w-full ">
						{/* Table content */}
						<colgroup>
							<col style={{ width: "10%" }} />
							{/* <col style={{ width: "15%" }} /> */}
							<col style={{ width: "14%" }} />
							<col style={{ width: "11%" }} />
							<col style={{ width: "30%" }} />
							<col style={{ width: "16%" }} />
							<col style={{ width: "19%" }} />
						</colgroup>
						<thead className="text-[#4D4D4D]">
							<tr className="bg-[#F2F2F2]">
								{/* <th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider rounded-l">
									#
								</th> */}
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider rounded-l ">
									Complaint Id
								</th>
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider rounded-l ">
									Complaint Type
								</th>
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider ">
									Status
								</th>
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider rounded-r ">
									Description
								</th>
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider ">
									Created At
								</th>
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider rounded-r ">
									Feedback
								</th>
								{/* <span className="absolute bg-[#E6E6E6] w-[calc(100%-20px)] h-[1px] bottom-0 left-[10px]"></span> */}
							</tr>
						</thead>
						<tbody className="bg-white divide-[#E6E6E6]">
							{complaints.map((elem, index) => (
								<tr className="text-sm relative" key={elem._id}>
									<th scope="row">{elem.serial}</th>
									{/* <td className="px-3 py-[10px] whitespace-wrap text-[#4D4D4D" >{elem._id}</td> */}
									<td className="px-3 py-[10px] whitespace-wrap text-[#4D4D4D " >{elem.dept}</td>
									<td className="px-3 py-[10px] whitespace-wrap align-middle gap-[6px] text-[#1A181E] z-10 ">
										{elem.state}
									</td>
									<td className="px-3 py-[10px] whitespace-wrap text-[#1A181E] ">{elem.description}</td>
									<td className="px-3 py-[10px] whitespace-wrap text-[#4D4D4D] ">{elem.createdAt}</td>
									<td className="px-3 py-[10px] whitespace-wrap text-[#4D4D4D] ">
										{elem.state == 'Closed'  && !(elem.feedback) ?
											<>
												<InputBox type={"text"} stateVariable={feedback} label={"Feedback"} onChange={(e) => setFeedback(e.target.value)} />
												<Button label={"✔︎"} onClick={()=>{
													axios.put('http://localhost:3000/v1/user/feedback', {
														complaintId: elem._id,
														feedback: feedback
													}, {
														headers: {
															Authorization: token
														}
													}).then((response)=>{
														setFeedback(response.data.feedback)
													})
												}}/>
											</>
											:
											<>{elem.feedback}</>
										}
									</td>
									{isTableVisible && (
										<span className="absolute bg-[#E6E6E6] w-[calc(100%-20px)] h-[1px] bottom-0 left-[10px]"></span>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}


export default UserTable
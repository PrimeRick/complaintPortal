import React, { useEffect, useState } from 'react'

import axios from 'axios'
import Entrycomplaint from './Entrycomplaint'

export default function Tablecomplaint() {
	const [complaints, setComplaints] = useState([]);
	const [isTableVisible, setIsTableVisible] = useState(false);
	const [isMediumScreen, setIsMediumScreen] = useState(false);
	const token = localStorage.getItem('token');

	useEffect(() => {
		// Fetch complaints data
		axios.get(`http://localhost:3000/v1/superAdmin/dashboard`, {
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
			});

		// Check initial screen size
		handleScreenSizeChange();

		// Add event listener for screen size changes
		window.addEventListener('resize', handleScreenSizeChange);

		// Cleanup function
		return () => {
			window.removeEventListener('resize', handleScreenSizeChange);
		};
	}, []);

	// Function to handle screen size changes
	const handleScreenSizeChange = () => {
		setIsMediumScreen(window.matchMedia('(min-width: 768px)').matches);
	};

	return (
		<>
		<span className="flex text-red-700 text-3xl items-center  " style={{display:'flex',justifyContent:'center'}}><b>Complaints</b></span>
		<br />
			{isTableVisible && (
				<div className={isMediumScreen ? "overflow-visible" : "hidden"}>
					<table className="w-full">
						{/* Table content */}
						<colgroup>
							<col style={{ width: "3%" }} />
							<col style={{ width: "8%" }} />
							<col style={{ width: "9%" }} />
							<col style={{ width: "11%" }} />
							<col style={{ width: "14%" }} />
							<col style={{ width: "24%" }} />
							<col style={{ width: "16%" }} />
							<col style={{ width: "15%" }} />
						</colgroup>
						<thead className="text-[#4D4D4D]">
							<tr className="bg-[#F2F2F2]">
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider rounded-l ">
									Complaint ID
								</th>
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider rounded-l">
									CPF
								</th>
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider rounded-l">
									Type
								</th>
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider">
									Status
								</th>
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider rounded-r">
									Location
								</th>
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider rounded-r">
									Description
								</th>
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider">
									Created At
								</th>
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider rounded-r">
									Feedback
								</th>
								{/* <span className="absolute bg-[#E6E6E6] w-[calc(100%-20px)] h-[1px] bottom-0 left-[10px]"></span> */}
							</tr>
						</thead>
						<tbody className="bg-white divide-[#E6E6E6]">
							{complaints.map((elem, index) => (
								<Entrycomplaint
									cpf={elem.cpf}
									status={elem.state}
									createdAt={elem.createdAt}
									description={elem.description}
									location={`${elem.phase} / ${elem.qtrNo}`}
									feedback={elem.feedback}
									complaintId={elem.serial}
									dept={elem.dept}
									isTableVisible={isTableVisible}
									key={elem.complaintId}
								/>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}
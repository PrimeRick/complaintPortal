export default function InputBox({ label, placeholder, onChange, stateVariable, type, width }) {
	return (
		<>
			{label == 'Feedback' ? 
			<>
				<div className="w-5/6" >
					<textarea rows={2} placeholder={placeholder} value={stateVariable} type={type} className="w-full px-2 py-1 border rounded border-slate-200 text-black" onChange={onChange} />
				</div>
			</> 
			:
				<div className="w-4/6">
					<div className="text-sm font-medium text-left py-2">
						{label} {<span className="text-red-600 font-semibold">*</span>}
					</div>
					<input placeholder={placeholder} value={stateVariable} type={type} className="w-full px-2 py-1 border rounded border-slate-200 text-black" onChange={onChange} />
				</div>
			}
		</>
	)
}
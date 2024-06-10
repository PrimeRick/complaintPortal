import { GrUserManager } from "react-icons/gr";
import { RiLockPasswordLine } from "react-icons/ri";


export default function InputBox({ label, placeholder, onChange, stateVariable, type, width, Icon }) {
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
					<div className="text-sm font-medium text-left py-2 flex flex-row items-center">
						{Icon == 'CPF' ?
							<GrUserManager className="mr-1.5" /> : <RiLockPasswordLine className="mr-1.5" />
						}
						{label} {<span className="text-red-600 font-semibold">*</span>}
					</div>
					<input placeholder={placeholder} value={stateVariable} type={type} className="w-full px-2 py-1 border rounded border-slate-200 text-black" onChange={onChange} />
				</div>
			}
		</>
	)
}
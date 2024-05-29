import {
	FiEdit,
	FiChevronDown,
	FiTrash,
	FiShare,
	FiPlusSquare,
} from "react-icons/fi";
import { FaRegBuilding } from "react-icons/fa";
import { MdElectricalServices } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineDryCleaning } from "react-icons/md";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
//   import { IconType } from "react-icons";

const Department = ({ type, setType }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className="p-4 pb-56 flex bg-white">
			<motion.div animate={open ? "open" : "closed"} className="relative">
				<button
					onClick={() => setOpen((pv) => !pv)}
					className="flex items-center gap-2 px-3 py-2 rounded-md text-white bg-neutral-600 hover:bg-neutral-700 transition-colors w-36">
					<span className="font-medium text-sm">{type}</span>
					<motion.span variants={iconVariants}>
						<FiChevronDown />
					</motion.span>
				</button>

				<motion.ul
					initial={wrapperVariants.closed}
					variants={wrapperVariants}
					style={{ originY: "top", translateX: "-50%" }}
					className="z-40 lex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden">
					<Option setOpen={setOpen} Icon={MdElectricalServices} setType={setType} text="Electrical" />
					<Option setOpen={setOpen} Icon={FaRegBuilding} setType={setType} text="Civil" />
					<Option setOpen={setOpen} Icon={IoFastFoodOutline} setType={setType} text="Canteen" />
					<Option setOpen={setOpen} Icon={MdOutlineDryCleaning} setType={setType} text="Housekeeping" />
				</motion.ul>
			</motion.div>
		</div>
	);
};

const Option = ({ text, Icon, setOpen, setType }) => {
	return (
		<motion.li
			variants={itemVariants}
			onClick={() => {
				setOpen(false)
				setType(text)
			}
			}
			className="z-30 flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-neutral-200 text-neutral-600 hover:text-neutral-800 transition-colors cursor-pointer">
			<motion.span variants={actionIconVariants}>
				<Icon />
			</motion.span>
			<span>{text}</span>
		</motion.li>
	);
};

export default Department;

const wrapperVariants = {
	open: {
		scaleY: 1,
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.1,
		},
	},
	closed: {
		scaleY: 0,
		transition: {
			when: "afterChildren",
			staggerChildren: 0.1,
		},
	},
};

const iconVariants = {
	open: { rotate: 180 },
	closed: { rotate: 0 },
};

const itemVariants = {
	open: {
		opacity: 1,
		y: 0,
		transition: {
			when: "beforeChildren",
		},
	},
	closed: {
		opacity: 0,
		y: -15,
		transition: {
			when: "afterChildren",
		},
	},
};

const actionIconVariants = {
	open: { scale: 1, y: 0 },
	closed: { scale: 0, y: -7 },
};
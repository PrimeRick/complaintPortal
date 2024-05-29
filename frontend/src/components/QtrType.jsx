import {
  FiEdit,
  FiChevronDown,
  FiTrash,
  FiShare,
  FiPlusSquare,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
//   import { IconType } from "react-icons";

const Location = ({qtrType, location, setQtrType}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4 pb-56 flex items-center justify-center bg-white">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-white bg-red-700 hover:bg-red-800 transition-colors"
        >
          <span className="font-medium text-sm">{qtrType}</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
        >
          {location=='Plant'?
          <>
              <Option setOpen={setOpen} Icon={FiPlusSquare} setQtrType={setQtrType} text="B-01" />
              <Option setOpen={setOpen} Icon={FiPlusSquare} setQtrType={setQtrType} text="B-02" />
              <Option setOpen={setOpen} Icon={FiPlusSquare} setQtrType={setQtrType} text="B-03" />
              <Option setOpen={setOpen} Icon={FiPlusSquare} setQtrType={setQtrType} text="B-04" />
          </>:
          <>
              <Option setOpen={setOpen} Icon={FiEdit} setQtrType={setQtrType} text="C-01" />
              <Option setOpen={setOpen} Icon={FiPlusSquare} setQtrType={setQtrType} text="C-02" /> 
          </>
          }
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ Icon, setOpen, setQtrType, text }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
            setOpen(false)
            setQtrType(text)
        }
      }
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-red-200 text-slate-700 hover:text-red-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default Location;

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
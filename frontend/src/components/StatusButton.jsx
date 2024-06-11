import {
    FiEdit,
    FiChevronDown,
    FiTrash,
    FiShare,
    FiPlusSquare,
  } from "react-icons/fi";
import { motion } from "framer-motion";
import { MdOutlinePendingActions } from "react-icons/md";
import { VscServerProcess } from "react-icons/vsc";
import { TiThumbsUp, TiThumbsDown } from "react-icons/ti";
import { Dispatch, SetStateAction, useState } from "react";
import classNames from 'classnames';
  
  const StaggeredDropDown = ({type, setType}) => {
    const [open, setOpen] = useState(false);
  
    return (
        <motion.div animate={open ? "open" : "closed"} className="relative">
          <button
            onClick={() => setOpen((pv) => !pv)}
            className="z-20 flex items-center gap-2 px-3 py-2 w-36 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-500 transition-colors"
          >
            <span className="font-medium text-sm">{type}</span>
            <motion.span variants={iconVariants}>
              <FiChevronDown />
            </motion.span>
          </button>
  
          <motion.ul
            initial={wrapperVariants.closed}
            variants={wrapperVariants}
            style={{ originY: "top", translateX: "-50%" }}
            className="z-30 flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
          >
                <Option setOpen={setOpen} Icon={MdOutlinePendingActions} setType={setType} color="slate" text="Open" />
                <Option setOpen={setOpen} Icon={VscServerProcess} setType={setType} color="sky" text="In Progress" />
                <Option setOpen={setOpen} Icon={TiThumbsUp} setType={setType} color="emerald" text="Closed" />
                <Option setOpen={setOpen} Icon={TiThumbsDown} setType={setType} color="rose" text="Undetermined" />
          </motion.ul>
        </motion.div>
    );
  };
  
  const Option = ({ text, setType, Icon, setOpen, color }) => {
    return (
      <motion.li
        variants={itemVariants}
        onClick={() => {
            setOpen(false)
            setType(text);
        }}
        className={classNames(
            'flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md transition-colors cursor-pointer',
            {
                'hover:bg-sky-200 text-sky-600 hover:text-sky-800': color === 'sky',
                'hover:bg-slate-300 text-slate-600 hover:text-slate-800': color === 'slate',
                'hover:bg-emerald-200 text-emerald-600 hover:text-emerald-800': color === 'emerald',
                'hover:bg-rose-200 text-rose-600 hover:text-rose-800': color === 'rose',
            }
        )}
      >
        <motion.span variants={actionIconVariants}>
          <Icon />
        </motion.span>
        <span>{text}</span>
      </motion.li>
    );
  };
  
  export default StaggeredDropDown;
  
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
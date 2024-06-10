import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { MdOutlinePendingActions } from "react-icons/md";
import { VscServerProcess } from "react-icons/vsc";
import { TiThumbsUp, TiThumbsDown } from "react-icons/ti";
import { motion } from 'framer-motion';
import classNames from 'classnames';

const StatusButton = ({ type, setType }) => {
    const [open, setOpen] = useState(false);

    // Determine button color based on the current type
    const buttonColor = classNames({
        'bg-slate-700 hover:bg-slate-800': type === 'Open',
        'bg-sky-700 hover:bg-sky-800': type === 'InProgress',
        'bg-emerald-700 hover:bg-emerald-800': type === 'Closed',
        'bg-rose-700 hover:bg-rose-800': type === 'Undetermined',
    });

    // Default button color if type is not recognized
    const defaultButtonColor = 'bg-gray-500 hover:bg-gray-600';
    console.log(type);

    return (
        <motion.div animate={open ? 'open' : 'closed'} className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className={`z-20 flex items-center gap-2 px-3 py-2 rounded-md text-white transition-colors w-36 ${buttonColor || defaultButtonColor}`}
            >
                <span className="font-medium text-sm">{type}</span>
                <motion.span variants={iconVariants}>
                    <FiChevronDown />
                </motion.span>
            </button>

            <motion.ul
                initial={wrapperVariants.closed}
                animate={open ? 'open' : 'closed'}
                variants={wrapperVariants}
                style={{ originY: 'top', translateX: '-50%' }}
                className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-56 overflow-hidden z-30"
            >
                <Option setOpen={setOpen} Icon={MdOutlinePendingActions} setType={setType} color="slate" text="Open" sukuna="Open" />
                <Option setOpen={setOpen} Icon={VscServerProcess} setType={setType} color="sky" text="InProgress" sukuna="InProgress" />
                <Option setOpen={setOpen} Icon={TiThumbsUp} setType={setType} color="emerald" text="Closed" sukuna="Closed" />
                <Option setOpen={setOpen} Icon={TiThumbsDown} setType={setType} color="rose" text="Undetermined" sukuna="Undetermined" />
            </motion.ul>
        </motion.div>
    );
};

const Option = ({ text, Icon, setOpen, setType, color, sukuna }) => {
    return (
        <motion.li
            variants={itemVariants}
            onClick={() => {
                setOpen(false);
                setType(sukuna);
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

export default StatusButton;

const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: 'afterChildren',
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
            when: 'beforeChildren',
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: 'afterChildren',
        },
    },
};

const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
};

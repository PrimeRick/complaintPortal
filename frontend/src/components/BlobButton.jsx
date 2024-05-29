import React from 'react';

export default function BlobButton({ label, onClick }) {
    return (
        <a
            onClick={onClick}
            className="relative inline-block text-lg group cursor-pointer"
        >
            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight transition-colors duration-300 ease-out border-2 border-red-700 rounded-lg text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-red-700"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-white group-hover:-rotate-180 ease"></span>
                <span className="relative z-20 group-hover:text-red-700">{label}</span>
            </span>
            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-red-700 rounded-lg group-hover:mb-0 group-hover:mr-0"></span>
        </a>
    );
}
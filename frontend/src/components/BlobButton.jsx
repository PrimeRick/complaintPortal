import React from 'react';

export default function BlobButton({ label, onClick }) {
    return (
        <a onClick={onClick} class="cursor-pointer relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-red-700 border-2 border-red-700 rounded-full hover:text-white group hover:bg-gray-50 w-40 h-14">
            <span class="absolute left-0 block w-full h-0 transition-all bg-red-700 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span class="relative">{label}</span>
        </a>
    );
}

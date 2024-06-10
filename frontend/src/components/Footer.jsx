import React from 'react';

export default function Footer() {
  return (
    <footer
      className="bg-red-300 text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 lg:text-left">
      <div className="bg-gray-950 p-6 text-center">
        <span>© 2023 Copyright : </span>
        <a
          className="font-semibold text-neutral-600 dark:text-neutral-400"
          href="https://tw-elements.com/"
        >ONGC Hazira Plant</a>
      </div>
    </footer>
  );
}
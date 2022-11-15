import React from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';

const Header = () => {
  return (
    <header className="sticky top-0 border-b bg-white/40 backdrop-blur-md">
      <div className="flex flex-row justify-between max-w-4xl p-4 mx-auto">
        <button className="p-1 rounded-lg hover:bg-gray-200">
          <span>
            <AiOutlineMenu size="2rem" />
          </span>
        </button>
        <h1 className="text-2xl font-bold cursor-pointer select-none">
          <Link href={'/'}>Notion Blog</Link>
        </h1>
        <button className="p-1 rounded-lg hover:bg-gray-200">
          <span>
            <AiOutlineSearch size="2rem" />
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;

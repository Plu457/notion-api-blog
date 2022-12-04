import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import HeaderMenu from './HeaderMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 border-b bg-white/40 backdrop-blur-md">
        <div className="flex flex-row justify-between max-w-4xl p-4 mx-auto">
          <button
            className="p-1 rounded-lg hover:bg-gray-200"
            onClick={() => setIsMenuOpen(true)}
          >
            <span>
              <AiOutlineMenu size="2rem" />
            </span>
          </button>
          <h1 className="text-2xl font-bold cursor-pointer select-none">
            <Link href="/">Notion Blog</Link>
          </h1>
          <button className="p-1 rounded-lg hover:bg-gray-200">
            <span>
              <AiOutlineSearch size="2rem" />
            </span>
          </button>
        </div>
      </header>
      <HeaderMenu isMenuOpen={isMenuOpen} />
    </>
  );
};

export default Header;

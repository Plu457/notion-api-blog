import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import HeaderMenu from './HeaderMenu';
import OverlayCurtain from './OverlayCurtain';
import { useRouter } from 'next/router';

const Header = () => {
  const { pathname } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

    document.body.className = isMenuOpen ? 'isMenuOpen' : '';
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-20 bg-white/40 backdrop-blur-md">
        <div className="flex flex-row justify-between max-w-4xl p-4 mx-auto">
          <button className="p-1 rounded-lg hover:bg-gray-200" onClick={() => setIsMenuOpen(true)}>
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
      {isMenuOpen ? <OverlayCurtain onClick={() => setIsMenuOpen(false)} /> : null}
    </>
  );
};

export default Header;

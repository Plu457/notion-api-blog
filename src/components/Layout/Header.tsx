import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Constant } from '@/commons';
import { useRouter } from 'next/router';
import { AiOutlineSearch } from 'react-icons/ai';

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
        <div className="flex max-w-5xl mx-auto w-full h-16">
          <div className="flex grow gap-5 h-full">
            <h1 className="py-3 text-2xl font-bold cursor-pointer select-none">
              <Link href="/">Plu457.dev</Link>
            </h1>

            <ul className="flex gap-3 justify-between items-center">
              {Constant.NavItemList.map(({ id, name, path }) => (
                <li key={id} className="py-5 hover:border-b border-b-blue-500">
                  <Link href={path}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grow-1">
            <button className="py-4 hover:text-blue-500">
              <Link href={'/search'}>
                <span>
                  <AiOutlineSearch size="2rem" />
                </span>
              </Link>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

//* 더보기 버튼
{
  /* <button className="p-1 rounded-lg hover:bg-gray-200" onClick={() => setIsMenuOpen(true)}>
  <span>
    <AiOutlineMenu size="2rem" />
  </span>
</button>; */
}

{
  /* <HeaderMenu isMenuOpen={isMenuOpen} />;
{
  isMenuOpen ? <OverlayCurtain onClick={() => setIsMenuOpen(false)} /> : null;
} */
}

import Link from 'next/link';
import { useRouter } from 'next/router';

import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { Constant } from '@/commons';
import { useMenuOpen } from '@/hooks';
import HeaderMenu from './HeaderMenu';
import OverlayCurtain from './OverlayCurtain';

const renderNavigationItems = (pathname: string) => {
  return Constant.NAV_ITEM_LIST.map(({ id, name, path }) => {
    const isActive = pathname === path;
    const borderBottomClasses = isActive ? 'text-blue-500' : '';

    return (
      <li
        key={id}
        className={`py-5 ${borderBottomClasses} hover:border-b hover:text-blue-500 border-blue-500`}
      >
        <Link href={path}>{name}</Link>
      </li>
    );
  });
};

const Header = () => {
  const { pathname } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-20 bg-white/40 backdrop-blur-md">
        <div className="flex max-w-6xl mx-auto w-full h-16">
          <div className="flex grow gap-5 h-full">
            <h1 className="py-3 px-5 text-2xl font-bold cursor-pointer select-none">
              <Link href="/">Plu457.dev</Link>
            </h1>

            <ul className="hidden md:flex gap-6 justify-between items-center">
              {renderNavigationItems(pathname)}
            </ul>
          </div>

          <div className="flex gap-4 items-center">
            <button className="py-4 hover:text-blue-500">
              <Link href={'/search'}>
                <span>
                  <AiOutlineSearch size="2rem" />
                </span>
              </Link>
            </button>
            <button
              className="p-1 rounded-lg hover:bg-gray-200 md:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              <span>
                <AiOutlineMenu size="2rem" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <HeaderMenu isMenuOpen={isMenuOpen} />
      {isMenuOpen ? <OverlayCurtain onClick={() => setIsMenuOpen(false)} /> : null}
    </>
  );
};

export default Header;

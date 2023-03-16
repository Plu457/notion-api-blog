import Link from 'next/link';
import { useRouter } from 'next/router';

import { AiOutlineSearch } from 'react-icons/ai';
import { Constant } from '@/commons';
import { useMenuOpen } from '@/hooks';

const renderNavigationItems = (pathname: string) => {
  return Constant.NavItemList.map(({ id, name, path }) => {
    const isActive = pathname === path;
    const borderBottomClasses = isActive ? 'border-b border-blue-500' : '';

    return (
      <li key={id} className={`py-5 ${borderBottomClasses} hover:border-b hover:border-blue-500`}>
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
        <div className="flex max-w-5xl mx-auto w-full h-16">
          <div className="flex grow gap-5 h-full">
            <h1 className="py-3 text-2xl font-bold cursor-pointer select-none">
              <Link href="/">Plu457.dev</Link>
            </h1>

            <ul className="flex gap-3 justify-between items-center">
              {renderNavigationItems(pathname)}
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

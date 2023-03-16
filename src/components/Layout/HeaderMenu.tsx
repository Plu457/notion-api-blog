import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Images } from '@/commons';
import { AiOutlineHome, AiOutlineSearch, AiOutlineTags, AiOutlineUser } from 'react-icons/ai';

const NavTable = {
  '/': {
    name: 'Home',
    icon: <AiOutlineHome />,
  },
  '/tags': {
    name: 'Tags',
    icon: <AiOutlineTags />,
  },
  '/search': {
    name: 'Search',
    icon: <AiOutlineSearch />,
  },
  '/profile': {
    name: 'Profile',
    icon: <AiOutlineUser />,
  },
};

interface HeaderMenuProps {
  isMenuOpen: boolean;
}

const HeaderMenu = ({ isMenuOpen }: HeaderMenuProps) => {
  const { asPath } = useRouter();

  const getMenuItemClass = (href: string) => {
    const isActive = asPath === href;
    const baseClass = 'text-xl px-8 py-6 cursor-pointer flex flex-row items-center gap-2';

    return `${baseClass} ${
      isActive ? 'text-black bg-gray-100' : 'text-gray-500 hover:text-black hover:bg-gray-100'
    }`;
  };

  return (
    <aside
      className={`z-50 fixed top-0 bottom-0 w-3/5 max-w-sm bg-white transition-all duration-500 ${
        isMenuOpen ? 'left-0' : '-left-[60%]'
      }`}
    >
      <div className="flex flex-col h-full py-8">
        <div className="relative w-full mx-auto h-1/4">
          <Image src={Images.PROFILE} alt="Profile Image" objectFit="contain" layout="fill" />
        </div>
        <h1 className="text-2xl font-bold text-center">
          <Link href="/profile">
            <a>Kim Da Hyun</a>
          </Link>
        </h1>

        <ul className="flex flex-col mt-8">
          {Object.entries(NavTable).map(([href, value]) => (
            <li key={href} className={getMenuItemClass(href)}>
              <Link href={href}>
                <a>
                  <span>{value.icon}</span>
                  {value.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default HeaderMenu;

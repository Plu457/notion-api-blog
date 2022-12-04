import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  AiOutlineHome,
  AiOutlineTags,
  AiOutlineSearch,
  AiOutlineUser,
} from 'react-icons/ai';
import profile from 'public/image/profile.png';

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

  return (
    <aside
      className={`fixed top-0 bottom-0 w-3/5 max-w-sm bg-white border-r transition-all duration-500 ${
        isMenuOpen ? 'left-0' : '-left-[60%]'
      }`}
    >
      <div className="flex flex-col h-full py-8">
        <div className="relative w-full h-1/3">
          <Image
            src={profile}
            alt="Profile Image"
            objectFit="contain"
            layout="fill"
          />
        </div>
        <h1 className="text-2xl font-bold text-center">
          <Link href="/profile">
            <a>Kim Da Hyun</a>
          </Link>
        </h1>

        <ul className="flex flex-col mt-8">
          {Object.entries(NavTable).map(([href, value]) => (
            <li
              key={href}
              className={`text-2xl text-black/70 hover:text-black hover:bg-gray-100 ${
                asPath === href && 'text-black bg-gray-100'
              }`}
            >
              <Link href={href}>
                <a className="flex flex-row items-center gap-2 p-4">
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

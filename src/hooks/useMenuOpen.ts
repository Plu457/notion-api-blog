import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type UseMenuOpenReturnType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

const useMenuOpen = (initialState: boolean = false): UseMenuOpenReturnType => {
  const [isMenuOpen, setIsMenuOpen] = useState(initialState);
  const { pathname } = useRouter();

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

    document.body.className = isMenuOpen ? 'isMenuOpen' : '';
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return [isMenuOpen, setIsMenuOpen];
};

export default useMenuOpen;

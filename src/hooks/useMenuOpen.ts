import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type UseMenuOpenReturnType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

const useMenuOpen = (initialState: boolean = false): UseMenuOpenReturnType => {
  const [isMenuOpen, setIsMenuOpen] = useState(initialState);
  const { pathname } = useRouter();

  const calculateScrollbarWidth = () => {
    if (typeof window !== 'undefined') {
      const scrollbarWidth = window.innerWidth - document.body.clientWidth;
      document.body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      calculateScrollbarWidth();
      document.body.className = 'isMenuOpen';
    } else {
      document.body.className = '';
    }

    return () => {
      document.body.className = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return [isMenuOpen, setIsMenuOpen];
};

export default useMenuOpen;

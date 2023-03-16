import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useMenuOpen = (initialState = false) => {
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

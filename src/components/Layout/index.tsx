import React, { PropsWithChildren } from 'react';
import Footer from './Footer';
import Header from './Header';
import ToTopButton from './ToTopButton';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <hr />
      <main>{children}</main>
      <Footer />
      <ToTopButton />
    </>
  );
};

export default Layout;

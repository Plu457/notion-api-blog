import React from 'react';

const HeroSection = () => {
  return (
    <section>
      <div className="flex bg-[length:100%_55%] bg-no-repeat items-center justify-center px-4 py-16 md:py-32 bg-gradient-to-r from-purple-500 to-blue-500">
        <div className="p-8 text-center bg-white shadow-lg rounded-xl">
          <h1 className="mb-2 text-4xl font-black">Notion Devlog</h1>
          <p>Notion Devlog is a blog template built with Next.js and Notion API</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

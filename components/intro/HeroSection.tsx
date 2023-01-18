import React from 'react';

interface HeroSectionProps {
  title?: string;
  description?: string;
}

const HeroSection = ({
  title = 'Notion Devlog',
  description = 'Notion Devlog is a blog template built with Next.js and Notion API',
}: HeroSectionProps) => {
  return (
    <section>
      <div className="flex bg-[length:100%_55%] bg-no-repeat items-center justify-center px-4 py-16 md:py-32 bg-gradient-to-r from-purple-500 to-blue-500">
        <div className="p-8 text-center bg-white shadow-lg md:p-16 rounded-xl">
          <h1 className="pb-2 mb-2 text-5xl font-black text-transparent bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text">
            {title}
          </h1>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

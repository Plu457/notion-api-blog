interface HeroContentProps {
  title?: string;
  description?: string;
}

const HeroContent = ({
  title = "plu457's blog",
  description = '주니어 개발자의 성장 일기',
}: HeroContentProps) => {
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

export default HeroContent;

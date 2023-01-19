import { SlArrowUp } from 'react-icons/sl';

const ToTopButton = () => {
  return (
    <button
      className="fixed p-4 bottom-8 right-8 hover:bg-gray-100"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <SlArrowUp size={'2rem'} />
    </button>
  );
};

export default ToTopButton;

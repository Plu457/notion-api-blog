import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const LodingSpinner = () => {
  return (
    <span className="animate-spin">
      <AiOutlineLoading3Quarters size={'4rem'} />
    </span>
  );
};

export default LodingSpinner;

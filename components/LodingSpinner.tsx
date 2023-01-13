import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

const LodingSpinner = () => {
  return (
    <span className="animate-spin">
      <AiOutlineLoading size={'4rem'} />
    </span>
  );
};

export default LodingSpinner;

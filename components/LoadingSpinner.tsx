import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

const LoadingSpinner = () => {
  return (
    <span className="animate-spin">
      <AiOutlineLoading size={'4rem'} />
    </span>
  );
};

export default LoadingSpinner;

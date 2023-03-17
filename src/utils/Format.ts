const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + '...';
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  truncateText,
};

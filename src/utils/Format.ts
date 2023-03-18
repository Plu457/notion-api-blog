import { ExtendedRecordMap } from 'notion-types';

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + '...';
};

const getPageProperty = (recordMap: ExtendedRecordMap, propertyName: string): string | null => {
  const pageBlock = Object.values(recordMap.block).find(block => block.value.type === 'page');

  if (!pageBlock) return null;

  const property = pageBlock.value.properties?.[propertyName];

  if (property) {
    return property.map(([textFragment]: any) => textFragment).join('');
  }

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  truncateText,
  getPageProperty,
};

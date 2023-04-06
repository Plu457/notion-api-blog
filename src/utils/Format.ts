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

interface FormatRecordMapImageSizeParams {
  recordMap: ExtendedRecordMap;
  width: number;
  height: number;
  format: 'jpg' | 'webp';
}

const formatRecordMapImageSize = ({
  recordMap,
  width,
  height,
  format,
}: FormatRecordMapImageSizeParams): ExtendedRecordMap => {
  const pageBlock = Object.values(recordMap.block).find(({ value }) => value.type === 'page');

  if (pageBlock && pageBlock.value.format && pageBlock.value.format.page_cover) {
    const originalImageUrl = pageBlock.value.format.page_cover;
    const imageUrlWithNewSize =
      originalImageUrl + getParametersForUnsplash({ width, height, format });
    pageBlock.value.format.page_cover = imageUrlWithNewSize;
  }

  return recordMap;
};

interface UnsplashParameters {
  width: number;
  height: number;
  format: 'jpg' | 'webp';
}
const getParametersForUnsplash = ({ width, height, format }: UnsplashParameters) => {
  return `&w=${width}&h=${height}&fm=${format}`;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  truncateText,
  getPageProperty,
  formatRecordMapImageSize,
  getParametersForUnsplash,
};

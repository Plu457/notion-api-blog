import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { defaultMapImageUrl, NotionRenderer } from 'react-notion-x';

import TagItem from '../Tags/TagItem';
import { ExtendedRecordMap } from 'notion-types';

const Code = dynamic(() => import('react-notion-x/build/third-party/code').then(m => m.Code), {
  ssr: false,
});
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(m => m.Collection),
);
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then(m => m.Equation),
);
const Pdf = dynamic(() => import('react-notion-x/build/third-party/pdf').then(m => m.Pdf), {
  ssr: false,
});
const Modal = dynamic(() => import('react-notion-x/build/third-party/modal').then(m => m.Modal), {
  ssr: false,
});

interface NotionPageRendererProps {
  recordMap: ExtendedRecordMap;
}

const NotionPageRenderer = ({ recordMap }: NotionPageRendererProps) => {
  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      disableHeader={true}
      showTableOfContents={true}
      previewImages={!!recordMap?.preview_images}
      mapImageUrl={(url, block) => defaultMapImageUrl(url, block) ?? url}
      components={{
        Code,
        Collection,
        Equation,
        Pdf,
        Modal,
        nextImage: Image,
        nextLink: Link,
        propertyDateValue: dateProperty => dateProperty.data[0][1][0][1].start_date,
        propertySelectValue: ({ option }) =>
          option ? (
            <TagItem key={option.id} isReadOnly color={option.color} name={option.value} />
          ) : null,
      }}
    />
  );
};

export default NotionPageRenderer;

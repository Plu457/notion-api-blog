import Giscus from '@giscus/react';
import { ExtendedRecordMap } from 'notion-types';

import { NotionPageRenderer } from '@/components';

interface IAlgorithmDetailView {
  recordMap: ExtendedRecordMap;
}

const AlgorithmDetailView = ({ recordMap }: IAlgorithmDetailView) => {
  return (
    <section>
      <NotionPageRenderer recordMap={recordMap} />
      <div className="max-w-4xl mx-auto my-8">
        <Giscus
          id="comments"
          term="blog"
          repo="Plu457/notion-api-blog"
          repoId="R_kgDOITdSYA"
          category="General"
          categoryId="DIC_kwDOITdSYM4CTrlu"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light"
          lang="ko"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default AlgorithmDetailView;

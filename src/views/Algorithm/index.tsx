import { useRecoilValue } from 'recoil';
import { postDataState, postTotalState, tagState } from '@/recoil/post';

import { Article, ArticleList, Pagination, TagItem, TagList } from '@/components';

const AlgorithmView = () => {
  const postTotal = useRecoilValue(postTotalState);
  const postData = useRecoilValue(postDataState);
  const tagList = useRecoilValue(tagState);

  return (
    <section className="flex flex-col m-4 min-h-[60vh] max-w-6xl mx-auto px-4 gap-8 ">
      <header className="mt-16 py-4">
        <h2
          className={`relative mb-8 text-6xl font-bold postTotal`}
          data-post-total={`${postTotal}`}
        >
          Devlog
        </h2>
        <TagList
          tagList={tagList}
          renderTagItem={({ id, name }) => <TagItem key={id} name={name} />}
        />
      </header>

      <main>
        <ArticleList
          data={postData}
          renderArticle={item => <Article key={item.id} data={item} />}
        />
        <div className="flex justify-center my-4">
          <Pagination />
        </div>
      </main>
    </section>
  );
};

export default AlgorithmView;

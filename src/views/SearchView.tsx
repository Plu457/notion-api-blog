import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import { Article, ArticleList, LoadingSpinner } from '@/components';
import { IArticle } from '@/types/article';

interface Props {
  searchQuery: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  postData: IArticle[];
  isLoading: boolean;
  onSubmit: (e: ChangeEvent<HTMLFormElement>) => void;
}

const SearchView = ({
  searchQuery,
  inputValue,
  setInputValue,
  postData,
  isLoading,
  onSubmit,
}: Props) => {
  return (
    <section className="min-h-screen">
      <div className="px-4 py-24 bg-gradient-to-r from-purple-500 to-blue-500">
        <form className="relative max-w-3xl mx-auto" onSubmit={onSubmit}>
          <input
            className="w-full p-4 text-xl rounded-md outline-none"
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <button
            className="absolute right-0 p-4 text-gray-500 -translate-y-1/2 hover:text-black top-1/2"
            type="submit"
          >
            <AiOutlineSearch size={'1.5rem'} />
          </button>
        </form>
      </div>

      <div>
        <div className="max-w-5xl p-8 mx-auto">
          {isLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <ArticleList
              data={postData}
              renderArticle={item => <Article key={item.id} data={item} />}
            />
          )}
          {!isLoading && postData.length === 0 && searchQuery.length ? (
            <div className="text-center">No Results Found</div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default SearchView;

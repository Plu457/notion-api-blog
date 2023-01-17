import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SearchResultType } from './api/getSearchResult';

import { AiOutlineSearch } from 'react-icons/ai';
import { CardData } from 'types';
import CardList from 'components/card/CardList';
import LoadingSpinner from 'components/LoadingSpinner';

const SearchPage = () => {
  const { push, query } = useRouter();
  const searchQuery = query.q?.toString() ?? '';

  const [inputValue, setInputValue] = useState('');
  const [postData, setPostData] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    push({
      query: {
        q: inputValue,
      },
    });
  };

  useEffect(() => {
    const fetchSearchItems = async () => {
      if (!searchQuery) return;

      setIsLoading(true);

      const res = await fetch(`/api/getSearchResult?q=${searchQuery}`);
      const { data }: SearchResultType = await res.json();

      setPostData(data);

      setIsLoading(false);
    };

    setPostData([]);
    fetchSearchItems();
    setInputValue(searchQuery);
  }, [searchQuery]);

  return (
    <section className="min-h-screen">
      <div className="px-4 py-24 bg-gradient-to-r from-purple-500 to-blue-500">
        <form className="relative max-w-3xl mx-auto" onSubmit={onSubmit}>
          <input
            className="w-full p-4 text-xl rounded-lg outline-none"
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
            <CardList data={postData} />
          )}
          {!isLoading && postData.length === 0 ? (
            <div className="text-center">No result found</div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;

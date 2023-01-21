import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { SearchResultType } from './api/getSearchResult';

import CardList from 'components/card/CardList';
import HeadMeta from 'components/HeadMeta';
import LoadingSpinner from 'components/LoadingSpinner';
import { AiOutlineSearch } from 'react-icons/ai';
import { CardData } from 'types/CardData';
import SearchView from 'views/SearchView';

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
    <>
      <HeadMeta
        title={searchQuery ? `${searchQuery}에 대한 검색 결과` : ''}
        description={
          searchQuery ? `${searchQuery}에 대한  ${postData.length}개의 검색 결과가 있습니다.` : ''
        }
      />
      <SearchView
        searchQuery={searchQuery}
        inputValue={inputValue}
        setInputValue={setInputValue}
        postData={postData}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default SearchPage;

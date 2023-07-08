import { Constant } from '@/commons';
import { useBlogNavigation } from '@/hooks';
import { currentPageState, postTotalState } from '@/recoil/post';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';

const Pagination = () => {
  const current = useRecoilValue(currentPageState);
  const total = useRecoilValue(postTotalState);
  const { navigateTo } = useBlogNavigation();

  const lastPageNumber = Math.ceil(total / Constant.POSTS_PER_PAGE);

  //* 페이지 변경 처리하는 함수
  const handleClick = useCallback(
    (page: number) => {
      navigateTo?.({ page });
    },
    [navigateTo],
  );

  //* 페이지네이션 버튼들을 생성하는 함수
  const renderPaginationButtons = () =>
    //* 지정된 범위 내의 페이지 버튼을 생성하기 위해 배열을 생성
    Array.from(
      { length: Constant.PAGINATION_RANGE * 2 + 1 },
      (_, index) => current + index - Constant.PAGINATION_RANGE,
    )
      //* 유효한 페이지만 필터링 (조건: 1 이상, 마지막 페이지 이하)
      .filter(pageIndex => pageIndex > 0 && pageIndex <= lastPageNumber)
      //* 필터링된 페이지 인덱스를 사용하여 PaginationButton 컴포넌트 생성
      .map(pageIndex => (
        <PaginationButton
          key={pageIndex}
          to={pageIndex}
          onClick={handleClick}
          label={pageIndex.toString()}
          disabled={pageIndex === current}
        />
      ));

  return (
    <div className="flex gap-1">
      <PaginationButton
        to={current - 1}
        disabled={current === 1}
        onClick={handleClick}
        label="&lt;"
      />

      {renderPaginationButtons()}

      <PaginationButton
        to={current + 1}
        disabled={current === lastPageNumber}
        onClick={handleClick}
        label="&gt;"
      />
    </div>
  );
};

export default Pagination;

interface PaginationButtonProps {
  label: string;
  disabled?: boolean;
  to: number;
  onClick?: (page: number) => void;
}

const PaginationButton = ({ label, to, disabled = false, onClick }: PaginationButtonProps) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(to);
    }
  }, [to, onClick]);

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`px-4 py-2 rounded-lg ${
        disabled ? 'bg-gray-100' : 'hover:bg-gray-100'
      } disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-white`}
    >
      {label}
    </button>
  );
};

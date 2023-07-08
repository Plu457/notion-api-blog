// eslint-disable-next-line import/no-anonymous-default-export
export default {
  IMAGE_LOADING_INDICATOR:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=',

  //* 페이지네이션 사용
  POSTS_PER_PAGE: 9,
  PAGINATION_RANGE: 2,

  //* HeadMeta 사용
  DEFAULT_TITLE: "plu457's blog",
  DEFAULT_DESCRIPTION: '주니어 개발자의 성장 일기',
  DEFAULT_OG_IMAGE_SRC: '/api/og',

  //* Navbar 사용
  NAV_ITEM_LIST: [
    {
      id: 'devLog',
      name: 'Devlog',
      title: '개발 관련 게시물이 존재합니다.',
      path: '/blog',
    },
    {
      id: 'algorithm',
      name: 'Algorithm',
      title: '알고리즘 풀이 게시물이 존재합니다.',
      path: '/algorithm',
    },
    {
      id: 'aboutMe',
      name: 'About',
      title: '저를 소개하는 페이지 입니다.',
      path: '/profile',
    },
  ],
};

import React from 'react';

import { CardData } from 'types';

import CardItem from './CardItem';

interface CardListProps {
  data: CardData[];
}

const CardList = ({ data }: CardListProps) => {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item, idx) => (
        <CardItem key={item.id + idx} data={item} />
      ))}
    </ul>
  );
};

export default CardList;

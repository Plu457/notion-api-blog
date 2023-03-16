import CardItem from './CardItem';
import { CardListProps } from './CardTypes';

const CardList = ({ data }: CardListProps) => {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map(item => (
        <CardItem key={item.id} data={item} />
      ))}
    </ul>
  );
};

export default CardList;

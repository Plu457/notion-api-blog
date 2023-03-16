import { motion } from 'framer-motion';
import CardItem from './CardItem';
import { CardListProps } from './CardTypes';

const CardList = ({ data }: CardListProps) => {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item, i) => (
        <motion.li
          key={item.id}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
          viewport={{ once: true }}
        >
          <CardItem key={item.id} data={item} />
        </motion.li>
      ))}
    </ul>
  );
};

export default CardList;

import { IArticle } from '@/types/article';
import { motion } from 'framer-motion';

interface IArticleList {
  data: IArticle[];
  renderArticle: (item: IArticle) => JSX.Element;
}

const ArticleList = ({ data, renderArticle }: IArticleList) => {
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
          {renderArticle(item)}
        </motion.li>
      ))}
    </ul>
  );
};

export default ArticleList;

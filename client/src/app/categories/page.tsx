import { type Metadata } from 'next';
import CategoryCard from './features/CategoryCard';

export const metadata: Metadata = {
  title: '카테고리',
};

const CategoriesPage = () => {
  return (
    <div>
      <CategoryCard></CategoryCard>
    </div>
  );
};

export default CategoriesPage;

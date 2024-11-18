import { type PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const CategoryCard = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default CategoryCard;

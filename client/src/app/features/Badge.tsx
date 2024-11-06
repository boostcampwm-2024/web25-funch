const Badge = ({ category }: BadgeProps) => {
  return <span className="bg-surface-neutral-weak funch-bold12 h-3 w-20 rounded-md px-[6px] py-1">{category}</span>;
};

export default Badge;

type BadgeProps = {
  category: string;
};

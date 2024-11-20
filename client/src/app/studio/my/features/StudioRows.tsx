import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  labelName: string;
  isFlex?: boolean;
};

const StudioRows = ({ children, labelName, isFlex = false }: Props) => {
  return (
    <div className="grid grid-cols-11">
      <div className="col-span-3">
        <label className="funch-bold16">{labelName}</label>
      </div>
      <div
        className={clsx('col-span-8', {
          'flex gap-4': isFlex,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default StudioRows;

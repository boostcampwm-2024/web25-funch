import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

const ROWS_COMPONENT_TYPE = {
  DEFAULT: 'DEFAULT' as const,
  TAG: 'TAG' as const,
};

type RowsComponentType = keyof typeof ROWS_COMPONENT_TYPE;

type Props = {
  children: React.ReactNode;
  labelName: string;
  componentType?: RowsComponentType;
};

const StudioRows = ({ children, labelName, componentType = 'DEFAULT' }: Props) => {
  return (
    <div className="grid grid-cols-11">
      <div className="col-span-3">
        <label className="funch-bold16">{labelName}</label>
      </div>
      <div
        className={clsx('col-span-8', {
          'flex gap-4': componentType === ROWS_COMPONENT_TYPE.TAG,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default StudioRows;

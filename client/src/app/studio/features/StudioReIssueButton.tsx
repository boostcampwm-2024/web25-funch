import { PropsWithChildren } from 'react';
import { type ButtonHTMLAttributes } from 'react';

type Props = PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>;

const StudioReissueButton = ({ children, ...rest }: Props) => {
  return (
    <button
      className="bg-surface-brand-strong text-content-static-white funch-bold14 h-[2.4rem] w-[4.5rem] rounded-md hover:opacity-90"
      {...rest}
    >
      {children}
    </button>
  );
};
export default StudioReissueButton;

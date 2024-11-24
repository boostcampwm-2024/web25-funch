import { PropsWithChildren } from 'react';
import { type ButtonHTMLAttributes } from 'react';

type Props = PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>;

const StudioCopyButton = ({ children, ...rest }: Props) => {
  return (
    <button
      className="bg-surface-brand-weak text-content-brand-base funch-bold14 h-[38px] w-[72px] rounded-md hover:opacity-90"
      {...rest}
    >
      {children}
    </button>
  );
};
export default StudioCopyButton;

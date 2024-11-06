import { type PropsWithChildren } from 'react';

const Badge = ({ children }: PropsWithChildren) => {
  return (
    <span className="bg-surface-neutral-weak text-content-neutral-strong funch-bold12 cursor-default rounded-md px-1.5 py-1">
      {children}
    </span>
  );
};

export default Badge;

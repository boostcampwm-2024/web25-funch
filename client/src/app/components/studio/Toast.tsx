'use client';

import GlobalPortal from '@app/GlobalPortal';
import clsx from 'clsx';
import { useEffect, useState, type PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  close: () => void;
  open: boolean;
}>;

const Toast = ({ children, close, open }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);

      const timeout = setTimeout(() => {
        setVisible(false);
        setTimeout(close, 700);
      }, 1500);

      return () => clearTimeout(timeout);
    } else {
      setVisible(false);
    }
  }, [open, close]);

  return (
    <GlobalPortal.Consumer>
      <div
        aria-modal="true"
        role="dialog"
        className={clsx('fixed left-0 top-0 z-[9999] h-full w-full', 'transition-opacity duration-700 ease-in-out')}
        onClick={close}
      >
        <div
          role="document"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className={clsx(
            'min-w-64 max-w-72 px-6 py-4',
            'fixed bottom-8 left-1/2 z-50 -translate-x-1/2',
            'bg-surface-neutral-inverse flex justify-center rounded-lg',
            'funch-medium12 text-content-neutral-inverse',
            'transition-all duration-700 ease-in-out',
            {
              'opacity-0': !visible,
              'opacity-100': visible,
            },
          )}
        >
          {children}
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
};

export default Toast;

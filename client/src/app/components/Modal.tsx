import GlobalPortal from '@app/GlobalPortal';
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  close: () => void;
}>;

const Modal = ({ children, close }: Props) => {
  return (
    <GlobalPortal.Consumer>
      <div className={clsx('bg-bg-modal fixed left-0 top-0 z-[9999] h-full w-full')} onClick={close}>
        <div
          className={clsx(
            'max-w-56 px-6 py-4',
            'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform',
            'bg-surface-neutral-primary shadow-modal rounded-lg',
            'border-border-neutral-base border border-solid',
            'funch-medium16 text-content-neutral-base',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
};

export default Modal;

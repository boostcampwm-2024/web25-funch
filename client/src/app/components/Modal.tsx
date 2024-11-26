'use client';

import GlobalPortal from '@app/GlobalPortal';
import clsx from 'clsx';
import { useEffect, useRef, type PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  close: () => void;
}>;

const Modal = ({ children, close }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    prevFocusRef.current = document.activeElement as HTMLElement;

    const buttonsInModal = modalRef.current?.querySelectorAll('button');
    buttonsInModal?.[0]?.focus();

    return () => {
      prevFocusRef.current?.focus();
    };
  }, [modalRef, prevFocusRef]);

  return (
    <GlobalPortal.Consumer>
      <div
        ref={modalRef}
        aria-modal="true"
        role="dialog"
        className={clsx('bg-bg-modal fixed left-0 top-0 z-[9999] h-full w-full')}
        onClick={close}
      >
        <div
          role="document"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className={clsx(
            'min-w-56 max-w-64 px-6 py-4',
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

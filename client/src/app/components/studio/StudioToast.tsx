'use client';

import Toast from './Toast';
import { type ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<typeof Toast> & {
  open: boolean;
  close: () => void;
};

const StudioToast = ({ children, open, close }: Props) => {
  return (
    <Toast open={open} close={close}>
      <div>{children}</div>
    </Toast>
  );
};

export default StudioToast;

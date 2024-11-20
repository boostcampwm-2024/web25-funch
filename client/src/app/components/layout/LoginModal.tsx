'use client';

import { type ComponentPropsWithoutRef } from 'react';
import Modal from '@components/Modal';
import useUser from '@hooks/useUser';
import BrandButton from '@components/BrandButton';

type Props = ComponentPropsWithoutRef<typeof Modal> & {};

const LoginModal = ({ children, close }: Props) => {
  const { login } = useUser();
  return (
    <Modal close={close}>
      <p className="mb-3">{children}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
          close();
        }}
      >
        <BrandButton type="submit">로그인</BrandButton>
      </form>
    </Modal>
  );
};

export default LoginModal;

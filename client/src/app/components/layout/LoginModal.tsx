'use client';

import { FormEvent, type ComponentPropsWithoutRef } from 'react';
import Modal from '@components/Modal';
import useUser from '@hooks/useUser';
import BrandButton from '@components/BrandButton';

type Props = ComponentPropsWithoutRef<typeof Modal> & {};

const LoginModal = ({ children, close }: Props) => {
  const { login } = useUser();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await login();
    } catch (err) {
      alert('로그인에 실패했어요.');
    } finally {
      close();
    }
  };

  return (
    <Modal close={close}>
      <p className="mb-3">{children}</p>
      <form onSubmit={handleSubmit}>
        <BrandButton type="submit">로그인</BrandButton>
      </form>
    </Modal>
  );
};

export default LoginModal;

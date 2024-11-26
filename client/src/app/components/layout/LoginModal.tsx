'use client';

import { type ComponentPropsWithoutRef } from 'react';
import Modal from '@components/Modal';
import useUser from '@hooks/useUser';
import BrandButton from '@components/BrandButton';

type Props = ComponentPropsWithoutRef<typeof Modal> & {};

const LoginModal = ({ children, close }: Props) => {
  const { loginByGithub, loginByNaver } = useUser();

  return (
    <Modal close={close}>
      <h2 id="modal-title" className="funch-bold14 text-content-neutral-strong mb-2 text-center">
        로그인
      </h2>
      <p id="modal-description" className="funch-medium16 text-content-neutral-primary mb-4 text-center">
        {children}
      </p>
      <form
        className="mb-2"
        onSubmit={(e) => {
          e.preventDefault();
          loginByGithub();
        }}
      >
        <BrandButton
          type="submit"
          style={{
            backgroundColor: '#181717',
          }}
        >
          깃허브로 로그인
        </BrandButton>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginByNaver();
        }}
      >
        <BrandButton
          type="submit"
          style={{
            backgroundColor: '#03C75A',
          }}
        >
          네이버로 로그인
        </BrandButton>
      </form>
    </Modal>
  );
};

export default LoginModal;

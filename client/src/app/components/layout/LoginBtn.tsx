'use client';

import Button from '@components/Button';
import { useState } from 'react';
import LoginModal from './LoginModal';

const LoginBtn = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const openModal = () => {
    setIsShowModal(true);
  };
  const closeModal = () => {
    setIsShowModal(false);
  };
  return (
    <>
      {isShowModal && <LoginModal close={closeModal}>로그인하시겠어요?</LoginModal>}
      <Button onClick={openModal}>로그인</Button>
    </>
  );
};

export default LoginBtn;

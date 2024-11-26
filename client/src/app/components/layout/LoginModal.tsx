'use client';

import { type ButtonHTMLAttributes, type PropsWithChildren, type ComponentPropsWithoutRef } from 'react';
import Modal from '@components/Modal';
import useUser from '@hooks/useUser';
import clsx from 'clsx';
import GoogleSvg from '@components/svgs/GoogleSvg';
import NaverSvg from '@components/svgs/NaverSvg';
import GithubSvg from '@components/svgs/GithubSvg';

const LOGIN_BUTTON_COMPONENT_TYPE = {
  GITHUB: 'GITHUB' as const,
  NAVER: 'NAVER' as const,
  GOOGLE: 'GOOGLE' as const,
};

type LoginButtonComponentType = keyof typeof LOGIN_BUTTON_COMPONENT_TYPE;

const LOGIN_BUTTON_COMPONENT_COLOR: Record<LoginButtonComponentType, string> = {
  GITHUB: '#181717',
  NAVER: '#03C75A',
  GOOGLE: '#4285F4',
};

type Props = ComponentPropsWithoutRef<typeof Modal> & {};

const LoginModal = ({ children, close }: Props) => {
  const { loginByGithub, loginByNaver, loginByGoogle } = useUser();

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
        <LoginButton type="submit" componentType={LOGIN_BUTTON_COMPONENT_TYPE.GITHUB}>
          깃허브로 로그인
        </LoginButton>
      </form>
      <form
        className="mb-2"
        onSubmit={(e) => {
          e.preventDefault();
          loginByNaver();
        }}
      >
        <LoginButton type="submit" componentType={LOGIN_BUTTON_COMPONENT_TYPE.NAVER}>
          네이버로 로그인
        </LoginButton>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginByGoogle();
        }}
      >
        <LoginButton type="submit" componentType={LOGIN_BUTTON_COMPONENT_TYPE.GOOGLE}>
          구글로 로그인
        </LoginButton>
      </form>
    </Modal>
  );
};

type LoginButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren<{
    componentType: LoginButtonComponentType;
  }>;

const LoginButton = ({ componentType, children, ...rest }: LoginButtonProps) => {
  return (
    <button
      className={clsx(
        'py-0.5, flex h-10 w-full items-center rounded-md pl-6',
        'funch-bold14 text-content-static-white bg-surface-brand-base hover:bg-surface-brand-strong',
        'opacity-100 disabled:opacity-35',
      )}
      style={{
        backgroundColor: LOGIN_BUTTON_COMPONENT_COLOR[componentType],
      }}
      {...rest}
    >
      <LoginIconRenderer componentType={componentType} />
      {children}
    </button>
  );
};

const LoginIconWrapper = ({ children }: PropsWithChildren) => {
  return (
    <span aria-hidden className="mr-3 flex h-4 w-4 items-center justify-center">
      {children}
    </span>
  );
};

const LoginIconRenderer = ({ componentType }: { componentType: LoginButtonComponentType }) => {
  switch (componentType) {
    case LOGIN_BUTTON_COMPONENT_TYPE.GITHUB:
      return (
        <LoginIconWrapper>
          <GithubSvg />
        </LoginIconWrapper>
      );
    case LOGIN_BUTTON_COMPONENT_TYPE.NAVER:
      return (
        <LoginIconWrapper>
          <NaverSvg />
        </LoginIconWrapper>
      );
    case LOGIN_BUTTON_COMPONENT_TYPE.GOOGLE:
      return (
        <LoginIconWrapper>
          <GoogleSvg />
        </LoginIconWrapper>
      );
    default:
      return null;
  }
};

export default LoginModal;

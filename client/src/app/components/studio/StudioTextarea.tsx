'use client';

import clsx from 'clsx';
import { forwardRef, RefObject, type ForwardedRef, type PropsWithChildren, type TextareaHTMLAttributes } from 'react';

type TextareaWrapperProps = PropsWithChildren<{
  children: React.ReactNode;
  text: string;
  maxLength: number;
  isFocused: boolean;
}>;

const TextareaWrapper = ({ children, text, isFocused }: TextareaWrapperProps) => {
  const currentLength = text.length;

  return (
    <div
      className={clsx(
        'flex w-full flex-col gap-1 px-3.5 pb-2 pt-2.5',
        'border-border-neutral-weak focus-within:border-border-brand-base relative rounded-md border border-solid',
        {
          'focus-within:border-border-red-strong': currentLength < 1,
        },
      )}
    >
      {children}
      {currentLength < 1 && isFocused && (
        <div className="funch-medium12 text-content-red-strong absolute bottom-[.375rem]">{`방송 제목은 최소 한글자 이상입니다.`}</div>
      )}
    </div>
  );
};

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {};

const Textarea = forwardRef(({ ...rest }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
  return (
    <textarea
      ref={ref}
      className={clsx(
        'min-h-10 w-full resize-none bg-transparent outline-none',
        'funch-medium14 text-content-neutral-primary placeholder:text-content-neutral-weak',
      )}
      {...rest}
    />
  );
});

type TextareaCountProps = {
  currentLength: number;
  maxLength: number;
};

const TextareaCount = ({ currentLength, maxLength }: TextareaCountProps) => {
  return (
    <div className={clsx('funch-medium12 inline-flex items-center justify-end')}>
      <span className="text-content-neutral-strong">{currentLength}</span>
      <span className="text-content-neutral-weak">/</span>
      <span className="text-content-neutral-weak">{maxLength}</span>
    </div>
  );
};

export const handleChangeTextareaSize = (ref: RefObject<HTMLTextAreaElement>) => {
  const target = ref.current;
  if (!target) {
    return;
  }
  target.style.height = 'auto';
  target.style.height = `${target.scrollHeight}px`;
};

const StudioTextarea = Object.assign(TextareaWrapper, {
  Textarea,
  TextareaCount,
});

export default StudioTextarea;

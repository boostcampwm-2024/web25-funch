'use client';

import clsx from 'clsx';
import {
  forwardRef,
  RefObject,
  useRef,
  useState,
  type ChangeEvent,
  type ForwardedRef,
  type PropsWithChildren,
  type TextareaHTMLAttributes,
} from 'react';

const TextareaWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={clsx(
        'flex w-full flex-col gap-1 px-3.5 pb-2 pt-2.5',
        'border-border-neutral-weak focus-within:border-border-brand-base rounded-md border border-solid',
      )}
    >
      {children}
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

type TextareaTestProps = {
  setText: (text: string) => void;
};

/**
 * @method TextareaRendererForTest
 * @description page.tsx에서 Textarea UI를 확인하기 위한 테스트용 렌더러 컴포넌트입니다. 추후 삭제 예정입니다.
 */
export const TextareaRendererForTest = ({ setText }: TextareaTestProps) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 100;
  const currentLength = value.length;
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    handleChangeTextareaSize(textareaRef);
    setText(e.target.value);
  };
  return (
    <StudioTextarea>
      <StudioTextarea.Textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        maxLength={100}
        minLength={0}
        placeholder="방송 제목을 입력해주세요."
      />
      <StudioTextarea.TextareaCount currentLength={currentLength} maxLength={maxLength} />
    </StudioTextarea>
  );
};

export default StudioTextarea;

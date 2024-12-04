import { useEffect, useRef, type ChangeEvent } from 'react';
import StudioTextarea from './StudioTextarea';
import { handleChangeTextareaSize } from './StudioTextarea';

type TextareaProps = {
  setText: (text: string) => void;
  text: string;
};

const TextareaRenderer = ({ setText, text }: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 100;
  const currentLength = text.length;
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleChangeTextareaSize(textareaRef);

    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }

    setText(e.target.value);
  };
  return (
    <StudioTextarea text={text} maxLength={maxLength}>
      <StudioTextarea.Textarea
        ref={textareaRef}
        value={text}
        onChange={onChange}
        maxLength={100}
        minLength={0}
        placeholder="방송 제목을 입력해주세요."
      />
      <StudioTextarea.TextareaCount currentLength={currentLength} maxLength={maxLength} />
    </StudioTextarea>
  );
};

export default TextareaRenderer;

import { useEffect, useState, useRef, type ChangeEvent, type FocusEvent, forwardRef } from 'react';
import StudioTextarea from './StudioTextarea';
import { handleChangeTextareaSize } from './StudioTextarea';

type TextareaProps = {
  setText: (text: string) => void;
  text: string;
};

const TextareaRenderer = ({ setText, text }: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const maxLength = 100;
  const currentLength = text.length;
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleChangeTextareaSize(textareaRef);

    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }

    setText(e.target.value);
  };

  const onBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    const cleanedText = e.target.value.replace(/\s+/g, ' ').trim();

    const finalText = cleanedText.slice(0, maxLength);

    setText(finalText);
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  return (
    <StudioTextarea text={text} maxLength={maxLength} isFocused={isFocused}>
      <StudioTextarea.Textarea
        ref={textareaRef}
        value={text}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        maxLength={100}
        minLength={1}
        placeholder="방송 제목을 입력해주세요."
      />
      <StudioTextarea.TextareaCount currentLength={currentLength} maxLength={maxLength} />
    </StudioTextarea>
  );
};

export default TextareaRenderer;

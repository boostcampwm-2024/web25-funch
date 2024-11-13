import { type RefObject, useEffect, useState } from 'react';

const useFocused = (ref: RefObject<HTMLDivElement>) => {
  const [isFocusing, setIsFocusing] = useState(false);

  useEffect(() => {
    const handleFocusIn = () => {
      setIsFocusing(true);
    };

    const handleFocusOut = () => {
      setIsFocusing(false);
    };

    if (ref.current) {
      ref.current.addEventListener('focusin', handleFocusIn);
      ref.current.addEventListener('focusout', handleFocusOut);

      return () => {
        ref.current?.removeEventListener('focusin', handleFocusIn);
        ref.current?.removeEventListener('focusout', handleFocusOut);
      };
    }
  }, []);

  return { isFocusing };
};

export default useFocused;

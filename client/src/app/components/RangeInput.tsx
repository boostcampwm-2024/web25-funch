'use client';

import React, { useEffect, useRef, useState } from 'react';

type Props = {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  updateValue: (value: number) => void;
};

const RangeInput = ({ value, updateValue, min = 0, max = 100, step = 10 }: Props) => {
  const isChangingRef = useRef(false);
  const rangeRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [internalValue, setInternalValue] = useState(value);

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!rangeRef.current) return;

    const rect = rangeRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;

    // 드래그 위치를 비율로 계산
    let newValue = rect.width === 0 ? 0 : ((clientX - rect.left) / rect.width) * (max - min) + min;

    // 범위 내 값으로 제한
    newValue = Math.max(min, Math.min(max, Math.round(newValue / step) * step));

    setInternalValue(newValue);
    updateValue(newValue);
  };

  const addEventListeners = () => {
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('touchend', endDrag);
  };

  const removeEventListeners = () => {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchmove', handleDrag);
    document.removeEventListener('touchend', endDrag);
  };

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isChangingRef.current = true;
    addEventListeners();
  };

  const endDrag = () => {
    removeEventListeners();
    isChangingRef.current = false;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    isChangingRef.current = true;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setInternalValue(newValue);
    updateValue(newValue);

    timeoutRef.current = setTimeout(() => {
      isChangingRef.current = false;
    }, 100);
  };

  const percentage = ((internalValue - min) / (max - min)) * 100;
  const handlerPosition = `calc(${percentage}% - 0.3rem)`;

  useEffect(() => {
    if (!isChangingRef.current) {
      setInternalValue(value);
    }
  }, [value]);

  return (
    <div ref={rangeRef} className="relative min-h-6 w-full" onMouseDown={startDrag} onTouchStart={startDrag}>
      <input
        type="range"
        className="pointer-events-none absolute h-0 w-full opacity-0"
        min={min}
        max={max}
        step={step}
        value={internalValue}
        onChange={handleInputChange}
        aria-hidden="true"
        tabIndex={-1}
      />
      <div
        className="bg-surface-static-coolgray absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 transform rounded"
        // 레일
      />
      <button
        className="bg-surface-static-white absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 transform rounded-full transition-transform hover:scale-150"
        style={{
          left: handlerPosition,
        }}
        aria-hidden="true"
        tabIndex={-1}
        // 핸들러
      />
      <div
        className={`bg-surface-static-white absolute top-1/2 h-0.5 -translate-y-1/2 transform rounded`}
        style={{
          width: `${percentage}%`,
        }}
        // 레인지
      />
    </div>
  );
};

export default RangeInput;

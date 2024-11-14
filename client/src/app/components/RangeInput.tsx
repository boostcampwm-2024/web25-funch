'use client';

import { type ChangeEvent, type InputHTMLAttributes, useEffect, useRef, useState } from 'react';

type Props = {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const RangeInput = ({ value, onChange, min = 0, max = 100, step = 10 }: Props) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChangeRange = (e: ChangeEvent<HTMLInputElement>) => {
    setInternalValue(Number(e.target.value));
    onChange(e);
  };

  const handlerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {}, []);

  return (
    <div className="relative h-0.5 w-full">
      <input
        type="range"
        className="pointer-events-none absolute h-0 w-full opacity-0"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
      {/* <div
        className="bg-surface-static-white absolute top-1/2 h-0.5 w-full -translate-y-1/2 transform rounded"
        // 레일
      /> */}
      <div className="bg-surface-static-coolgray absolute top-1/2 h-0.5 w-full -translate-y-1/2 transform rounded">
        <div
          className="bg-surface-static-white absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 transform rounded-full transition-transform hover:scale-150"
          style={{
            left: `${value}%`,
          }}
          // 핸들러
        />
      </div>
      <div
        className={`bg-surface-static-white absolute top-1/2 h-0.5 -translate-y-1/2 transform rounded`}
        style={{
          width: `${value}%`,
        }}
        // 레인지
      />
    </div>
  );
};

export default RangeInput;

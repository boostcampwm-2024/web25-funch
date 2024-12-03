'use client';

import AddImageSvg from '@components/svgs/AddImageSvg';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type StudioImageInputContextType = {
  imageRef: React.RefObject<HTMLImageElement>;
  isLoaded: boolean;
  setIsLoaded: (value: boolean) => void;
  handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setImage: (image: string | null) => void;
};

const StudioImageInputContext = createContext<StudioImageInputContextType | null>(null);

const useStudioImageInput = () => {
  const context = useContext(StudioImageInputContext);
  if (!context) {
    throw new Error('StudioImageInput compound components must be used within StudioImageInput');
  }
  return context;
};

type RootProps = {
  children: React.ReactNode;
  className?: string;
  setImage: (image: string | null) => void;
};

const StudioImageInput = ({ children, className, setImage }: RootProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('image')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    if (file.size > 1024 * 1024 * 2) {
      alert('이미지 파일은 2MB 이하만 업로드 가능합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (imageRef.current && e.target?.result) {
        imageRef.current.src = e.target.result as string;

        setImage(e.target.result as string);
      }
    };
    setIsLoaded(true);

    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <StudioImageInputContext.Provider
      value={{
        imageRef,
        isLoaded,
        setIsLoaded,
        handleChangeFile,
        setImage,
      }}
    >
      <div className={clsx(className, { 'pb-[140px]': !isLoaded })}>{children}</div>
    </StudioImageInputContext.Provider>
  );
};

const Upload = () => {
  const { isLoaded, handleChangeFile } = useStudioImageInput();

  if (isLoaded) return null;

  return (
    <label className="relative w-[247px] pt-[140px]">
      <span
        className={clsx(
          'bg-surface-neutral-base absolute flex h-[140px] w-[247px] cursor-pointer',
          'hover:bg-bg-weak border-border-neutral-base flex-col items-center',
          'justify-center rounded-lg border-2 border-dashed',
        )}
      >
        <input
          className="hidden"
          type="file"
          onChange={handleChangeFile}
          accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp, image/webp"
        />
        <AddImageSvg />
        <div className="funch-bold14 mt-2">업로드</div>
        <span className="funch-bold12">(1280/720)</span>
      </span>
    </label>
  );
};

const Preview = () => {
  const { isLoaded, imageRef } = useStudioImageInput();
  if (!isLoaded) return null;

  return (
    <div className="relative h-[140px] w-[247px] overflow-hidden rounded-lg">
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-violet-100 to-gray-200" />
      <div className="relative z-30 flex h-full w-full items-center justify-center">
        <img ref={imageRef} alt="이미지" className="z-50 h-28 w-28 rounded-md object-cover" />
      </div>
    </div>
  );
};

const Controls = () => {
  const { isLoaded, handleChangeFile, setIsLoaded, imageRef } = useStudioImageInput();
  const editFileInputRef = useRef<HTMLInputElement>(null);

  if (!isLoaded) return null;

  const handleEditClick = () => {
    editFileInputRef.current?.click();
  };

  const handleDelete = () => {
    if (imageRef.current) {
      imageRef.current.src = '';
      setIsLoaded(false);
    }
  };

  return (
    <div className="funch-bold12 mt-2 flex w-[247px] items-center gap-4">
      <button onClick={handleEditClick}>
        <div className="border-border-neutral-weak text-content-neutral-primary hover:bg-bg-weak rounded-md border px-4 py-2">
          수정
        </div>
        <input
          type="file"
          ref={editFileInputRef}
          className="hidden"
          onChange={handleChangeFile}
          accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp, image/webp"
        />
      </button>
      <button
        className="border-border-neutral-weak text-content-neutral-primary hover:bg-bg-weak rounded-md border px-4 py-2"
        onClick={handleDelete}
      >
        삭제
      </button>
    </div>
  );
};

StudioImageInput.Upload = Upload;
StudioImageInput.Preview = Preview;
StudioImageInput.Controls = Controls;

export default StudioImageInput;

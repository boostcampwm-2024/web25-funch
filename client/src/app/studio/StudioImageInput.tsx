'use client';

import AddImageSvg from '@components/svgs/AddImageSvg';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type StudioImageInputContextType = {
  imageRef: React.RefObject<HTMLImageElement>;
  isLoaded: boolean;
  setIsLoaded: (value: boolean) => void;
  handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setImage: (image: File | null) => void;
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
  setImage: (image: File | null) => void;
};

const StudioImageInput = ({ children, className, setImage }: RootProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (imageRef.current && e.target?.result) {
        imageRef.current.src = e.target.result as string;
      }
    };
    setIsLoaded(true);

    reader.readAsDataURL(file);
    setImage(file);
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
          'bg-bg-strong absolute flex h-[140px] w-[247px] cursor-pointer',
          'hover:bg-bg-base border-border-neutral-base flex-col items-center',
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
    <div className="h-[140px] w-[247px]">
      <div className="flex h-full w-full items-center justify-center">
        <img ref={imageRef} alt="이미지" className="z-50 h-28 w-28" />
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
    <div className="funch-bold12 ml-4 flex w-[247px] items-center gap-4">
      <button onClick={handleEditClick}>
        <div className="border-border-neutral-weak hover:bg-bg-strong rounded-md border-2 px-4 py-2">수정</div>
        <input
          type="file"
          ref={editFileInputRef}
          className="hidden"
          onChange={handleChangeFile}
          accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp, image/webp"
        />
      </button>
      <button
        className="border-border-neutral-weak hover:bg-bg-strong rounded-md border-2 px-4 py-2"
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
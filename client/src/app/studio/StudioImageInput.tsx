'use client';

import AddImageSvg from '@components/svgs/AddImageSvg';
import useInputFiles from '@hooks/useInputFiles';
import { useRef } from 'react';
import clsx from 'clsx';

type StudionImageInputProps = {
  image?: File | null;
  setImage: (image: File | null) => void;
};

const StudioImageInput = ({ setImage }: StudionImageInputProps) => {
  const { imageRef, fileName, isLoaded, handleChangeFile, setIsLoaded } = useInputFiles();
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    editFileInputRef.current?.click();
  };

  const setDeleteImage = () => {
    if (imageRef.current) {
      imageRef.current.src = '';
      setIsLoaded(false);
    }
  };

  return (
    <div>
      <label
        className={clsx('relative w-[247px] pt-[140px]', {
          hidden: isLoaded,
        })}
      >
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
            onChange={(e) => {
              handleChangeFile(e);
              setImage(e.target.files ? e.target.files[0] : null);
            }}
            accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp, image/webp"
          />
          <AddImageSvg />
          <div className="funch-bold14 mt-2">업로드</div>
          <span className="funch-bold12">(1280/720)</span>
        </span>
      </label>
      {isLoaded && (
        <>
          <div className="h-[140px] w-[247px]">
            <div className="flex h-full w-full items-center justify-center">
              <img ref={imageRef} alt="이미지" className="z-50 h-28 w-28" />
            </div>
          </div>
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
              onClick={() => setDeleteImage()}
            >
              삭제
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StudioImageInput;

'use client';

import clsx from 'clsx';
import { TextareaRendererForTest } from '@components/studio/StudioTextarea';
import { StudioDropdownRendererForTest } from '@components/studio/StudioDropdown';
import StudioImageInput from '@components/studio/StudioImageInput';
import StudioInput from '@components/studio/StudioInput';

import { useState } from 'react';
import StudioAddButton from '@components/studio/StudioAddButton';
import StudioUpdateButton from '@components/studio/StudioUpdateButton';

const MyStudioController = () => {
  const [image, setImage] = useState<File | null>(null);
  return (
    <section className="w-full">
      <div className={clsx('pt-live-aspect-ratio relative w-full')}>
        <div className={clsx('bg-surface-static-black absolute left-0 top-0 h-full w-full')} />
      </div>
      <section className="w-full space-y-8 p-[30px]">
        <div className="grid grid-cols-5">
          <div className="col-span-2">
            <label className="funch-bold16">방송 제목</label>
          </div>
          <div className="col-span-3">
            <TextareaRendererForTest />
          </div>
        </div>
        <div className="grid grid-cols-5">
          <div className="col-span-2">
            <label className="funch-bold16">카테고리</label>
          </div>
          <div className="col-span-3">
            <StudioDropdownRendererForTest />
          </div>
        </div>
        <div className="grid grid-cols-5">
          <div className="col-span-2">
            <label className="funch-bold16">분위기</label>
          </div>
          <div className="col-span-3">
            <StudioDropdownRendererForTest />
          </div>
        </div>
        <div className="grid grid-cols-5">
          <div className="col-span-2">
            <label className="funch-bold16">태그</label>
          </div>
          <div className="col-span-3 flex gap-4">
            <div className="flex-1">
              <StudioInput placeholder="태그를 입력하세요" />
            </div>
            <StudioAddButton>추가</StudioAddButton>
          </div>
        </div>
        <div className="grid grid-cols-5">
          <div className="col-span-2">
            <label className="funch-bold16">미리보기 이미지</label>
          </div>
          <div className="col-span-3">
            <StudioImageInput setImage={setImage}>
              <StudioImageInput.Upload />
              <StudioImageInput.Preview />
              <StudioImageInput.Controls />
            </StudioImageInput>
          </div>
        </div>
        <StudioUpdateButton>업데이트</StudioUpdateButton>
      </section>
    </section>
  );
};

export default MyStudioController;

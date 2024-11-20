'use client';

import clsx from 'clsx';
import { TextareaRendererForTest } from '@components/studio/StudioTextarea';
import { StudioDropdownRendererForTest } from '@components/studio/StudioDropdown';
import StudioImageInput from '@components/studio/StudioImageInput';
import StudioInput from '@components/studio/StudioInput';

import { useState } from 'react';
import StudioAddButton from '@components/studio/StudioAddButton';
import StudioUpdateButton from '@components/studio/StudioUpdateButton';
import StudioRows from './StudioRows';

const MyStudioController = () => {
  const [image, setImage] = useState<File | null>(null);
  return (
    <section className="funch-scrollable w-full">
      <div className={clsx('pt-live-aspect-ratio relative w-full')}>
        <div className={clsx('bg-surface-static-black absolute left-0 top-0 h-full w-full')} />
      </div>
      <section className="w-full space-y-8 p-[30px]">
        <StudioRows labelName="방송 제목">
          <TextareaRendererForTest />
        </StudioRows>
        <StudioRows labelName="카테고리">
          <StudioDropdownRendererForTest />
        </StudioRows>
        <StudioRows labelName="방송 소개">
          <StudioDropdownRendererForTest />
        </StudioRows>
        <StudioRows isFlex labelName="태그">
          <div className="flex-1">
            <StudioInput placeholder="태그를 입력하세요" />
          </div>
          <StudioAddButton>추가</StudioAddButton>
        </StudioRows>
        <StudioRows labelName="미리보기 이미지">
          <StudioImageInput setImage={setImage}>
            <StudioImageInput.Upload />
            <StudioImageInput.Preview />
            <StudioImageInput.Controls />
          </StudioImageInput>
        </StudioRows>
        <StudioUpdateButton>업데이트</StudioUpdateButton>
      </section>
    </section>
  );
};

export default MyStudioController;

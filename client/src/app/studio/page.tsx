'use client';

import { useState } from 'react';
import { StudioDropdownRendererForTest } from '@components/studio/StudioDropdown';
import StudioInput from '@components/studio/StudioInput';
import { TextareaRendererForTest } from '@components/studio/StudioTextarea';
import StudioAddButton from '@components/studio/StudioAddButton';
import StudioUpdateButton from '@components/studio/StudioUpdateButton';
import StudioBadge from '@components/studio/StudioBadge';
import StudioImageInput from '@components/studio/StudioImageInput';

const StudioPage = () => {
  const [image, setImage] = useState<File | null>(null);
  return (
    <div className="w-80">
      <StudioInput placeholder="플레이스 홀더" />
      <TextareaRendererForTest />
      <StudioImageInput setImage={setImage}>
        <StudioImageInput.Upload />
        <StudioImageInput.Preview />
        <StudioImageInput.Controls />
      </StudioImageInput>
      <StudioAddButton>추가</StudioAddButton>
      <StudioAddButton disabled>추가</StudioAddButton>
      <StudioUpdateButton>업데이트</StudioUpdateButton>
      <StudioUpdateButton disabled>업데이트</StudioUpdateButton>
      <StudioDropdownRendererForTest />
      <StudioBadge onClick={() => console.log('hi')}>하이요</StudioBadge>
      <StudioBadge>흐어어어어엉어어어</StudioBadge>
      <div className="bg-surface-static-violetalpha-base hover:bg-surface-static-violetalpha-strong h-6 w-6" />
    </div>
  );
};

export default StudioPage;

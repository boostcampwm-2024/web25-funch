'use client';

import StudioImageInput from './StudioImageInput';
import { useState } from 'react';
import { StudioDropdownRendererForTest } from '@components/studio/StudioDropdown';
import StudioInput from '@components/studio/StudioInput';
import { TextareaRendererForTest } from '@components/studio/StudioTextarea';
import StudioAddButton from './StudioAddButton';
import StudioUpdateButton from './StudioUpdateButton';
import StudioBadge from './StudioBadge';

const StudioPage = () => {
  const [image, setImage] = useState<File | null>(null);
  return (
    <div className="w-80">
      <StudioInput placeholder="플레이스 홀더" />
      <TextareaRendererForTest />
      <StudioImageInput setImage={setImage} />
      <StudioAddButton>추가</StudioAddButton>
      <StudioAddButton disabled>추가</StudioAddButton>
      <StudioUpdateButton>업데이트</StudioUpdateButton>
      <StudioUpdateButton disabled>업데이트</StudioUpdateButton>
      <StudioDropdownRendererForTest />
      <StudioBadge>하이요</StudioBadge>
      <StudioBadge>흐어어어어엉어어어</StudioBadge>
      <div className="bg-surface-static-violetalpha-base hover:bg-surface-static-violetalpha-strong h-6 w-6" />
    </div>
  );
};

export default StudioPage;

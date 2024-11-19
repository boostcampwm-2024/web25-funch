'use client';

import StudioImageInput from './StudioImageInput';
import { useState } from 'react';
import { StudioDropdownRendererForTest } from '@components/studio/StudioDropdown';
import StudioInput from '@components/studio/StudioInput';
import { TextareaRendererForTest } from '@components/studio/StudioTextarea';
import StudioButton from './StudioButton';

const StudioPage = () => {
  const [image, setImage] = useState<File | null>(null);
  return (
    <div className="w-80">
      <StudioInput placeholder="플레이스 홀더" />
      <TextareaRendererForTest />
      <StudioImageInput setImage={setImage} />
      <StudioButton componentType="ADD">추가</StudioButton>
      <StudioButton componentType="UPDATE">업데이트</StudioButton>
      <StudioDropdownRendererForTest />
    </div>
  );
};

export default StudioPage;

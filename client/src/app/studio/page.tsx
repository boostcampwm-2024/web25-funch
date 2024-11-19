'use client';

import StudioImageInput from './StudioImageInput';
import { useState } from 'react';
import { StudioDropdownRendererForTest } from '@components/studio/StudioDropdown';
import StudioInput from '@components/studio/StudioInput';
import { TextareaRendererForTest } from '@components/studio/StudioTextarea';

const StudioPage = () => {
  const [image, setImage] = useState<File | null>(null);
  return (
    <div className="w-80">
      <StudioInput placeholder="플레이스 홀더" />
      <TextareaRendererForTest />
      <StudioImageInput setImage={setImage} />
      <StudioDropdownRendererForTest />
    </div>
  );
};

export default StudioPage;

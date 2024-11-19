'use client';

import StudioImageInput from './StudioImageInput';
import { useState } from 'react';
import StudioInput from '@components/studio/StudioInput';
import { TextareaRendererForTest } from '@components/studio/StudioTextarea';

const StudioPage = () => {
  const [image, setImage] = useState<File | null>(null);
  return (
    <div className="w-80">
      <StudioInput />
      <TextareaRendererForTest />
      <StudioImageInput setImage={setImage} />
    </div>
  );
};

export default StudioPage;

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
      <div className="bg-surface-static-violetalpha-base hover:bg-surface-static-violetalpha-strong h-6 w-6" />
    </div>
  );
};

export default StudioPage;

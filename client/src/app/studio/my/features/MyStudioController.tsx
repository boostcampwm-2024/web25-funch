'use client';
import { Update } from '@libs/internalTypes';
import MyStudioForm from './MyStudioForm';
import StudioVideo, { FallbackWrapper, StudioVideoWrapper } from './StudioVideo';
import { Suspense } from 'react';

const MyStudioController = () => {
  const handleFormSubmit = (formData: Update) => {
    console.log(formData);
  };

  return (
    <section className="funch-scrollable w-full">
      <StudioVideoWrapper>
        <Suspense fallback={<FallbackWrapper>스트리머 정보 갱신 중...</FallbackWrapper>}>
          <StudioVideo />
        </Suspense>
      </StudioVideoWrapper>
      <MyStudioForm onSubmit={handleFormSubmit} />
    </section>
  );
};

export default MyStudioController;

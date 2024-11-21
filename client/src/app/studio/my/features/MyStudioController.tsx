'use client';
import { Update } from '@libs/internalTypes';

import MyStudioVideo from './MyStudioVideo';
import MyStudioForm from './MyStudioForm';

const MyStudioController = () => {
  const handleFormSubmit = (formData: Update) => {
    console.log(formData);
  };

  return (
    <section className="funch-scrollable w-full">
      <MyStudioVideo />
      <MyStudioForm onSubmit={handleFormSubmit} />
    </section>
  );
};

export default MyStudioController;

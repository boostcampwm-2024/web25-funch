'use client';

import AccordionButton from './AccordionButton';

const ClientComponentForTest = () => {
  return (
    <div>
      <AccordionButton onExpand={() => console.log('expand!')} onCollapse={() => console.log('collapse!')} />
    </div>
  );
};

export default ClientComponentForTest;

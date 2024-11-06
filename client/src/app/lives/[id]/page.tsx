import React from 'react';

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const id = (await params).id;
  return <div>live id = {id}</div>;
};

export default page;

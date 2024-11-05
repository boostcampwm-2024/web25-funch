'use client';

import { useEffect } from 'react';

const Ping = () => {
  useEffect(() => {
    fetch('/api/ping')
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return <div>Ping</div>;
};

export default Ping;

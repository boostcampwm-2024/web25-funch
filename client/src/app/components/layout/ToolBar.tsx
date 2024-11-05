import FunchSvg from '@components/svgs/FunchSvg';
import React from 'react';

type Props = {};

const ToolBar = (props: Props) => {
  return (
    <div className="flex w-full justify-between">
      <div className="w-24">
        <FunchSvg />
      </div>
      <div>ToolBar</div>
    </div>
  );
};

export default ToolBar;

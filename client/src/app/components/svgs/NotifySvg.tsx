import type { SvgComponentProps } from '@libs/internalTypes';
import React from 'react';

const NotifySvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
      role="img"
      focusable="false"
      aria-hidden="true"
    >
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <circle cx="35" cy="35" r="25" stroke="currentColor" strokeWidth="4"></circle>
      <circle cx="35" cy="45.5" r="2.5" fill="currentColor" stroke="currentColor" strokeWidth="0.6"></circle>
      <rect x="32.5" y="22" width="5" height="17" rx="2.5" fill="currentColor"></rect>
    </svg>
  );
};

export default NotifySvg;

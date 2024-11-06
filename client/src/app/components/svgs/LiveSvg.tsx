import { SvgComponentProps } from '@libs/internalTypes';
import React from 'react';

const LiveSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="10"
      viewBox="0 0 28 10"
      fill="none"
    >
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <path
        fill="#fff"
        d="M21.553 9.3V.7H27.5v2.003h-3.47v1.394h3.253V5.91H24.03v1.389h3.47V9.3h-5.947ZM14.332 9.3 11.82.7h2.863l1.244 5.99h.117L17.288.7h2.863l-2.512 8.6h-3.307ZM7.941 9.3V.7h2.477v8.6H7.941ZM.5 9.3V.7h2.477v6.598h3.435V9.3H.5Z"
      ></path>
    </svg>
  );
};

export default LiveSvg;

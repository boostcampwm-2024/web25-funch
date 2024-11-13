import React from 'react';
import { SvgComponentProps } from '@libs/internalTypes';

const PipQuitSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <button>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {svgTitle && <title>{svgTitle}</title>}
        {svgDescription && <desc>{svgDescription}</desc>}
        <rect x="17.75" y="18.5" width="9" height="6" rx="1" fill="white"></rect>{' '}
        <rect
          x="17.25"
          y="18"
          width="10"
          height="7"
          rx="1.5"
          stroke="black"
          stroke-opacity="0.1"
          stroke-linejoin="round"
        ></rect>{' '}
        <path
          d="M12.75 14.5L16.25 18"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{' '}
        <path
          d="M12.75 17.5V14.5H15.75"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{' '}
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.25 12.75C9.25 11.7835 10.0335 11 11 11H25C25.9665 11 26.75 11.7835 26.75 12.75V16H25.25V12.75C25.25 12.6119 25.1381 12.5 25 12.5H11C10.8619 12.5 10.75 12.6119 10.75 12.75V22.75C10.75 22.8881 10.8619 23 11 23H15.25V24.5H11C10.0335 24.5 9.25 23.7165 9.25 22.75V12.75Z"
          fill="white"
        ></path>{' '}
        <path
          d="M26.75 16.5C27.0261 16.5 27.25 16.2761 27.25 16V12.75C27.25 11.5074 26.2426 10.5 25 10.5H11C9.75736 10.5 8.75 11.5074 8.75 12.75V22.75C8.75 23.9926 9.75736 25 11 25H15.25C15.5261 25 15.75 24.7761 15.75 24.5V23C15.75 22.7239 15.5261 22.5 15.25 22.5H11.25V13H24.75V16C24.75 16.2761 24.9739 16.5 25.25 16.5H26.75Z"
          stroke="black"
          stroke-opacity="0.1"
          stroke-linecap="square"
          stroke-linejoin="round"
        ></path>
      </svg>
    </button>
  );
};

export default PipQuitSvg;
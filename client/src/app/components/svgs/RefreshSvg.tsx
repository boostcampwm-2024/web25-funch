import type { SvgComponentProps } from '@libs/internalTypes';

const RefreshSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg
      role="img"
      aria-hidden="true"
      focusable="false"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <path
        d="M14.8592 8.8996C14.0426 7.76108 12.7079 7.01935 11.2 7.01935C8.71467 7.01935 6.69995 9.03407 6.69995 11.5193C6.69995 14.0046 8.71467 16.0193 11.2 16.0193C13.1671 16.0193 14.8395 14.7571 15.4513 12.9983C15.5459 12.7264 15.6151 12.4426 15.6561 12.1498"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M15.1529 6.70001V9.15456H12.6984"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export default RefreshSvg;

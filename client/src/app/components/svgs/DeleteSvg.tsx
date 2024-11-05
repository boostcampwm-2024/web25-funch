import type { SvgComponentProps } from '@libs/internalTypes';

const DeleteSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg
      role="img"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="16"
      fill="none"
    >
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.5 15.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm2.995-10.495a.7.7 0 0 0-.903-.074l-.087.074L7.5 7.01 5.495 5.005l-.087-.074a.7.7 0 0 0-.903 1.064L6.51 8l-2.005 2.005a.7.7 0 0 0 .903 1.064l.087-.074L7.5 8.99l2.005 2.005.087.074a.7.7 0 0 0 .903-1.064L8.49 8l2.005-2.005a.7.7 0 0 0 0-.99Z"
        clipRule="evenodd"
        opacity="0.5"
      ></path>
    </svg>
  );
};

export default DeleteSvg;

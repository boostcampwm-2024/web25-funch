import type { SvgComponentProps } from '@libs/internalTypes';

const FollowSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none">
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13.027 7.725C11.536 3.835 4 4.413 4 10.295c0 2.764 2.041 6.39 7.898 10.126.133.085.585.327 1.102.329.517.002.94-.226 1.055-.3C19.948 16.704 22 13.067 22 10.296c0-5.848-7.473-6.483-8.973-2.57Z"
      />
    </svg>
  );
};

export default FollowSvg;

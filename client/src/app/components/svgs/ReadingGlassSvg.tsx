import type { SvgComponentProps } from '@libs/internalTypes';

const ReadingGlassSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg
      role="img"
      aria-hidden="true"
      focusable="false"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <g opacity="0.9">
        <path
          d="M15.8999 14.5L19.0862 17.7187"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <circle cx="11.4302" cy="10.4819" r="5.35" stroke="currentColor" strokeWidth="1.8"></circle>
      </g>
    </svg>
  );
};

export default ReadingGlassSvg;

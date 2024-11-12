import { SvgComponentProps } from '@libs/internalTypes';

const PlaySvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg
      role="img"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 60"
      width="60"
      height="60"
    >
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h60v60H0z"></path>
        <path
          fill="currentColor"
          d="M42.274 31.404L19.304 45.99A1.5 1.5 0 0 1 17 44.724V15.551a1.5 1.5 0 0 1 2.304-1.266l22.97 14.587a1.5 1.5 0 0 1 0 2.532z"
        ></path>
      </g>
    </svg>
  );
};

export default PlaySvg;

import { SvgComponentProps } from '@libs/internalTypes';

const MiniPlayerCloseSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none">
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M23.395 10.57a1.25 1.25 0 1 1 1.768 1.768L12.105 25.396a1.25 1.25 0 0 1-1.768-1.768L23.395 10.57Z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12.105 10.57a1.25 1.25 0 1 0-1.768 1.768l13.058 13.058a1.25 1.25 0 0 0 1.768-1.768L12.105 10.57Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default MiniPlayerCloseSvg;

import type { SvgComponentProps } from '@libs/internalTypes';

const DownArrowSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  <svg
    role="img"
    focusable={false}
    aria-hidden={true}
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {svgTitle && <title>{svgTitle}</title>}
    {svgDescription && <desc>{svgDescription}</desc>}
    <path d="M7 9L11 13L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>;
};

export default DownArrowSvg;

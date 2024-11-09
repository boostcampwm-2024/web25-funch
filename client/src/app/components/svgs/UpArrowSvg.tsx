import type { SvgComponentProps } from '@libs/internalTypes';

const UpArrowSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg
      role="img"
      focusable={false}
      aria-hidden={true}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="navigator_icon_arrow__37j2I"
    >
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <path
        d="M7 13L11 9L15 13" // 9와 13의 위치만 바꿨습니다
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export default UpArrowSvg;

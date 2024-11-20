import { SvgComponentProps } from '@libs/internalTypes';

const MiniPlayerRevertSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none">
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <path
        role="img"
        aria-hidden="true"
        focusable="false"
        fill="currentColor"
        fillRule="evenodd"
        d="M11.192 17.926c0-.585.474-1.059 1.059-1.059h7.411c.585 0 1.06.474 1.06 1.059v4.235c0 .585-.475 1.059-1.06 1.059h-7.411a1.059 1.059 0 0 1-1.06-1.059v-4.235Z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.906"
        d="M23.294 10.059h4.116a.12.12 0 0 1 .084.035m.035 4.2V10.18a.12.12 0 0 0-.035-.085m0 0-5.259 5.259M18 10.059h-7.412c-1.17 0-2.117.948-2.117 2.118v11.646c0 1.17.948 2.118 2.117 2.118h14.824c1.17 0 2.117-.948 2.117-2.117v-4.236"
      ></path>
    </svg>
  );
};

export default MiniPlayerRevertSvg;

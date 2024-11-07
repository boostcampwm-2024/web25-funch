import type { SvgComponentProps } from '@libs/internalTypes';

const MoonSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <path
        d="M20 10.5C18.7402 11.7598 18.0325 13.4684 18.0325 15.25C18.0325 17.0316 18.7402 18.7402 20 20C21.2598 21.2598 22.9684 21.9675 24.75 21.9675C26.5316 21.9675 28.2402 21.2598 29.5 20C29.5 21.8789 28.9428 23.7156 27.899 25.2779C26.8551 26.8402 25.3714 28.0578 23.6355 28.7769C21.8996 29.4959 19.9895 29.684 18.1466 29.3175C16.3038 28.9509 14.6111 28.0461 13.2825 26.7175C11.9539 25.3889 11.0491 23.6962 10.6825 21.8534C10.316 20.0105 10.5041 18.1004 11.2231 16.3645C11.9422 14.6286 13.1598 13.1449 14.7221 12.101C16.2844 11.0572 18.1211 10.5 20 10.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export default MoonSvg;

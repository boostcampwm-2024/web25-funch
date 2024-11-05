import type { SvgComponentProps } from '@libs/internalTypes';

const SunSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <path
        d="M26.8061 20C26.8061 23.7589 23.7589 26.8061 20 26.8061C16.2411 26.8061 13.1938 23.7589 13.1938 20C13.1938 16.2411 16.2411 13.1938 20 13.1938C23.7589 13.1938 26.8061 16.2411 26.8061 20Z"
        stroke="currentColor"
        strokeWidth="2"
      ></path>
      <path
        d="M31.5 20L30.2679 20M8.5 20L9.73214 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      ></path>
      <path
        d="M28.1318 28.1319L27.2606 27.2606M11.8684 11.8684L12.7396 12.7397"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      ></path>
      <path
        d="M20 31.5L20 30.2679M20 8.5L20 9.73214"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      ></path>
      <path
        d="M11.8682 28.1317L12.7394 27.2605M28.1316 11.8683L27.2604 12.7395"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      ></path>
    </svg>
  );
};

export default SunSvg;

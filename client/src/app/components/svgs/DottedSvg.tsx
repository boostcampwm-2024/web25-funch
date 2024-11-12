import { SvgComponentProps } from '@libs/internalTypes';

const DottedSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <rect
        x="11.5"
        y="10.5"
        width="3"
        height="3"
        rx="1.5"
        transform="rotate(-180 11.5 10.5)"
        fill="currentColor"
      ></rect>
      <rect
        x="11.5"
        y="15.5"
        width="3"
        height="3"
        rx="1.5"
        transform="rotate(-180 11.5 15.5)"
        fill="currentColor"
      ></rect>
      <rect
        x="11.5"
        y="20.5"
        width="3"
        height="3"
        rx="1.5"
        transform="rotate(-180 11.5 20.5)"
        fill="currentColor"
      ></rect>
    </svg>
  );
};

export default DottedSvg;

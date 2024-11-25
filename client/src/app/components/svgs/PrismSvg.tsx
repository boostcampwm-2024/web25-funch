import { SvgComponentProps } from '@libs/internalTypes';

const PrismSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <rect width="100" height="100" fill="white" />

      <path d="M15 77.32 L85 77.32 L50 20 Z" fill="white" stroke="black" strokeWidth="2" />

      <path d="M27.5 69.82 L72.5 69.82 L50 35 Z" fill="white" stroke="black" strokeWidth="2" />

      <path d="M40 62.32 L60 62.32 L50 50 Z" fill="white" stroke="black" strokeWidth="2" />
    </svg>
  );
};

export default PrismSvg;

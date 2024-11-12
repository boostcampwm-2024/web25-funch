import { SvgComponentProps } from '@libs/internalTypes';

const PauseSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="5 4 60 60">
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <rect rx="2" width="26" height="26" fill="currentColor" transform="translate(22 22)"></rect>
    </svg>
  );
};

export default PauseSvg;

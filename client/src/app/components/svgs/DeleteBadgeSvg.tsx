import { SvgComponentProps } from '@libs/internalTypes';

const DeleteBadgeSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <path d="M8 1.75L1 8.75" stroke="#AEB4C2" strokeWidth="1.2" strokeLinecap="round"></path>
      <path d="M1 1.75L8 8.75" stroke="#AEB4C2" strokeWidth="1.2" strokeLinecap="round"></path>
    </svg>
  );
};

export default DeleteBadgeSvg;

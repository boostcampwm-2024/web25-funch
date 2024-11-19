import { SvgComponentProps } from '@libs/internalTypes';

const AddImageSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="image_upload_icon__c6VUB"
    >
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <path d="M1 7H13" stroke="#AEB4C2" strokeWidth="1.5" strokeLinecap="round"></path>
      <path d="M7 1L7 13" stroke="#AEB4C2" strokeWidth="1.5" strokeLinecap="round"></path>
    </svg>
  );
};

export default AddImageSvg;

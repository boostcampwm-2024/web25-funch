import type { SvgComponentProps } from '@libs/internalTypes';

const CategorySvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg
      role="img"
      focusable={false}
      aria-hidden={true}
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <rect x="5.04996" y="4.88635" width="6.5" height="6.5" rx="1.25" stroke="currentColor" strokeWidth="1.5"></rect>
      <rect x="14.8818" y="4.83635" width="6.6" height="6.6" rx="1.3" stroke="currentColor" strokeWidth="1.4"></rect>
      <rect x="14.9318" y="14.834" width="6.5" height="6.5" rx="1.25" stroke="currentColor" strokeWidth="1.5"></rect>
      <rect x="5.04996" y="14.834" width="6.5" height="6.5" rx="1.25" stroke="currentColor" strokeWidth="1.5"></rect>
    </svg>
  );
};

export default CategorySvg;

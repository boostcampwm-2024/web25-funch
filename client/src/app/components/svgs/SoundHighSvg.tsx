import { SvgComponentProps } from '@libs/internalTypes';

const SoundHighSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg
      role="img"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
    >
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M17.914 10.375a.7.7 0 0 1 .694.605l.006.095v13.678a.7.7 0 0 1-.982.64l-.091-.048-5.479-3.453H8.7a.7.7 0 0 1-.7-.7v-6.557a.7.7 0 0 1 .7-.7h3.362l5.479-3.452a.7.7 0 0 1 .179-.08l.096-.02.098-.008zm6.813 1.022c1.698 1.736 2.781 4.213 2.781 6.614 0 2.4-1.081 4.87-2.776 6.602a.813.813 0 1 1-1.172-1.131c1.392-1.423 2.32-3.54 2.32-5.471 0-1.933-.93-4.057-2.317-5.476a.816.816 0 0 1 .508-1.387.81.81 0 0 1 .656.249zm-3.33 2.307a.885.885 0 0 1 .68.237 5.589 5.589 0 0 1 1.773 4.07 5.569 5.569 0 0 1-1.768 4.057.894.894 0 0 1-.813.222.841.841 0 0 1-.628-.563.785.785 0 0 1 .225-.814 4.047 4.047 0 0 0 1.262-2.902 4.063 4.063 0 0 0-1.26-2.908.785.785 0 0 1-.206-.878.856.856 0 0 1 .735-.521z"
      ></path>
    </svg>
  );
};

export default SoundHighSvg;

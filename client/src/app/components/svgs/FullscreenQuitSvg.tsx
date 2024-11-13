import { SvgComponentProps } from '@libs/internalTypes';

const FullscreenQuitSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg
      role="img"
      aria-hidden
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
    >
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <g fill="#FFF" fillRule="evenodd" stroke="currentColor" stroke-width=".5">
        <path
          d="M.2 5.357c-.11 0-.2-.09-.2-.2V3.63c0-.11.09-.2.2-.2l3.015.001V3.43h.014c.092 0 .17-.063.192-.147l.008-.053v-.014h.001L3.43.2c0-.11.09-.2.2-.2h1.528c.11 0 .2.09.2.2v4.257c0 .497-.403.9-.9.9H.2zM14.8 5.357c.11 0 .2-.09.2-.2V3.63c0-.11-.09-.2-.2-.2l-3.015.001V3.43h-.014c-.092 0-.17-.063-.192-.147l-.008-.053v-.014h-.001L11.57.2c0-.11-.09-.2-.2-.2H9.843c-.11 0-.2.09-.2.2v4.257c0 .497.403.9.9.9H14.8zM3.429 14.786c0 .118.096.214.214.214h1.5c.118 0 .214-.096.214-.214v-4.179c0-.266-.108-.507-.282-.682-.175-.174-.416-.282-.682-.282H.214c-.118 0-.214.096-.214.214v1.5c0 .118.096.214.214.214h3c.119 0 .215.096.215.215v3zM14.786 11.571c.118 0 .214-.096.214-.214v-1.5c0-.118-.096-.214-.214-.214h-4.179c-.266 0-.507.108-.682.282-.174.175-.282.416-.282.682v4.179c0 .118.096.214.214.214h1.5c.118 0 .214-.096.214-.214v-3c0-.119.096-.215.215-.215h3z"
          transform="translate(7.5 7.5)"
        ></path>
      </g>
    </svg>
  );
};

export default FullscreenQuitSvg;

import { SvgComponentProps } from '@libs/internalTypes';

const FullscreenSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
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
      <g fill="currentColor" fillRule="nonzero">
        <path d="M19.564 19.964H16.6a.2.2 0 0 0-.2.2V22.4c0 .11.09.2.2.2h5a1 1 0 0 0 1-1v-5a.2.2 0 0 0-.2-.2h-2.236a.2.2 0 0 0-.2.2v2.964a.4.4 0 0 1-.4.4zM19.992 10.436V13.4c0 .11.09.2.2.2h2.237a.2.2 0 0 0 .2-.2v-5a1 1 0 0 0-1-1h-5a.2.2 0 0 0-.2.2v2.236c0 .11.09.2.2.2h2.963c.221 0 .4.18.4.4zM10.065 19.564V16.6a.2.2 0 0 0-.2-.2H7.629a.2.2 0 0 0-.2.2v5a1 1 0 0 0 1 1h5a.2.2 0 0 0 .2-.2v-2.236a.2.2 0 0 0-.2-.2h-2.964a.4.4 0 0 1-.4-.4zM10.465 10.036h2.964a.2.2 0 0 0 .2-.2V7.6a.2.2 0 0 0-.2-.2h-5a1 1 0 0 0-1 1v5c0 .11.09.2.2.2h2.236a.2.2 0 0 0 .2-.2v-2.964c0-.22.179-.4.4-.4z"></path>
      </g>
    </svg>
  );
};

export default FullscreenSvg;

import { SvgComponentProps } from '@libs/internalTypes';

const ChatFoldSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <rect x="9" y="20" width="2" height="12" rx="1" transform="rotate(-180 9 20)" fill="currentColor"></rect>
      <rect x="22" y="15" width="10" height="2" rx="1" transform="rotate(-180 22 15)" fill="currentColor"></rect>
      <path
        d="M17 18L20.7879 14.2121C20.905 14.095 20.905 13.905 20.7879 13.7879L17 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      ></path>
    </svg>
  );
};

export default ChatFoldSvg;

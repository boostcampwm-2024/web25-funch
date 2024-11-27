import { SvgComponentProps } from '@libs/internalTypes';

const FullHeart = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <path
        d="M10.0198 6.77894C8.94243 3.98296 3.5 4.39829 3.5 8.6267C3.5 10.6135 4.97427 13.2199 9.20416 15.9063C9.30036 15.9674 9.6265 16.1413 10 16.1427C10.3735 16.1442 10.6793 15.9801 10.7622 15.9276C15.0179 13.2337 16.5 10.6188 16.5 8.6267C16.5 4.42263 11.1031 3.96638 10.0198 6.77894Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      ></path>
      s
    </svg>
  );
};

export default FullHeart;

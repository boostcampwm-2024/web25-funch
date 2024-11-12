import { SvgComponentProps } from '@libs/internalTypes';

const SoundLowSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
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
      <g fill="currentColor" fillRule="evenodd">
        <path d="M17.816 10.382l.098-.007a.7.7 0 0 1 .694.605l.006.095v13.678a.7.7 0 0 1-.982.64l-.091-.048-5.478-3.453H8.7a.7.7 0 0 1-.7-.7v-6.557a.7.7 0 0 1 .7-.7h3.363l5.478-3.452a.7.7 0 0 1 .275-.1l.098-.008zm3.577 3.272a.935.935 0 0 1 .718.25 5.639 5.639 0 0 1 1.789 4.107c0 1.55-.659 3.05-1.784 4.093a.944.944 0 0 1-.858.235.891.891 0 0 1-.665-.598.835.835 0 0 1 .24-.864 3.997 3.997 0 0 0 1.245-2.866 4.012 4.012 0 0 0-1.243-2.871.835.835 0 0 1-.22-.934.906.906 0 0 1 .778-.552z"></path>
        <path
          fillRule="nonzero"
          d="M23.328 11.662a.866.866 0 0 0 .2.908c1.378 1.41 2.303 3.521 2.303 5.44 0 1.919-.923 4.023-2.306 5.437a.865.865 0 1 0 1.243 1.2c1.703-1.74 2.79-4.223 2.79-6.636 0-2.415-1.088-4.904-2.795-6.65a.864.864 0 0 0-1.435.3z"
          opacity=".25"
        ></path>
      </g>
    </svg>
  );
};

export default SoundLowSvg;

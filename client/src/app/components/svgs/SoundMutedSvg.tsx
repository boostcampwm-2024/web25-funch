import { SvgComponentProps } from '@libs/internalTypes';

const SoundMutedSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <path
        fill="#FFF"
        fillRule="evenodd"
        d="M17.816 10.382l.098-.007a.7.7 0 0 1 .694.605l.006.095v13.678a.7.7 0 0 1-.982.64l-.091-.048-5.479-3.453H8.7a.7.7 0 0 1-.7-.7v-6.557a.7.7 0 0 1 .7-.7h3.362l5.479-3.452a.7.7 0 0 1 .275-.1l.098-.008zm10.948 4.383a.9.9 0 0 1 .078 1.18l-.08.093-2.174 2.161 2.173 2.163a.9.9 0 1 1-1.27 1.276l-2.178-2.169-2.178 2.169a.9.9 0 0 1-1.18.078l-.093-.081a.9.9 0 0 1-.078-1.18l.081-.093 2.173-2.162-2.173-2.162a.9.9 0 0 1 1.27-1.276l2.178 2.168 2.178-2.168a.9.9 0 0 1 1.273.003z"
      ></path>
    </svg>
  );
};

export default SoundMutedSvg;

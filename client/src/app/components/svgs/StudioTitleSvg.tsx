import type { SvgComponentProps } from '@libs/internalTypes';

const StudioTitleSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg width="62" height="63" viewBox="0 0 62 63" fill="none" xmlns="http://www.w3.org/2000/svg">
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.4139 9.86356C13.4139 8.04772 14.886 6.57568 16.7018 6.57568H49.2491C51.0649 6.57568 52.5369 8.04772 52.5369 9.86356C52.5369 11.6794 51.0649 13.1514 49.2491 13.1514H35.3931C37.209 13.1514 38.681 14.6235 38.681 16.4393C38.681 18.2552 37.209 19.7272 35.3931 19.7272H53.5455C56.1396 19.7272 58.2425 21.8301 58.2425 24.4242C58.2425 27.0182 56.1396 29.1211 53.5455 29.1211H48.8694H47.6191C47.8485 29.1211 48.0724 29.1446 48.2886 29.1893C46.9916 29.4985 46.0167 30.8226 46.0167 32.409C46.0167 33.9955 46.9916 35.3195 48.2886 35.6287C48.0724 35.6734 47.8485 35.6969 47.6191 35.6969H48.8694H53.5456C56.1397 35.6969 58.2426 37.7998 58.2426 40.3939C58.2426 42.9879 56.1397 45.0908 53.5456 45.0908H38.0593C40.6534 45.0908 42.7563 47.1937 42.7563 49.7878C42.7563 52.3819 40.6534 54.4848 38.0593 54.4848H21.3713C18.7772 54.4848 16.6743 52.3819 16.6743 49.7878C16.6743 47.1937 18.7772 45.0908 21.3713 45.0908H9.96048C7.36641 45.0908 5.26351 42.9879 5.26351 40.3939C5.26351 37.7998 7.36641 35.6969 9.96047 35.6969H14.6368H15.887C15.6576 35.6969 15.4337 35.6734 15.2176 35.6287C16.5146 35.3195 17.4895 33.9955 17.4895 32.409C17.4895 30.8225 16.5146 29.4985 15.2176 29.1893C15.4337 29.1446 15.6576 29.1211 15.887 29.1211H14.6368H7.51521C4.92115 29.1211 2.81824 27.0182 2.81824 24.4242C2.81824 21.8301 4.92114 19.7272 7.51521 19.7272H19.5271H20.7773C20.5479 19.7272 20.324 19.7037 20.1079 19.659C21.4049 19.3498 22.3798 18.0258 22.3798 16.4393C22.3798 14.8528 21.4049 13.5288 20.1079 13.2196C20.324 13.1749 20.5479 13.1514 20.7773 13.1514H19.5271H16.7018C14.886 13.1514 13.4139 11.6794 13.4139 9.86356Z"
        fill="#E4E4E4"
      ></path>
      <g filter="url(#filter0_d_1706_2195)">
        <path
          d="M6.57568 54.0152L9.86356 38.5152L27.712 35.697L22.5454 51.197L6.57568 54.0152Z"
          fill="url(#paint0_linear_1706_2195)"
        ></path>
        <g filter="url(#filter1_i_1706_2195)">
          <rect
            x="47.0031"
            y="2.81812"
            width="16.393"
            height="12.668"
            rx="1.87879"
            transform="rotate(45 47.0031 2.81812)"
            fill="#FF7A8A"
          ></rect>
        </g>
        <g filter="url(#filter2_i_1706_2195)">
          <path
            d="M33.8181 14.5605L9.86353 38.5151L16.4393 39.4545L15.9696 45.0908H22.5453V51.1969L46.4999 27.2424L33.8181 14.5605Z"
            fill="#66C6C0"
          ></path>
        </g>
        <path
          opacity="0.6"
          d="M38.9848 16.9089L15.9696 39.4544V45.0908H22.0757L44.1514 22.0756L43.212 21.1362L38.9848 16.9089Z"
          fill="url(#paint1_linear_1706_2195)"
        ></path>
        <g filter="url(#filter3_di_1706_2195)">
          <rect
            x="38.4897"
            y="6.01392"
            width="23.3399"
            height="9.39394"
            rx="1.87879"
            transform="rotate(45 38.4897 6.01392)"
            fill="#D9D9D9"
          ></rect>
        </g>
        <path
          d="M6.57562 50.2576L5.63623 54.9545L10.3332 54.4848V52.1364H8.45441V50.7273L6.57562 50.2576Z"
          fill="url(#paint2_linear_1706_2195)"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_1706_2195"
          x="1.87865"
          y="2.81812"
          width="60.4736"
          height="59.6516"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feOffset dy="3.75758"></feOffset>
          <feGaussianBlur stdDeviation="1.87879"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1706_2195"></feBlend>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1706_2195" result="shape"></feBlend>
        </filter>
        <filter
          id="filter1_i_1706_2195"
          x="38.8236"
          y="2.65704"
          width="18.9928"
          height="19.9321"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feOffset dy="-0.939394"></feOffset>
          <feGaussianBlur stdDeviation="2.34848"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.795833 0 0 0 0 0.122691 0 0 0 0 0.203671 0 0 0 1 0"
          ></feColorMatrix>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1706_2195"></feBlend>
        </filter>
        <filter
          id="filter2_i_1706_2195"
          x="9.86353"
          y="12.6818"
          width="36.6364"
          height="38.5153"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feOffset dy="-1.87879"></feOffset>
          <feGaussianBlur stdDeviation="3.28788"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.258333 0 0 0 0 0.666667 0 0 0 0 0.641146 0 0 0 1 0"
          ></feColorMatrix>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1706_2195"></feBlend>
        </filter>
        <filter
          id="filter3_di_1706_2195"
          x="30.7467"
          y="5.85284"
          width="25.3474"
          height="25.3474"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feOffset dy="0.939394"></feOffset>
          <feGaussianBlur stdDeviation="0.939394"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1706_2195"></feBlend>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1706_2195" result="shape"></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feOffset dy="-0.939394"></feOffset>
          <feGaussianBlur stdDeviation="1.40909"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1706_2195"></feBlend>
        </filter>
        <linearGradient
          id="paint0_linear_1706_2195"
          x1="17.1439"
          y1="35.697"
          x2="17.1439"
          y2="54.0152"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white"></stop>
          <stop offset="1" stopColor="#C8C5BB"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_1706_2195"
          x1="32.409"
          y1="29.5908"
          x2="11.2726"
          y2="58.712"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#71D7D0"></stop>
          <stop offset="1" stopColor="#5CF3EA"></stop>
        </linearGradient>
        <linearGradient
          id="paint2_linear_1706_2195"
          x1="7.98472"
          y1="50.2576"
          x2="7.98472"
          y2="54.9545"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AE9292"></stop>
          <stop offset="1" stopColor="#A37979"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default StudioTitleSvg;

import type { SvgComponentProps } from '@libs/internalTypes';

const FunchSvg = ({ svgTitle, svgDescription }: SvgComponentProps) => {
  return (
    <svg
      role="img"
      aria-hidden={true}
      focusable={false}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={40}
      height={40}
    >
      {svgTitle && <title>{svgTitle}</title>}
      {svgDescription && <desc>{svgDescription}</desc>}
      <rect x="40" y="50" width="120" height="100" rx="15" fill="var(--content-brand-base)" />

      <rect x="50" y="60" width="100" height="70" rx="10" fill="var(--bg-base)" />

      <circle cx="85" cy="95" r="8" fill="var(--content-brand-base)" />
      <circle cx="115" cy="95" r="8" fill="var(--content-brand-base)" />
      <path d="M92 110 Q100 115 108 110" stroke="var(--content-brand-base)" strokeWidth="4" fill="none" />

      <circle cx="140" cy="140" r="8" fill="var(--bg-base)" />
      <circle cx="140" cy="140" r="4" fill="var(--content-brand-base)" />
      <circle cx="115" cy="140" r="8" fill="var(--bg-base)" />
      <circle cx="115" cy="140" r="4" fill="var(--content-brand-base)" />

      <line x1="80" y1="50" x2="60" y2="20" stroke="var(--content-brand-base)" strokeWidth="4" />
      <line x1="120" y1="50" x2="140" y2="20" stroke="var(--content-brand-base)" strokeWidth="4" />

      <path d="M70 150 L130 150 L120 160 L80 160 Z" fill="var(--content-brand-base)" />
    </svg>
  );
};

export default FunchSvg;

import plugin from 'tailwindcss/plugin';
import { type CSSRuleObject } from 'tailwindcss/types/config';

const FONT_FAMILY = 'var(--font-noto-sans-kr), Arial, Helvetica, sans-serif';

const appFonts = plugin(function ({ addUtilities }) {
  const newUtilities: CSSRuleObject = {
    // bold
    '.funch-bold24': {
      fontFamily: FONT_FAMILY,
      fontSize: '1.5rem', // 24px
      fontWeight: '700',
    },
    '.funch-bold16': {
      fontFamily: FONT_FAMILY,
      fontSize: '1rem', // 16px
      fontWeight: '700',
    },
    '.funch-bold14': {
      fontFamily: FONT_FAMILY,
      fontSize: '0.875rem',
      fontWeight: '700',
      lineHeight: '1rem',
    },
    '.funch-bold12': {
      fontFamily: FONT_FAMILY,
      fontSize: '0.75rem',
      fontWeight: '700',
      lineHeight: '1rem',
    },
    // medium
    '.funch-medium16': {
      fontFamily: FONT_FAMILY,
      fontSize: '1rem',
      fontWeight: '500',
      lineHeight: '1.4rem',
    },
    '.funch-medium14': {
      fontFamily: FONT_FAMILY,
      fontSize: '0.875rem',
      fontWeight: '500',
      lineHeight: '1rem',
    },
    '.funch-medium12': {
      fontFamily: FONT_FAMILY,
      fontSize: '0.75rem',
      fontWeight: '500',
      lineHeight: '1rem',
    },
  };

  addUtilities(newUtilities);
});

export default [appFonts];

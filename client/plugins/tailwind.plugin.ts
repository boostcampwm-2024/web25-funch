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
      lineHeight: '1.5', // 28px
    },
    '.funch-bold20': {
      fontFamily: FONT_FAMILY,
      fontSize: '1.25rem', // 20px
      fontWeight: '700',
      lineHeight: '1.5', // 24px
    },
    '.funch-bold16': {
      fontFamily: FONT_FAMILY,
      fontSize: '1rem', // 16px
      fontWeight: '700',
      lineHeight: '1.5', // 20px
    },
    '.funch-bold14': {
      fontFamily: FONT_FAMILY,
      fontSize: '0.875rem',
      fontWeight: '700',
      lineHeight: '1.5',
    },
    '.funch-bold12': {
      fontFamily: FONT_FAMILY,
      fontSize: '0.75rem',
      fontWeight: '700',
      lineHeight: '1.5',
    },
    '.funch-bold10': {
      fontFamily: FONT_FAMILY,
      fontSize: '0.625rem',
      fontWeight: '700',
      lineHeight: '1.5',
    },
    // medium
    '.funch-medium16': {
      fontFamily: FONT_FAMILY,
      fontSize: '1rem',
      fontWeight: '500',
      lineHeight: '1.5',
    },
    '.funch-medium14': {
      fontFamily: FONT_FAMILY,
      fontSize: '0.875rem',
      fontWeight: '500',
      lineHeight: '1.5',
    },
    '.funch-medium12': {
      fontFamily: FONT_FAMILY,
      fontSize: '0.75rem',
      fontWeight: '500',
      lineHeight: '1.5',
    },
  };

  addUtilities(newUtilities);
});

const appBoxes = plugin(function ({ addUtilities }) {
  const newUtilities: CSSRuleObject = {
    '.funch-scrollable': {
      overflowY: 'auto',
      overscrollBehavior: 'contain',
      scrollbarWidth: 'none',
      '-ms-overflow-style': 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  };

  addUtilities(newUtilities);
});

export default [appFonts, appBoxes];

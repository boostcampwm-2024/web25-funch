import type { Config } from 'tailwindcss';
import tailwindPlugins from './plugins/tailwind.plugin';

// const HEADER_HEIGHT = '3.75rem'; // 60px
const HEADER_HEIGHT = '5rem'; // 80px
const HOME_MIN_HEIGHT = `calc(100vh - ${HEADER_HEIGHT})`;
const LAYOUT_MIN_WIDTH = '58.125rem';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'funch-desktop': '1200px',
      },
      height: {
        header: HEADER_HEIGHT,
      },
      minHeight: {
        home: HOME_MIN_HEIGHT,
      },
      minWidth: {
        layout: LAYOUT_MIN_WIDTH,
      },
      padding: {
        header: HEADER_HEIGHT,
      },
      colors: {
        // Neutral 색상
        neutral: {
          0: 'var(--neutral-0)',
          1: 'var(--neutral-1)',
          2: 'var(--neutral-2)',
          5: 'var(--neutral-5)',
          7: 'var(--neutral-7)',
          10: 'var(--neutral-10)',
          20: 'var(--neutral-20)',
          30: 'var(--neutral-30)',
          40: 'var(--neutral-40)',
          50: 'var(--neutral-50)',
          55: 'var(--neutral-55)',
          60: 'var(--neutral-60)',
          70: 'var(--neutral-70)',
          80: 'var(--neutral-80)',
          90: 'var(--neutral-90)',
          95: 'var(--neutral-95)',
          99: 'var(--neutral-99)',
          100: 'var(--neutral-100)',
        },

        // Cool Gray 색상
        coolgray: {
          5: 'var(--coolgray-5)',
          10: 'var(--coolgray-10)',
          20: 'var(--coolgray-20)',
          30: 'var(--coolgray-30)',
          40: 'var(--coolgray-40)',
          50: 'var(--coolgray-50)',
          60: 'var(--coolgray-60)',
          70: 'var(--coolgray-70)',
          80: 'var(--coolgray-80)',
          90: 'var(--coolgray-90)',
        },

        // Red 색상
        red: {
          5: 'var(--red-5)',
          10: 'var(--red-10)',
          20: 'var(--red-20)',
          30: 'var(--red-30)',
          40: 'var(--red-40)',
          50: 'var(--red-50)',
          55: 'var(--red-55)',
          60: 'var(--red-60)',
          70: 'var(--red-70)',
          80: 'var(--red-80)',
          90: 'var(--red-90)',
        },

        // Violet 색상
        violet: {
          5: 'var(--violet-5)',
          10: 'var(--violet-10)',
          20: 'var(--violet-20)',
          30: 'var(--violet-30)',
          40: 'var(--violet-40)',
          50: 'var(--violet-50)',
          60: 'var(--violet-60)',
          70: 'var(--violet-70)',
          80: 'var(--violet-80)',
          90: 'var(--violet-90)',
        },

        // Background 색상
        bg: {
          weak: 'var(--bg-weak)',
          base: 'var(--bg-base)',
          strong: 'var(--bg-strong)',
        },

        // Surface 색상
        surface: {
          neutral: {
            primary: 'var(--surface-neutral-primary)',
            weak: 'var(--surface-neutral-weak)',
            base: 'var(--surface-neutral-base)',
            strong: 'var(--surface-neutral-strong)',
            inverse: 'var(--surface-neutral-inverse)',
          },
          brand: {
            weak: 'var(--surface-brand-weak)',
            base: 'var(--surface-brand-base)',
            strong: 'var(--surface-brand-strong)',
          },
          red: {
            base: 'var(--surface-red-base)',
            strong: 'var(--surface-red-strong)',
          },
          violet: {
            base: 'var(--surface-violet-base)',
          },
          static: {
            white: 'var(--surface-static-white)',
            coolgray: 'var(--surface-static-coolgray)',
            warmgray: 'var(--surface-static-warmgray)',
            black: 'var(--surface-static-black)',
            blackalpha: {
              weak: 'var(--surface-static-blackalpha-weak)',
              base: 'var(--surface-static-blackalpha-base)',
              strong: 'var(--surface-static-blackalpha-strong)',
            },
          },
        },

        // Content 색상
        content: {
          neutral: {
            primary: 'var(--content-neutral-primary)',
            inverse: 'var(--content-neutral-inverse)',
            weak: 'var(--content-neutral-weak)',
            base: 'var(--content-neutral-base)',
            strong: 'var(--content-neutral-strong)',
          },
          brand: {
            weak: 'var(--content-brand-weak)',
            base: 'var(--content-brand-base)',
            strong: 'var(--content-brand-strong)',
          },
          red: {
            base: 'var(--content-red-base)',
            strong: 'var(--content-red-strong)',
          },
          static: {
            white: 'var(--content-static-white)',
            coolgray: 'var(--content-static-coolgray)',
            warmgray: 'var(--content-static-warmgray)',
            black: 'var(--content-static-black)',
          },
        },

        // Border 색상
        border: {
          neutral: {
            strong: 'var(--border-neutral-strong)',
            base: 'var(--border-neutral-base)',
            weak: 'var(--border-neutral-weak)',
          },
          brand: {
            weak: 'var(--border-brand-weak)',
            base: 'var(--border-brand-base)',
            strong: 'var(--border-brand-strong)',
          },
          red: {
            base: 'var(--border-red-base)',
            strong: 'var(--border-red-strong)',
          },
          static: {
            white: 'var(--border-static-white)',
            whitealpha: {
              base: 'var(--border-static-whitealpha-base)',
              strong: 'var(--border-static-whitealpha-strong)',
            },
            black: 'var(--border-static-black)',
            blackalpha: {
              base: 'var(--border-static-blackalpha-base)',
              strong: 'var(--border-static-blackalpha-strong)',
            },
          },
        },
      },
    },
  },
  plugins: [...tailwindPlugins],
};

export default config;

/*
0 = 0rem = 0px
0.5 = 0.125rem = 2px
1 = 0.25rem = 4px
1.5 = 0.375rem = 6px
2 = 0.5rem = 8px
2.5 = 0.625rem = 10px
3 = 0.75rem = 12px
3.5 = 0.875rem = 14px
4 = 1rem = 16px
5 = 1.25rem = 20px
6 = 1.5rem = 24px
7 = 1.75rem = 28px
8 = 2rem = 32px
9 = 2.25rem = 36px
10 = 2.5rem = 40px
11 = 2.75rem = 44px
12 = 3rem = 48px
14 = 3.5rem = 56px, 58px = 3.625rem
16 = 4rem = 64px
20 = 5rem = 80px
24 = 6rem = 96px
28 = 7rem = 112px
32 = 8rem = 128px
36 = 9rem = 144px'  
40 = 10rem = 160px
44 = 11rem = 176px
48 = 12rem = 192px
52 = 13rem = 208px
56 = 14rem = 224px
60 = 15rem = 240px
64 = 16rem = 256px
72 = 18rem = 288px
80 = 20rem = 320px
96 = 24rem = 384px
*/

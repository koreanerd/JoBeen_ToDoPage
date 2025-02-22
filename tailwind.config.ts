import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        notStarted: 'var(--notStarted)',
        inProgress: 'var(--inProgress)',
        done: 'var(--done)',
        defaultText: 'var(--defaultText)',
        subText: 'var(--subText)',
        fade: 'var(--fade)',
        border: 'var(--border)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', 'sans-serif'],
      },
      fontSize: {
        smallText: '12px',
        body: '14px',
        subHeading: '16px',
        heading: '18px',
        title: '20px',
      },
      screens: {
        'max-lg': { max: '1000px' },
        'max-md': { max: '700px' },
        'max-sm': { max: '500px' },
      },
    },
  },
  plugins: [],
} satisfies Config;

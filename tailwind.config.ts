import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        'title-lg': '48px',
        'title-md': '36px',
        'title-sm': '20px',
        'text-lg': '18px',
        'text-md': '16px',
        'text-sm': '14px',
        caption: '12px',
      },
      lineHeight: {
        'title-lg': '120%',
        'title-md': '120%',
        'title-sm': '130%',
        'text-lg': '140%',
        'text-md': '140%',
        'text-sm': '140%',
        caption: '140%',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        white: '#FFFFFF',
        black: '#121212',
        'medium-gray': '#8B8B8B',
        'normal-gray': '#DEDEDE',
        'light-gray': '#F5F5F5',
        main1: '#0040FF',
        main2: '#D9E2FF',
        sub1: '#F2BA40',
      },
      backgroundColor: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        white: '#FFFFFF',
        black: '#121212',
        'medium-gray': '#8B8B8B',
        'normal-gray': '#DEDEDE',
        'light-gray': '#F5F5F5',
        main1: '#0040FF',
        main2: '#D9E2FF',
        sub1: '#F2BA40',
      },
      textColor: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        white: '#FFFFFF',
        black: '#121212',
        'medium-gray': '#8B8B8B',
        'normal-gray': '#DEDEDE',
        'light-gray': '#F5F5F5',
        main1: '#0040FF',
        main2: '#D9E2FF',
        sub1: '#F2BA40',
      },
    },
  },
  plugins: [],
};
export default config;

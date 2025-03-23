import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
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
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        white: '#FFFFFF',
        black: '#121212',
        'medium-gray': '#8B8B8B',
        'normal-gray': '#DEDEDE',
        'light-gray': '#F5F5F5',
        main1: '#0040FF',
        main2: '#D9E2FF',
        sub1: '#F2BA40',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')],
};
export default config;

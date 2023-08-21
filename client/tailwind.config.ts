import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    fontFamily: {
      unbounded: 'Unbounded',
      montserrat: 'Montserrat, sans-serif'
    },
    borderRadius: {
      half: '5px',
      common: '10px'
    },
    colors: {
      white: {
        common: 'white',
        hover: '#EEEEEE'
      },
      red: {
        common: '#C70000'
      },
      black: {
        common: 'black'
      },
      gray: {
        input: '#F7F7F7',
        bg: '#F5F5F5',
        placeholder: '#8B8B8B',
        common: '#404040'
      }
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: []
};
export default config;

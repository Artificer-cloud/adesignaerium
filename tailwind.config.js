/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ink': '#0e0e0e',
        'bone': '#f5f0e8',
        'muted': '#b8a99a',
        'dim': '#6b6b6b',
        'surface': '#1a1a1a',
        'border': '#2a2a2a',
        'orange': '#ff4d00',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Arial Black', 'sans-serif'],
        body: ['var(--font-body)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'ticker': 'ticker 24s linear infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'blink': 'blink 2s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'wiggle': 'wiggle 3s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(28px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1.5deg)' },
          '50%': { transform: 'rotate(1.5deg)' },
        },
      },
    },
  },
  plugins: [],
}

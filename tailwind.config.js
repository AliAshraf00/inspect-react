/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        bg: '#F7F8F6',
        'bg-warm': '#F1F1EC',
        ink: '#111111',
        emerald: {
          DEFAULT: '#4CBCB4',
          deep: '#19A99F',
          tint: '#E1F6F4',
        },
        orange: {
          DEFAULT: '#F46627',
          tint: '#FBEBE1',
        },
      },
      fontFamily: {
        ar: ['"IBM Plex Sans Arabic"', 'sans-serif'],
        en: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 20px 40px -24px rgba(17,17,17,0.22)',
      },
      keyframes: {
        kenburnA: { from: { transform: 'scale(1) translate(0,0)' }, to: { transform: 'scale(1.14) translate(-2.5%,-1.5%)' } },
        kenburnB: { from: { transform: 'scale(1.12) translate(2.5%,1.5%)' }, to: { transform: 'scale(1) translate(0,0)' } },
        kenburnC: { from: { transform: 'scale(1) translate(0,0)' }, to: { transform: 'scale(1.13) translate(2%,-2%)' } },
        kenburnD: { from: { transform: 'scale(1.13) translate(-2%,2%)' }, to: { transform: 'scale(1) translate(0,0)' } },
        gridDrift: { from: { backgroundPosition: '0 0, 0 0' }, to: { backgroundPosition: '-640px 0, 0 -640px' } },
        dotPulse: { '0%,100%': { opacity: 1, transform: 'scale(1)' }, '50%': { opacity: 0.4, transform: 'scale(1.3)' } },
        blueprintFloat: { '0%,100%': { transform: 'translateY(0) rotate(0deg)' }, '50%': { transform: 'translateY(-16px) rotate(.6deg)' } },
        stageFloat: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-5px)' } },
        hotPulse: {
          '0%,100%': { boxShadow: '0 8px 20px -16px rgba(17,17,17,.25), 0 0 0 0 rgba(217,100,44,.28)' },
          '50%': { boxShadow: '0 8px 20px -16px rgba(17,17,17,.25), 0 0 0 12px rgba(217,100,44,0)' },
        },
        arrowBounce: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(5px)' } },
        centerGlow: { '0%,100%': { filter: 'drop-shadow(0 0 0 rgba(255,255,255,0))' }, '50%': { filter: 'drop-shadow(0 0 6px rgba(255,255,255,.65))' } },
      },
      animation: {
        'kenburn-a': 'kenburnA 3.4s ease-out forwards',
        'kenburn-b': 'kenburnB 3.4s ease-out forwards',
        'kenburn-c': 'kenburnC 3.4s ease-out forwards',
        'kenburn-d': 'kenburnD 3.4s ease-out forwards',
        'grid-drift': 'gridDrift 40s linear infinite',
        'dot-pulse': 'dotPulse 1.8s ease-in-out infinite',
        'blueprint-float': 'blueprintFloat 9s ease-in-out infinite',
        'stage-float': 'stageFloat 4.5s ease-in-out infinite',
        'hot-pulse': 'hotPulse 2.4s ease-in-out infinite',
        'arrow-bounce': 'arrowBounce 1.3s ease-in-out infinite',
        'center-glow': 'centerGlow 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

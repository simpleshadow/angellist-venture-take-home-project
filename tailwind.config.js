module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        angellist: {
          blue: '#0f6fff',
          'off-white': '#f8f7fc',
        },
      },
      scale: {
        101: '1.01',
        102: '1.02',
        103: '1.03',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover'],
    },
  },
  plugins: [],
}

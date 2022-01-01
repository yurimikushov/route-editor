module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      minWidth: {
        5: '1.25rem',
      },
      minHeight: {
        5: '1.25rem',
      },
    },
  },
  plugins: [],
}

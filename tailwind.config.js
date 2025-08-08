module.exports = {
  important: true,
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Lato", "sans-serif"],
    },

    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    outline: false,
  },
};

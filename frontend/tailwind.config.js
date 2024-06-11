const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          700: '#374151',
          800: '#1F2937',
        },
        sky: {
          700: '#0284C7',
          800: '#0369A1',
        },
        emerald: {
          700: '#047857',
          800: '#065F46',
        },
        rose: {
          700: '#BE123C',
          800: '#9F1239',
        },
      },
    },
  },
  plugins: [],
});

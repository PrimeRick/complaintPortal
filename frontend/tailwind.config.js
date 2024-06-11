const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
        colors: {
            sky: {
                100: '#E0F2FE',
                200: '#BAE6FD',
                600: '#0284C7',
                800: '#0369A1',
            },
            slate: {
                100: '#F1F5F9',
                300: '#CBD5E1',
                600: '#475569',
                800: '#1E293B',
            },
            emerald: {
                100: '#D1FAE5',
                200: '#A7F3D0',
                600: '#059669',
                800: '#065F46',
            },
            rose: {
                100: '#FFE4E6',
                200: '#FECDD3',
                600: '#E11D48',
                800: '#9F1239',
            },
        },
    },
},
  plugins: [],
});

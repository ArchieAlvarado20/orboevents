export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#630ed4",
        surface: "#f8f9ff",
      },
    },
  },
};
module.exports = {
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },

        fadeOut: {
          from: {
            opacity: "1",
          },
          to: {
            opacity: "0",
          },
        },
      },

      animation: {
        fadeIn: "fadeIn 0.2s ease",
        fadeOut: "fadeOut 0.2s ease",
      },
    },
  },
};

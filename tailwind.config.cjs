module.exports = {
  // ...
  mode: 'jit', // ⚠ Make sure to have this
  content: ["./src/**/*.svelte"],
  theme: {
    colors: {          
      "primary": "#f260d2",          
      "secondary": "#f9e12c",               
      "accent": "#93ed49",               
      "neutral": "#141624",               
      "base-100": "#f3f4f6",
      "base-200": "#d1d5db",
      "base-300": "#4b5563",
      "base-400": "#1f2937",               
      "info": "#88AFF7",               
      "success": "#5CE0B8",               
      "warning": "#E48007",               
      "error": "#F14B61",
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
}
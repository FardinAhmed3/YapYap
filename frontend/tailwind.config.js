modules.exports = {
    theme: {
      extend: {
        animation: {
          float: 'floatUpDown 2s ease-in-out infinite',
        },
        keyframes: {
          floatUpDown: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          }
        }
      }
    },
    plugins: []
  }
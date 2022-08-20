const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "dodger-blue": "rgba(16,137,255,.9)",
                "light-red": "hsla(0, 100%, 50%, 0.6)"
            },
            keyframes: {
                'player': {
                    'from': {
                        "background-color": "hsla(0, 100%, 50%, 0.6)"
                    },
                    'to': {
                        "background-color": 'rgba(16,137,255,.9)',
                    },
                },
            },
            animation: {
                'player': 'player .4s infinite',
            },
            backgroundImage: {
                'room': "url('@/assets/images/bg-room.png')",
            }
        },
        screens: {
            "2xs": "360px",
            'xs': '480px',
            ...defaultTheme.screens,
        }
    },
    plugins: [],
}

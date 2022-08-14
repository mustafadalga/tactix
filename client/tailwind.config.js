const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "cyber-yellow": "#FFD500",
                "light-blue": "#03a9f4"
            },
            keyframes: {
                'player-left': {
                    'from': {
                        "background-color": "#EF444499"
                    },
                    'to': {
                        "background-color": '#03A9F4',
                    },
                },
                'player-right': {
                    'from': {
                        "background-color": "#EF444499"
                    },
                    'to': {
                        "background-color": '#FFD500',
                    },
                },
            },
            animation: {
                'player-left': 'player-left .4s infinite',
                'player-right': 'player-right .4s infinite',
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

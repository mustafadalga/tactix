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
                "light-red": "hsla(0, 100%, 50%, 0.6)",
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

                // Source : https://www.tutorialspoint.com/css/css_animation_bounce_in_down.htm
                "bounceInDown": {
                    "0%": {
                        opacity: 0,
                        transform: "translateY(-3000px)"
                    },
                    "60%": {
                        opacity: 1,
                        transform: "translateY(25px)"
                    },
                    "75%": {
                        transform: "translateY(-10px)"
                    },
                    "90%": {
                        transform: "translateY(5px)"
                    },
                    "100%": {
                        transform: "translateY(0)"
                    },
                },

                // Source : https://www.tutorialspoint.com/css/css_animation_flip.htm
                "flip": {
                    "0%": {
                        transform: "perspective(500px) rotateY(0)",
                        "animation-timing-function": "ease-out"
                    },
                    "40%": {
                        transform: "perspective(500px) translateZ(150px) rotateY(170deg)",
                        "animation-timing-function": "ease-out"
                    },
                    "50%": {
                        transform: "perspective(500px) translateZ(150px) rotateY(190deg) scale(1)",
                        "animation-timing-function": "ease-in",
                    },
                    "80%": {
                        transform: "perspective(500px) rotateY(360deg) scale(.95)",
                        "animation-timing-function": "ease-in",
                    },
                    "100%": {
                        transform: "perspective(500px) scale(1)",
                        "animation-timing-function": "ease-in",
                    }
                }
            },
            animation: {
                'player': 'player .4s infinite',
                'bounceInDown': 'bounceInDown 1.5s',
                'flip': 'flip 1.5s',
            },
            backgroundImage: {
                'app': "url('@/assets/images/bg.png')",
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

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            animation: {
                sidebaropening: "sidebaropening 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                pokeballopening: "pokeballopening 0.6s forwards 0.2s",
                wobble: "wobble 0.5s ease-in-out",
                pokepop: "pokepop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
                shoot: "shoot 0.9s ease-out forwards",
            },
            keyframes: {
                pokepop: {
                    "0%":   { transform: "scale(1)" },
                    "50%":  { transform: "scale(1.35)" },
                    "100%": { transform: "scale(1)" },
                },
                shoot: {
                    "0%":   { transform: "translateX(0)",    opacity: "0" },
                    "20%":  {                                opacity: "1" },
                    "100%": { transform: "translateX(60px)", opacity: "0" },
                },
                wobble: {
                    "0%, 100%": { transform: "translateX(0)" },
                    "15%": { transform: "translateX(-6px)" },
                    "30%": { transform: "translateX(6px)" },
                    "45%": { transform: "translateX(-5px)" },
                    "60%": { transform: "translateX(5px)" },
                    "75%": { transform: "translateX(-3px)" },
                    "90%": { transform: "translateX(3px)" },
                },
                sidebaropening: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(0)" },
                },
                pokeballopening: {
                    "0%": { "background-position-x": "-73px" },
                    "99.999%": { "background-position-x": "-73px" },
                    "100%": { "background-position-x": "-148px" },
                },
            },
            width: {
                sidebar: "200px",
            },
            height: {
                header: "100px",
            },
            padding: {
                sidebar: "200px",
            },
        },
        screens: {
            mobile: "350px",
            desktop: "1440px",
        },

        colors: {
            white: "#ffffff",
            black: "#000000",
            water: "dodgerblue",
            fire: "rgb(255, 22, 69)",
            grass: "rgb(120, 241, 0)",
            normal: "rgb(227, 222, 178)",
            flying: "rgb(225, 255, 255)",
            poison: "darkmagenta",
            ghost: "mediumpurple",
            psychic: "indigo",
            ground: "rgb(184, 135, 11)",
            dragon: "rgb(68, 104, 104)",
            ice: "rgb(35, 255, 255)",
            bug: "rgb(23, 96, 23)",
            fighting: "rgb(255, 129, 83)",
            rock: "rgb(130, 102, 102)",
            electric: "rgb(240, 240, 0)",
            steel: "rgb(143, 143, 143)",
            dark: "rgb(40, 40, 40)",
            fairy: "hotpink",
        },
    },
    plugins: [],
};

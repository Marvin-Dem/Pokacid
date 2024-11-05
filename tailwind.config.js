/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            animation: {
                sidebaropening: "sidebaropening 1.5s forwards -0.1s",
                pokeballopening: "pokeballopening 0.6s forwards 0.2s",
            },
            keyframes: {
                sidebaropening: {
                    "0%": { marginLeft: "-200px", marginRight: "0" },
                    "100%": { marginLeft: "0", marginRight: "-200px" },
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
            mobile: "375px",
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

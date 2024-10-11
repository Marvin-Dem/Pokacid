/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                water: "dodgerblue",
                fire: "rgb(255, 22, 69)",
                grass: "rgb(120, 241, 0)",
                normal: "rgb(227, 222, 178)",
                flying: "rgb(225, 255, 255)",
                poison: "darkmagenta",
                ghost: "mediumpurple",
                psychic: "indigo",
                ground: "rgba(184, 135, 11, 0.804)",
                dragon: "rgb(68, 104, 104)",
                ice: "rgb(35, 255, 255)",
                bug: "rgb(23, 96, 23)",
                fighting: "rgb(255, 129, 83)",
                rock: "rgb(130, 102, 102)",
                electric: "rgb(240, 240, 0)",
                steel: "rgba(143, 143, 143, 0.716)",
                dark: "rgb(40, 40, 40)",
                fairy: "hotpink",
            },
        },
    },
    plugins: [],
};

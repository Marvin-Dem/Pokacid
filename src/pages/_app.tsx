import "~/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { ThemeContext, Theme } from "~/contexts/ThemeContext";
import ParticleOverlay from "~/components/ParticleOverlay";

export default function App({ Component, pageProps }: AppProps) {
    const [theme, setThemeState] = useState<Theme>("new");

    useEffect(() => {
        const saved = sessionStorage.getItem("pokacid-theme") as Theme | null;
        if (saved === "classic" || saved === "new") setThemeState(saved);
    }, []);

    function setTheme(t: Theme) {
        setThemeState(t);
        sessionStorage.setItem("pokacid-theme", t);
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <ParticleOverlay />
            <Component {...pageProps} />
        </ThemeContext.Provider>
    );
}

import { useState, useEffect, useRef } from "react";
import { useTheme } from "~/contexts/ThemeContext";
import Layout from "~/components/Layout";
import ClassicLayout from "~/components/ClassicLayout";

type Props = { children: React.ReactNode };

export default function ThemedLayout({ children }: Props) {
    const { theme } = useTheme();
    const [displayTheme, setDisplayTheme] = useState(theme);
    const [fading, setFading] = useState(false);
    const prevTheme = useRef(theme);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (theme === prevTheme.current) return;
        prevTheme.current = theme;

        setFading(true);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setDisplayTheme(theme);
            setFading(false);
        }, 140);

        return () => clearTimeout(timerRef.current);
    }, [theme]);

    return (
        <div
            style={{
                opacity: fading ? 0 : 1,
                transition: "opacity 0.14s ease-in-out",
            }}
        >
            {displayTheme === "classic" ? (
                <ClassicLayout>{children}</ClassicLayout>
            ) : (
                <Layout>{children}</Layout>
            )}
        </div>
    );
}

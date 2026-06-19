import { createContext, useContext } from "react";

export type Theme = "new" | "classic";

export type ThemeContextType = {
    theme: Theme;
    setTheme: (t: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: "new",
    setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

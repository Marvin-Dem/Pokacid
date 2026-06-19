import Layout from "~/components/Layout";
import { useEffect } from "react";
import { useTheme } from "~/contexts/ThemeContext";

export default function Home() {
    const { setTheme } = useTheme();
    useEffect(() => { setTheme("new"); }, []);

    return (
        <Layout>
            <p className="text-3xl text-center pt-2 font-semibold pb-8 text-fire">
                Hi, i`m Marvin! Or Acid, if you want! <br /> Feel free to
                explore my first website!
            </p>
            <div className="min-h-[450px]" />
        </Layout>
    );
}

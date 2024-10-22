import Link from "next/link";
import { useState } from "react";

type LayoutProps = {
    children: React.ReactNode;
};
export default function Layout({ children }: LayoutProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="wrapper">
            <header className="header">
                <div
                    onMouseEnter={() => {
                        setIsOpen(true);
                    }}
                    onMouseLeave={() => {
                        setIsOpen(false);
                    }}
                    className="pokeball"
                ></div>
                <div className="pokacid">Pokacid</div>
                <button className="themebutton">Light/Dark</button>
            </header>
            <div className="bodywrapper">
                <div className="body">
                    <main className="main">{children}</main>
                    <footer className="footer">
                        <Link
                            href="https://portfolio-site-marvin.vercel.app/"
                            target="_blank"
                        >
                            About me
                        </Link>
                    </footer>
                </div>
                {isOpen && (
                    <aside
                        onMouseEnter={() => {
                            setIsOpen(true);
                        }}
                        onMouseLeave={() => {
                            setIsOpen(false);
                        }}
                        className="sidebar"
                    >
                        <nav className="navbar">
                            <Link href="/">Go to Homepage</Link>
                            <Link href="/pokedex-site">Watch your Pokedex</Link>
                        </nav>
                    </aside>
                )}
            </div>
        </div>
    );
}

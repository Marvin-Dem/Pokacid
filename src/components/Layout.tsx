import Link from "next/link";

type LayoutProps = {
    children: React.ReactNode;
};
export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <header className="pokacid">Pokacid</header>
            <aside>
                <nav className="navbar">
                    <Link href="/">Go to Homepage</Link>
                    <Link href="/pokedex-site">Watch your Pokedex</Link>
                </nav>
            </aside>
            <main>{children}</main>
            <footer className="footer">About me</footer>
        </>
    );
}

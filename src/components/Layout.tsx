import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

type LayoutProps = {
    children: React.ReactNode;
};
export default function Layout({ children }: LayoutProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-[url('/fire-bg.jpg')]">
            <div className="bg-[url('/fire-sil.png')] bg-right-bottom bg-no-repeat bg-fixed bg-[length:310px_233px] flex flex-col">
                <header className="flex justify-between h-header shadow-[0_5px_black]">
                    <div
                        onMouseEnter={() => {
                            setIsOpen(true);
                        }}
                        onMouseLeave={() => {
                            setIsOpen(false);
                        }}
                        className="flex items-start h-full bg-[url('/pixelpokeball.png')] bg-[0_0] [aspect-ratio:75/100] hover:animate-pokeballopening"
                    ></div>
                    <Image
                        src="/pokacid-logo.png"
                        alt="pokacid logo"
                        width={342}
                        height={100}
                    />
                    <button className="m-2.5">Light/Dark</button>
                </header>
                <div className="min-h-[calc(100vh-100px)] flex flex-row-reverse justify-between">
                    <div className="w-full">
                        <div className="flex items-center flex-col justify-between min-h-full container mx-auto px-sidebar">
                            <main className="p-5 w-full">{children}</main>
                            <footer className="text-white bg-black p-4 px-8 flex text-center rounded-t-lg text-white-shadow-hover">
                                <Link
                                    href="https://portfolio-site-marvin.vercel.app/"
                                    target="_blank"
                                >
                                    About me
                                </Link>
                            </footer>
                        </div>
                    </div>
                    {isOpen && (
                        <aside
                            onMouseEnter={() => {
                                setIsOpen(true);
                            }}
                            onMouseLeave={() => {
                                setIsOpen(false);
                            }}
                            className="flex flex-col p-1 border-r-4 w-sidebar -mr-sidebar animate-sidebaropening z-10"
                        >
                            <nav className="flex flex-col gap-2 text-lg">
                                <Link href="/">Go to Homepage</Link>
                                <Link href="/pokedex-site">
                                    Watch your Pokedex
                                </Link>
                            </nav>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
}

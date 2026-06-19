import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "~/components/ThemeToggle";

type LayoutProps = {
    children: React.ReactNode;
};

function ModernPokeball({ isOpen }: { isOpen: boolean }) {
    return (
        <div className="relative flex-shrink-0" style={{ width: "72px", height: "72px" }}>
            {/* shell — clips all children to the circle */}
            <div
                className="absolute inset-0 rounded-full overflow-hidden"
                style={{ border: "2.5px solid #0d0d0d" }}
            >
                {/* ball interior — visible once lid slides away */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(circle at 50% 35%, #2a0000, #070000)",
                    }}
                />

                {/* ── TOP LID ──────────────────────────────────────────────
                    translateY(-100%) slides the lid straight UP.
                    The overflow:hidden circle clips it as it leaves,
                    so the bottom edge (hinge) clears first and the
                    top arc exits last — exactly like a real Pokéball lid. */}
                <div
                    className="absolute left-0 right-0 top-0"
                    style={{
                        height: "50%",
                        background:
                            "linear-gradient(135deg, #ff5252 0%, #cc0000 48%, #7a0000 100%)",
                        transform: isOpen ? "translateY(-100%)" : "translateY(0)",
                        transition: "transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    {/* shine */}
                    <div
                        style={{
                            position: "absolute",
                            top: "9px",
                            left: "14px",
                            width: "22px",
                            height: "11px",
                            background: "rgba(255,255,255,0.25)",
                            borderRadius: "50%",
                            transform: "rotate(-20deg)",
                        }}
                    />
                </div>

                {/* bottom half — static */}
                <div
                    className="absolute left-0 right-0 bottom-0"
                    style={{
                        height: "50%",
                        background:
                            "linear-gradient(315deg, #b8b8b8 0%, #f0f0f0 55%, #ffffff 100%)",
                    }}
                />

                {/* dividing line */}
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: "calc(50% - 2px)",
                        height: "4px",
                        background: "#0d0d0d",
                        zIndex: 3,
                    }}
                />

                {/* centre button ring */}
                <div
                    style={{
                        position: "absolute",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        top: "calc(50% - 10px)",
                        left: "calc(50% - 10px)",
                        background: "#0d0d0d",
                        zIndex: 4,
                    }}
                />

                {/* centre button inner — glows when open */}
                <div
                    style={{
                        position: "absolute",
                        borderRadius: "50%",
                        width: "12px",
                        height: "12px",
                        top: "calc(50% - 6px)",
                        left: "calc(50% - 6px)",
                        background: isOpen
                            ? "radial-gradient(circle at 38% 35%, #fff5c0, #ffcc44)"
                            : "radial-gradient(circle at 38% 35%, #ffffff, #d0d0d0)",
                        transition: "background 0.32s ease-in-out",
                        zIndex: 5,
                    }}
                />
            </div>

            {/* outer glow — outside overflow:hidden so it's never clipped */}
            <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                    boxShadow: isOpen
                        ? "0 4px 24px rgba(0,0,0,0.8), 0 0 20px rgba(200,80,0,0.45)"
                        : "0 4px 18px rgba(0,0,0,0.7)",
                    transition: "box-shadow 0.32s ease-in-out",
                }}
            />
        </div>
    );
}

export default function Layout({ children }: LayoutProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            style={{
                background:
                    "radial-gradient(ellipse at 65% 70%, #1c0000 0%, #080000 50%, #000000 100%)",
            }}
        >
            <div className="flex flex-col">
                <div className="fixed bottom-0 right-0 p-4 pointer-events-none">
                    <FontAwesomeIcon
                        icon={faDragon}
                        style={{ width: "320px", height: "320px", color: "#420403" }}
                    />
                </div>

                <header
                    className="flex justify-between items-center h-header border-b border-[rgb(160,0,0)]"
                    style={{ padding: "0 24px" }}
                >
                    <div
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                        className="cursor-pointer flex-shrink-0"
                    >
                        <ModernPokeball isOpen={isOpen} />
                    </div>

                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src="/pokacid-logo.png"
                            alt="pokacid logo"
                            width={288}
                            height={84}
                        />
                    </Link>

                    <div
                        className="flex items-center justify-end flex-shrink-0"
                        style={{ width: "120px" }}
                    >
                        <ThemeToggle />
                    </div>
                </header>

                <div className="min-h-[calc(100vh-100px)] flex flex-row-reverse justify-between">
                    <div className="w-full">
                        <div className="flex items-center flex-col justify-between min-h-full container desktop:px-sidebar mx-auto">
                            <main className="py-5 w-full">{children}</main>
                            <footer className="text-white bg-black p-4 px-8 flex text-center rounded-t-lg border border-b-0 border-[rgb(200,0,0)] text-white-shadow-hover">
                                <Link
                                    href="https://portfolio-site-marvin.vercel.app/"
                                    target="_blank"
                                >
                                    About me
                                </Link>
                            </footer>
                        </div>
                    </div>

                    {/* Conditional rendering — same as ClassicLayout, prevents content shift */}
                    {isOpen && (
                        <aside
                            onMouseEnter={() => setIsOpen(true)}
                            onMouseLeave={() => setIsOpen(false)}
                            className="flex flex-col p-4 border-r-4 w-sidebar -mr-sidebar animate-sidebaropening z-10"
                        >
                            <nav className="flex flex-col gap-2 text-lg text-white">
                                <Link href="/">Go to Homepage</Link>
                                <Link href="/pokedex-site">Watch your Pokedex</Link>
                            </nav>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
}

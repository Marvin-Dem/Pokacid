import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useTheme } from "~/contexts/ThemeContext";
import { particleEvents } from "~/utils/particleEvents";

const CLASSIC_COMPATIBLE_ROUTES = ["/pokedex-site", "/detailedpokemon"];

function isClassicCompatible(pathname: string): boolean {
    if (pathname === "/" || pathname === "/classic") return true;
    return CLASSIC_COMPATIBLE_ROUTES.some((r) => pathname.startsWith(r));
}

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [wobble, setWobble] = useState(false);
    const [showBubble, setShowBubble] = useState(false);
    const [popping, setPopping] = useState(false);
    const router = useRouter();
    const bubbleTimeout = useRef<ReturnType<typeof setTimeout>>();
    const railRef = useRef<HTMLButtonElement>(null);
    const isClassic = theme === "classic";

    useEffect(() => () => clearTimeout(bubbleTimeout.current), []);

    function spawnParticles(icon: "classic" | "new") {
        if (!railRef.current) return;
        const r = railRef.current.getBoundingClientRect();
        particleEvents.spawn(icon, r.left + r.width / 2, r.top + r.height / 2);
    }

    function triggerWobble() {
        setWobble(true);
        setShowBubble(true);
        setTimeout(() => setWobble(false), 550);
        clearTimeout(bubbleTimeout.current);
        bubbleTimeout.current = setTimeout(() => setShowBubble(false), 2800);
    }

    function handleToggle() {
        const path = router.pathname;
        if (isClassic) {
            spawnParticles("new");
            setTheme("new");
            setPopping(true);
            setTimeout(() => setPopping(false), 500);
            if (path === "/classic") router.push("/");
        } else {
            if (!isClassicCompatible(path)) {
                triggerWobble();
                return;
            }
            spawnParticles("classic");
            setTheme("classic");
            setPopping(true);
            setTimeout(() => setPopping(false), 500);
            if (path === "/") router.push("/classic");
        }
    }

    return (
        <div className="relative flex items-center gap-2 h-full">
            {/* Speech bubble */}
            {showBubble && (
                <div className="absolute top-full mt-2 right-0 z-50 pointer-events-none">
                    <div
                        className="absolute bottom-full right-8"
                        style={{
                            width: 0, height: 0,
                            borderLeft: "7px solid transparent",
                            borderRight: "7px solid transparent",
                            borderBottom: "7px solid white",
                        }}
                    />
                    <div
                        className="bg-white text-black text-xs rounded-lg px-3 py-2 whitespace-nowrap"
                        style={{ boxShadow: "0 3px 12px rgba(0,0,0,0.5)" }}
                    >
                        Diese Seite gab es damals noch nicht
                    </div>
                </div>
            )}

            {/* NEU label */}
            <span
                className="text-white text-[9px] font-bold tracking-wider select-none transition-opacity duration-300"
                style={{ opacity: isClassic ? 0.35 : 0.9 }}
            >
                NEU
            </span>

            {/* Rail + Pokéball */}
            <button
                ref={railRef}
                onClick={handleToggle}
                aria-label={isClassic ? "Zum neuen Design wechseln" : "Zum Classic Design wechseln"}
                className={`relative focus:outline-none cursor-pointer rounded-full ${wobble ? "animate-wobble" : ""}`}
                style={{ width: "56px", height: "28px", background: "#0d0d0d", border: "1.5px solid #555", flexShrink: 0 }}
            >
                {/* Pokéball spring slide */}
                <div
                    className="absolute top-[3px]"
                    style={{
                        width: "22px",
                        height: "22px",
                        transform: isClassic ? "translateX(31px)" : "translateX(3px)",
                        transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                >
                    <div className={`w-full h-full rounded-full ${popping ? "animate-pokepop" : ""}`}>
                        <div className="absolute top-0 left-0 right-0 rounded-t-full" style={{ height: "50%", background: "#cc0000", border: "1.5px solid #222", borderBottom: "none" }} />
                        <div className="absolute bottom-0 left-0 right-0 rounded-b-full" style={{ height: "50%", background: "#fff", border: "1.5px solid #222", borderTop: "none" }} />
                        <div className="absolute left-0 right-0" style={{ top: "calc(50% - 1px)", height: "2px", background: "#222" }} />
                        <div className="absolute rounded-full" style={{ width: "7px", height: "7px", background: "#fff", border: "1.5px solid #222", top: "calc(50% - 3.5px)", left: "calc(50% - 3.5px)" }} />
                    </div>
                </div>
            </button>

            {/* ALT label */}
            <span
                className="text-white text-[9px] font-bold tracking-wider select-none transition-opacity duration-300"
                style={{ opacity: isClassic ? 0.9 : 0.35 }}
            >
                ALT
            </span>
        </div>
    );
}

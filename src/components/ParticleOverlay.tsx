import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { particleEvents } from "~/utils/particleEvents";

const PARTICLE_AMOUNT = 12;
const ICONS = {
    classic: "/fire-type-classic.gif",
    new: "/fire-type-modern.png",
};

type Particle = {
    id: number;
    angle: number;
    x: number;
    y: number;
    icon: "classic" | "new";
};

export default function ParticleOverlay() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const idRef = useRef(0);

    useEffect(() => {
        particleEvents.register((icon, x, y) => {
            const batch: Particle[] = Array.from({ length: PARTICLE_AMOUNT }, () => ({
                id: idRef.current++,
                angle: Math.random() * 360,
                x,
                y,
                icon,
            }));
            setParticles((prev) => [...prev, ...batch]);
            const ids = new Set(batch.map((p) => p.id));
            setTimeout(
                () => setParticles((prev) => prev.filter((p) => !ids.has(p.id))),
                1000
            );
        });
        return () => particleEvents.register(null);
    }, []);

    if (particles.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
            {particles.map((p) => (
                <div
                    key={p.id}
                    style={{
                        position: "absolute",
                        top: p.y,
                        left: p.x,
                        transform: `rotate(${p.angle}deg)`,
                    }}
                >
                    <div className="animate-shoot">
                        <Image
                            src={ICONS[p.icon]}
                            alt=""
                            width={p.icon === "classic" ? 32 : 24}
                            height={p.icon === "classic" ? 12 : 24}
                            style={{
                                imageRendering:
                                    p.icon === "classic" ? "pixelated" : "auto",
                            }}
                            unoptimized
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

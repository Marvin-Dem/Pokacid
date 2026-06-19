type SpawnFn = (icon: "classic" | "new", x: number, y: number) => void;

let _handler: SpawnFn | null = null;

export const particleEvents = {
    register: (fn: SpawnFn | null) => { _handler = fn; },
    spawn: (icon: "classic" | "new", x: number, y: number) => _handler?.(icon, x, y),
};

import type { Pokemon } from "pokenode-ts";

declare module "pokenode-ts" {
    interface Pokemon {
        cries: {
            latest: string;
            legacy: string;
        };
    }
}

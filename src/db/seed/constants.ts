export const SEED_USER_ID = "";

export const CATEGORY_IDS = {
    programacion: "a0000001-0000-4000-8000-000000000001",
    diseno: "a0000001-0000-4000-8000-000000000002",
    negocios: "a0000001-0000-4000-8000-000000000003",
    moda: "a0000001-0000-4000-8000-000000000004",
    salud: "a0000001-0000-4000-8000-000000000005",
    fotografia: "a0000001-0000-4000-8000-000000000006",
    comida: "a0000001-0000-4000-8000-000000000007",
    interiorismo: "a0000001-0000-4000-8000-000000000008",
    cafe: "a0000001-0000-4000-8000-000000000009",
    cine: "a0000001-0000-4000-8000-000000000010",
    libros: "a0000001-0000-4000-8000-000000000011",
    emprendimiento: "a0000001-0000-4000-8000-000000000012",
} as const;

export const COMMUNITY_IDS = {
    desarrolladoresCdmx: "b0000001-0000-4000-8000-000000000001",
    emprendedoresLatam: "b0000001-0000-4000-8000-000000000002",
    cafeNetworking: "b0000001-0000-4000-8000-000000000003",
} as const;

export const seedImage = (path: string) =>
    `${process.env.APP_URL ?? "http://localhost:3000"}${path}`;

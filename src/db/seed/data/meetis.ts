import { CATEGORY_IDS, COMMUNITY_IDS, SEED_USER_ID, seedImage } from "../constants";

type MeetiLocationSeed = {
    id: string;
    placeName: string;
    address: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
};

type MeetiSeed = {
    id: string;
    title: string;
    details: string;
    availableSeats: number;
    date: string;
    time: string;
    image: string;
    communityId: string;
    categoryId: string;
    createdBy: string;
    virtual: boolean;
    location?: MeetiLocationSeed;
};

export const meetis: MeetiSeed[] = [
    {
        id: "c0000001-0000-4000-8000-000000000001",
        title: "Meetup de React y Next.js",
        details: "Sesión presencial para repasar las novedades de React 19 y Next.js 16. Incluye demos en vivo, espacio para preguntas y networking al final del evento.",
        availableSeats: 40,
        date: "2026-07-18",
        time: "18:30:00",
        image: seedImage("/img/default.jpg"),
        communityId: COMMUNITY_IDS.desarrolladoresCdmx,
        categoryId: CATEGORY_IDS.programacion,
        createdBy: SEED_USER_ID,
        virtual: false,
        location: {
            id: "d0000001-0000-4000-8000-000000000001",
            placeName: "WeWork Reforma",
            address: "Paseo de la Reforma 296, Juárez",
            city: "Ciudad de México",
            country: "México",
            lat: 19.4284,
            lng: -99.1676,
        },
    },
    {
        id: "c0000001-0000-4000-8000-000000000002",
        title: "Webinar: Validación de ideas de negocio",
        details: "Taller virtual para aprender a validar ideas antes de construir un producto. Veremos entrevistas a usuarios, experimentos rápidos y métricas clave para founders.",
        availableSeats: 100,
        date: "2026-07-25",
        time: "19:00:00",
        image: seedImage("/img/default.jpg"),
        communityId: COMMUNITY_IDS.emprendedoresLatam,
        categoryId: CATEGORY_IDS.negocios,
        createdBy: SEED_USER_ID,
        virtual: true,
    },
    {
        id: "c0000001-0000-4000-8000-000000000003",
        title: "Workshop de fotografía urbana",
        details: "Salida fotográfica guiada por el centro histórico. Aprenderás composición, luz natural y técnicas básicas de edición mientras recorremos puntos icónicos de la ciudad.",
        availableSeats: 15,
        date: "2026-08-02",
        time: "09:00:00",
        image: seedImage("/img/default.jpg"),
        communityId: COMMUNITY_IDS.cafeNetworking,
        categoryId: CATEGORY_IDS.fotografia,
        createdBy: SEED_USER_ID,
        virtual: false,
        location: {
            id: "d0000001-0000-4000-8000-000000000002",
            placeName: "Palacio de Bellas Artes",
            address: "Av. Juárez s/n, Centro",
            city: "Ciudad de México",
            country: "México",
            lat: 19.4352,
            lng: -99.1412,
        },
    },
    {
        id: "c0000001-0000-4000-8000-000000000004",
        title: "Pitch night para startups early-stage",
        details: "Evento virtual donde cinco startups presentan su pitch en 5 minutos. Habrá feedback de mentores y votación del público para elegir la presentación destacada de la noche.",
        availableSeats: 80,
        date: "2026-08-10",
        time: "20:00:00",
        image: seedImage("/img/default.jpg"),
        communityId: COMMUNITY_IDS.emprendedoresLatam,
        categoryId: CATEGORY_IDS.emprendimiento,
        createdBy: SEED_USER_ID,
        virtual: true,
    },
    {
        id: "c0000001-0000-4000-8000-000000000005",
        title: "Café con founders",
        details: "Encuentro presencial y casual para founders, freelancers y profesionales curiosos. Conversaciones abiertas, intercambio de contactos y un buen café para empezar el día.",
        availableSeats: 25,
        date: "2026-08-16",
        time: "08:30:00",
        image: seedImage("/img/default.jpg"),
        communityId: COMMUNITY_IDS.cafeNetworking,
        categoryId: CATEGORY_IDS.cafe,
        createdBy: SEED_USER_ID,
        virtual: false,
        location: {
            id: "d0000001-0000-4000-8000-000000000003",
            placeName: "Café Avellaneda",
            address: "Córdoba 225, Roma Norte",
            city: "Ciudad de México",
            country: "México",
            lat: 19.4167,
            lng: -99.1625,
        },
    },
    {
        id: "c0000001-0000-4000-8000-000000000006",
        title: "Introducción a TypeScript avanzado",
        details: "Sesión técnica para developers con experiencia en JavaScript que quieren profundizar en TypeScript: generics, utility types, inferencia y patrones para apps en producción.",
        availableSeats: 35,
        date: "2026-08-22",
        time: "17:00:00",
        image: seedImage("/img/default.jpg"),
        communityId: COMMUNITY_IDS.desarrolladoresCdmx,
        categoryId: CATEGORY_IDS.programacion,
        createdBy: SEED_USER_ID,
        virtual: false,
        location: {
            id: "d0000001-0000-4000-8000-000000000004",
            placeName: "Centro de Innovación",
            address: "Insurgentes Sur 1457, Del Valle",
            city: "Ciudad de México",
            country: "México",
            lat: 19.3811,
            lng: -99.1786,
        },
    },
];

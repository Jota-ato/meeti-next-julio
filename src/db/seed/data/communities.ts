import { COMMUNITY_IDS, SEED_USER_ID, seedImage } from "../constants";

export const communities = [
    {
        id: COMMUNITY_IDS.desarrolladoresCdmx,
        name: "Desarrolladores CDMX",
        description: "Comunidad para developers en Ciudad de México. Compartimos meetups, workshops y oportunidades de networking sobre web, mobile y cloud.",
        createdBy: SEED_USER_ID,
        image: seedImage("/img/default.jpg"),
    },
    {
        id: COMMUNITY_IDS.emprendedoresLatam,
        name: "Emprendedores LATAM",
        description: "Espacio para founders y builders de Latinoamérica. Charlas, mentorías y conexiones para hacer crecer proyectos y startups.",
        createdBy: SEED_USER_ID,
        image: seedImage("/img/default.jpg"),
    },
    {
        id: COMMUNITY_IDS.cafeNetworking,
        name: "Café y Networking",
        description: "Encuentros informales para conocer gente nueva, intercambiar ideas y crear conexiones en un ambiente relajado con buen café.",
        createdBy: SEED_USER_ID,
        image: seedImage("/img/default.jpg"),
    },
];

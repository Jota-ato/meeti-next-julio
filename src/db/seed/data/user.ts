import { SEED_USER_ID, seedImage } from "../constants";

export const seedUser = {
    id: SEED_USER_ID,
    name: "Julio Meeti",
    bio: "Organizador de eventos tech y comunidades en Ciudad de México.",
    email: "seed@meeti.dev",
    emailVerified: true,
    image: seedImage("/img/default.jpg"),
};

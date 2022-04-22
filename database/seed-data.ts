

interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}



export const seedData:SeedData = {
    entries: [
        {
            description: 'Pendiente: Lorem Ipsum in pretium tempor invidunt ut labore et que dice el tio',
            status: 'in-progress',
            createdAt: Date.now(),
        },
        {
           description: 'En Progreso: Lorem Ipsum in pretium tempor invidunt ut labore et',
           status: 'pending',
           createdAt: Date.now() - 10000000,
       },
       {
           description: 'Completadas: Lorem Ipsum in pretium tempor invidunt ut labore et d224 2dp,2pd,2 p2d,',
           status: 'finished',
           createdAt: Date.now() - 100000,
       }
    ],
}
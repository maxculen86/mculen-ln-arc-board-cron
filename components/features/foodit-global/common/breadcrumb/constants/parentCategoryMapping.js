export const PARENT_CATEGORY_PATTERNS = {
    // Aprende en la cocina patterns
    'tutorial cocina salada': {
        parentId: '/aprende-en-la-cocina',
        parentName: 'Aprende en la cocina'
    },
    'tutorial pastelería': {
        parentId: '/aprende-en-la-cocina',
        parentName: 'Aprende en la cocina'
    }
};

export const PARENT_CATEGORY_MAPPING = {
    // Aprende en la cocina children
    '/masterclass': {
        parentId: '/aprende-en-la-cocina',
        parentName: 'Aprende en la cocina'
    },
    '/guias-de-cocina': {
        parentId: '/aprende-en-la-cocina',
        parentName: 'Aprende en la cocina'
    },
    '/chefs': {
        parentId: '/aprende-en-la-cocina',
        parentName: 'Aprende en la cocina'
    },
    '/trucos': {
        parentId: '/aprende-en-la-cocina',
        parentName: 'Aprende en la cocina'
    },
    '/protocolo': {
        parentId: '/aprende-en-la-cocina',
        parentName: 'Aprende en la cocina'
    },

    // Cocina fácil y rápido children
    '/recetas/que-cocinar-hoy/meal-prep': {
        parentId: '/cocina-facil-y-rapido',
        parentName: 'Cociná fácil y rápido'
    },
    '/recetas/que-cocinar-hoy/facil': {
        parentId: '/cocina-facil-y-rapido',
        parentName: 'Cociná fácil y rápido'
    },
    '/recetas/que-cocinar-hoy/rapida': {
        parentId: '/cocina-facil-y-rapido',
        parentName: 'Cociná fácil y rápido'
    },

    // Cocina a tu medida children
    '/menu-semanal': {
        parentId: '/cocina-a-tu-medida',
        parentName: 'Cociná a tu medida'
    },
    '/ingredientes': {
        parentId: '/cocina-a-tu-medida',
        parentName: 'Cociná a tu medida'
    },
    '/recetas/dieta/vegetariana': {
        parentId: '/cocina-a-tu-medida',
        parentName: 'Cociná a tu medida'
    },
    '/recetas/dieta/sin-gluten': {
        parentId: '/cocina-a-tu-medida',
        parentName: 'Cociná a tu medida'
    },
    '/recetas/dieta/keto': {
        parentId: '/cocina-a-tu-medida',
        parentName: 'Cociná a tu medida'
    },
    '/recetas/dieta/sin-lactosa': {
        parentId: '/cocina-a-tu-medida',
        parentName: 'Cociná a tu medida'
    },
    '/recetas/dieta/vegana': {
        parentId: '/cocina-a-tu-medida',
        parentName: 'Cociná a tu medida'
    },
    '/recetas/que-cocinar-hoy/saludable': {
        parentId: '/cocina-a-tu-medida',
        parentName: 'Cociná a tu medida'
    },

    // Recetas children
    '/recetas/saladas': {
        parentId: '/recetas',
        parentName: 'Recetas'
    },
    '/recetas/dulces': {
        parentId: '/recetas',
        parentName: 'Recetas'
    },
    '/recetas/bebidas': {
        parentId: '/recetas',
        parentName: 'Recetas'
    },
    '/recetas/que-cocinar-hoy/de-autor': {
        parentId: '/recetas',
        parentName: 'Recetas'
    },
    '/tendencias': {
        parentId: '/recetas',
        parentName: 'Recetas'
    },
    '/chefs-protagonistas': {
        parentId: '/recetas',
        parentName: 'Recetas'
    }
};

export const findParentByPattern = (name = '', title = '') => {
    const searchText = `${name} ${title}`.toLowerCase();

    const found = Object.entries(PARENT_CATEGORY_PATTERNS).find(([pattern]) =>
        searchText.includes(pattern)
    );

    return found ? found[1] : null;
};

import React from 'react';
import dictionary from '../environment/dictionary/lanacionar-prod.json';

jest.mock('fusion:environment', () => {
    return {
        IS_DEV: false,
        IS_SANDBOX: false,
        API_ENV: 'prod',
        RESIZER_URL:
            'https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer',
        API_INGRESAR: 'https://api-ingresar.lanacion.com.ar',
        RELOGIN_VALIDATION: '8121600000',
        SITIO_SEGURO_REGISTRACION: 'https://ingresar.lanacion.com.ar',
        LOGIN_URL: 'https://ingresar.lanacion.com.ar/ingresar/D/1/?callback=',
        COOKIE_EXPIRATION: '8640000000',
        DOMINIO_COOKIE: '.lanacion.com.ar',
        RANKING_URL:
            'https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/arcio/ans/most-read/',
        OPTA_WIDGET_URL: 'https://recetas.lanacion.com.ar/opta-embed',
        LANACIONAR_URLASSETS:
            'https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com',
        SITE_LANACION: 'https://www.lanacion.com.ar',
        SITE_RECETAS: 'https://recetas.lanacion.com.ar',
        DICTIONARY: {
            categories: [
                {
                    _id: '65',
                    ArcSectionId: '/cultura',
                    name: 'Cultura',
                    migrada: false
                },
                {
                    _id: '62',
                    ArcSectionId: '/transito',
                    name: 'Tránsito',
                    migrada: false
                },
                {
                    _id: '132',
                    ArcSectionId: '/espectaculos',
                    name: 'Espectáculos',
                    migrada: false
                },
                {
                    _id: '133',
                    ArcSectionId: '/cine',
                    name: 'Cine',
                    migrada: false
                },
                {
                    _id: '139',
                    ArcSectionId: '/teatro',
                    name: 'Teatro',
                    migrada: false
                },
                {
                    _id: '67',
                    ArcSectionId: '/deportes',
                    name: 'Deportes',
                    migrada: false
                },
                {
                    _id: '144',
                    ArcSectionId: '/moda-y-belleza',
                    name: 'Moda y Belleza',
                    migrada: false
                },
                {
                    _id: '70',
                    ArcSectionId: '/automovilismo',
                    name: 'Automovilismo',
                    migrada: false
                },
                {
                    _id: '64',
                    ArcSectionId: '/comunidad',
                    name: 'Comunidad',
                    migrada: false
                },
                {
                    _id: '152',
                    ArcSectionId: '/inmuebles-comerciales',
                    name: 'Inmuebles Comerciales',
                    migrada: false
                },
                {
                    _id: '75',
                    ArcSectionId: '/futbol',
                    name: 'Fútbol',
                    migrada: false
                },
                {
                    _id: '71',
                    ArcSectionId: '/basquetbol',
                    name: 'Basquetbol',
                    migrada: false
                },
                {
                    _id: '117',
                    ArcSectionId: '/tenis',
                    name: 'Tenis',
                    migrada: false
                },
                {
                    _id: '113',
                    ArcSectionId: '/rugby',
                    name: 'Rugby',
                    migrada: false
                },
                {
                    _id: '123',
                    ArcSectionId: '/economia',
                    name: 'Economía',
                    migrada: true
                },
                {
                    _id: '146',
                    ArcSectionId: '/opinion',
                    name: 'Opinión',
                    migrada: false
                },
                {
                    _id: '150',
                    ArcSectionId: '/politica',
                    name: 'Política',
                    migrada: false
                },
                {
                    _id: '124',
                    ArcSectionId: '/campo',
                    name: 'Campo',
                    migrada: false
                },
                {
                    _id: '125',
                    ArcSectionId: '/comercio-exterior',
                    name: 'Comercio Exterior',
                    migrada: false
                },
                {
                    _id: '57',
                    ArcSectionId: '/arquitectura',
                    name: 'Arquitectura',
                    migrada: false
                },
                {
                    _id: '59',
                    ArcSectionId: '/al-volante',
                    name: 'Al Volante',
                    migrada: false
                },
                {
                    _id: '127',
                    ArcSectionId: '/empleos',
                    name: 'Empleos',
                    migrada: false
                },
                {
                    _id: '185',
                    ArcSectionId: '/tecnologia',
                    name: 'Tecnología',
                    migrada: false
                },
                {
                    _id: '142',
                    ArcSectionId: '/la-nacion-revista',
                    name: 'LA NACION Revista',
                    migrada: false
                },
                {
                    _id: '188',
                    ArcSectionId: '/turismo',
                    name: 'Turismo',
                    migrada: false
                },
                {
                    _id: '129',
                    ArcSectionId: '/editoriales',
                    name: 'Editoriales',
                    migrada: false
                },
                {
                    _id: '147',
                    ArcSectionId: '/carta-de-lectores',
                    name: 'Carta de lectores',
                    migrada: false
                },
                {
                    _id: '135',
                    ArcSectionId: '/musica',
                    name: 'Música',
                    migrada: false
                },
                {
                    _id: '134',
                    ArcSectionId: '/danza',
                    name: 'Danza',
                    migrada: false
                },
                {
                    _id: '137',
                    ArcSectionId: '/radio',
                    name: 'Radio',
                    migrada: false
                },
                {
                    _id: '140',
                    ArcSectionId: '/television',
                    name: 'Televisión',
                    migrada: false
                },
                {
                    _id: '151',
                    ArcSectionId: '/propiedades',
                    name: 'Propiedades',
                    migrada: false
                },
                {
                    _id: '187',
                    ArcSectionId: '/the-wall-street-journal-americas',
                    name: 'The Wall Street Journal Americas',
                    migrada: false
                },
                {
                    _id: '131',
                    ArcSectionId: '/el-mundo',
                    name: 'El Mundo',
                    migrada: false
                },
                {
                    _id: '143',
                    ArcSectionId: '/lifestyle',
                    name: 'Lifestyle',
                    migrada: false
                },
                {
                    _id: '182',
                    ArcSectionId: '/salud',
                    name: 'Salud',
                    migrada: false
                },
                {
                    _id: '145',
                    ArcSectionId: '/moda',
                    name: 'Moda',
                    migrada: false
                },
                {
                    _id: '63',
                    ArcSectionId: '/ciencia',
                    name: 'Ciencia',
                    migrada: false
                },
                {
                    _id: '148',
                    ArcSectionId: '/miradas',
                    name: 'Miradas',
                    migrada: false
                },
                {
                    _id: '184',
                    ArcSectionId: '/sociedad',
                    name: 'Sociedad',
                    migrada: false
                },
                {
                    _id: '61',
                    ArcSectionId: '/buenos-aires',
                    name: 'Buenos Aires',
                    migrada: false
                },
                {
                    _id: '183',
                    ArcSectionId: '/seguridad',
                    name: 'Seguridad',
                    migrada: false
                },
                {
                    _id: '191',
                    ArcSectionId: '/edicion-empresa',
                    name: 'Edicion Empresa',
                    migrada: false
                },
                {
                    _id: '141',
                    ArcSectionId: '/ideas',
                    name: 'Ideas',
                    migrada: false
                },
                {
                    _id: '153',
                    ArcSectionId: '/revista-brando',
                    name: 'Revista Brando',
                    migrada: false
                },
                {
                    _id: '170',
                    ArcSectionId: '/revista-lugares',
                    name: 'Revista Lugares',
                    migrada: false
                },
                {
                    _id: '156',
                    ArcSectionId: '/revista-jardin',
                    name: 'Revista Jardín',
                    migrada: false
                },
                {
                    _id: '154',
                    ArcSectionId: '/revista-hola',
                    name: 'Revista ¡HOLA!',
                    migrada: false
                },
                {
                    _id: '157',
                    ArcSectionId: '/revista-living',
                    name: 'Revista Living',
                    migrada: false
                },
                {
                    _id: '172',
                    ArcSectionId: '/revista-ohlala',
                    name: 'Revista OHLALÁ!',
                    migrada: false
                },
                {
                    _id: '177',
                    ArcSectionId: '/revista-rolling-stone',
                    name: 'Revista Rolling Stone',
                    migrada: false
                },
                {
                    _id: '128',
                    ArcSectionId: '/industria',
                    name: 'Industria',
                    migrada: false
                },
                {
                    _id: '103',
                    ArcSectionId: '/futsal',
                    name: 'Futsal',
                    migrada: false
                },
                {
                    _id: '116',
                    ArcSectionId: '/taekwondo',
                    name: 'Taekwondo',
                    migrada: false
                },
                {
                    _id: '119',
                    ArcSectionId: '/ufc',
                    name: 'UFC',
                    migrada: false
                },
                {
                    _id: '115',
                    ArcSectionId: '/surf',
                    name: 'Surf',
                    migrada: false
                },
                {
                    _id: '130',
                    ArcSectionId: '/educacion',
                    name: 'Educación',
                    migrada: false
                },
                {
                    _id: '136',
                    ArcSectionId: '/personajes',
                    name: 'Personajes',
                    migrada: false
                },
                {
                    _id: '138',
                    ArcSectionId: '/series-de-tv',
                    name: 'Series de tv',
                    migrada: false
                },
                {
                    _id: '189',
                    ArcSectionId: '/viajes',
                    name: 'Viajes',
                    migrada: false
                },
                {
                    _id: '58',
                    ArcSectionId: '/autos',
                    name: 'Autos',
                    migrada: false
                },
                {
                    _id: '126',
                    ArcSectionId: '/dolar',
                    name: 'Dólar Hoy',
                    migrada: false
                },
                {
                    _id: '114',
                    ArcSectionId: '/running',
                    name: 'Running',
                    migrada: false
                },
                {
                    _id: '43',
                    ArcSectionId: '/recetas',
                    name: 'Recetas',
                    migrada: false
                },
                {
                    _id: '44',
                    ArcSectionId: '/platos-de-comida-principal',
                    name: 'Platos de comida principal',
                    migrada: false
                },
                {
                    _id: '45',
                    ArcSectionId: '/postres',
                    name: 'Postres',
                    migrada: false
                },
                {
                    _id: '46',
                    ArcSectionId: '/dulces',
                    name: 'Dulces',
                    migrada: false
                },
                {
                    _id: '47',
                    ArcSectionId: '/entradas',
                    name: 'Entradas',
                    migrada: false
                },
                {
                    _id: '48',
                    ArcSectionId: '/carnes',
                    name: 'Carnes',
                    migrada: false
                },
                {
                    _id: '49',
                    ArcSectionId: '/tortas',
                    name: 'Tortas',
                    migrada: false
                },
                {
                    _id: '50',
                    ArcSectionId: '/pollo',
                    name: 'Pollo',
                    migrada: false
                },
                {
                    _id: '51',
                    ArcSectionId: '/faciles-y-rapidas',
                    name: 'Fáciles y rápidas',
                    migrada: false
                },
                {
                    _id: '52',
                    ArcSectionId: '/ensaladas',
                    name: 'Ensaladas',
                    migrada: false
                },
                {
                    _id: '53',
                    ArcSectionId: '/guarniciones',
                    name: 'Guarniciones',
                    migrada: false
                },
                {
                    _id: '54',
                    ArcSectionId: '/vegetarianas',
                    name: 'Vegetarianas',
                    migrada: false
                },
                {
                    _id: '55',
                    ArcSectionId: '/celiacos-sin-gluten',
                    name: 'Celíacos sin gluten',
                    migrada: false
                },
                {
                    _id: '56',
                    ArcSectionId: '/veganas',
                    name: 'Veganas',
                    migrada: false
                },
                {
                    _id: '60',
                    ArcSectionId: '/bbc-mundo',
                    name: 'BBC Mundo',
                    migrada: false
                },
                {
                    _id: '66',
                    ArcSectionId: '/data',
                    name: 'LA NACION Data',
                    migrada: false
                },
                {
                    _id: '68',
                    ArcSectionId: '/ajedrez',
                    name: 'Ajedrez',
                    migrada: false
                },
                {
                    _id: '69',
                    ArcSectionId: '/atletismo',
                    name: 'Atletismo',
                    migrada: false
                },
                {
                    _id: '72',
                    ArcSectionId: '/boxeo',
                    name: 'Boxeo',
                    migrada: false
                },
                {
                    _id: '73',
                    ArcSectionId: '/ciclismo',
                    name: 'Ciclismo',
                    migrada: false
                },
                {
                    _id: '74',
                    ArcSectionId: '/equitacion',
                    name: 'Equitación',
                    migrada: false
                },
                {
                    _id: '76',
                    ArcSectionId: '/aldosivi',
                    name: 'Aldosivi',
                    migrada: false
                },
                {
                    _id: '77',
                    ArcSectionId: '/argentinos-juniors',
                    name: 'Argentinos Juniors',
                    migrada: false
                },
                {
                    _id: '78',
                    ArcSectionId: '/arsenal',
                    name: 'Arsenal',
                    migrada: false
                },
                {
                    _id: '79',
                    ArcSectionId: '/atletico-tucuman',
                    name: 'Atlético Tucumán',
                    migrada: false
                },
                {
                    _id: '80',
                    ArcSectionId: '/banfield',
                    name: 'Banfield',
                    migrada: false
                },
                {
                    _id: '81',
                    ArcSectionId: '/belgrano',
                    name: 'Belgrano',
                    migrada: false
                },
                {
                    _id: '82',
                    ArcSectionId: '/boca-juniors',
                    name: 'Boca Juniors',
                    migrada: false
                },
                {
                    _id: '83',
                    ArcSectionId: '/central-cordoba',
                    name: 'Central Córdoba',
                    migrada: false
                },
                {
                    _id: '84',
                    ArcSectionId: '/colon',
                    name: 'Colón',
                    migrada: false
                },
                {
                    _id: '85',
                    ArcSectionId: '/defensa-y-justicia',
                    name: 'Defensa y Justicia',
                    migrada: false
                },
                {
                    _id: '86',
                    ArcSectionId: '/estudiantes-la-plata',
                    name: 'Estudiantes La Plata',
                    migrada: false
                },
                {
                    _id: '87',
                    ArcSectionId: '/gimnasia-y-esgrima',
                    name: 'Gimnasia y esgrima',
                    migrada: false
                },
                {
                    _id: '88',
                    ArcSectionId: '/godoy-cruz',
                    name: 'Godoy Cruz',
                    migrada: false
                },
                {
                    _id: '89',
                    ArcSectionId: '/huracan',
                    name: 'Huracán',
                    migrada: false
                },
                {
                    _id: '90',
                    ArcSectionId: '/independiente',
                    name: 'Independiente',
                    migrada: false
                },
                {
                    _id: '91',
                    ArcSectionId: '/lanus',
                    name: 'Lanús',
                    migrada: false
                },
                {
                    _id: '92',
                    ArcSectionId: '/newells',
                    name: 'Newells',
                    migrada: false
                },
                {
                    _id: '93',
                    ArcSectionId: '/patronato',
                    name: 'Patronato',
                    migrada: false
                },
                {
                    _id: '94',
                    ArcSectionId: '/racing',
                    name: 'Racing',
                    migrada: false
                },
                {
                    _id: '95',
                    ArcSectionId: '/river-plate',
                    name: 'River Plate',
                    migrada: false
                },
                {
                    _id: '96',
                    ArcSectionId: '/rosario-central',
                    name: 'Rosario Central',
                    migrada: false
                },
                {
                    _id: '97',
                    ArcSectionId: '/san-lorenzo',
                    name: 'San Lorenzo',
                    migrada: false
                },
                {
                    _id: '98',
                    ArcSectionId: '/san-martin-tucuman',
                    name: 'San Martín Tucumán',
                    migrada: false
                },
                {
                    _id: '99',
                    ArcSectionId: '/talleres-cordoba',
                    name: 'Talleres Córdoba',
                    migrada: false
                },
                {
                    _id: '100',
                    ArcSectionId: '/tigre',
                    name: 'Tigre',
                    migrada: false
                },
                {
                    _id: '101',
                    ArcSectionId: '/union',
                    name: 'Unión',
                    migrada: false
                },
                {
                    _id: '102',
                    ArcSectionId: '/velez',
                    name: 'Vélez',
                    migrada: false
                },
                {
                    _id: '104',
                    ArcSectionId: '/gimnasia',
                    name: 'Gimnasia',
                    migrada: false
                },
                {
                    _id: '105',
                    ArcSectionId: '/golf',
                    name: 'Golf',
                    migrada: false
                },
                {
                    _id: '106',
                    ArcSectionId: '/handball',
                    name: 'Handball',
                    migrada: false
                },
                {
                    _id: '107',
                    ArcSectionId: '/hockey',
                    name: 'Hockey',
                    migrada: false
                },
                {
                    _id: '108',
                    ArcSectionId: '/judo',
                    name: 'Judo',
                    migrada: false
                },
                {
                    _id: '109',
                    ArcSectionId: '/natacion',
                    name: 'Natación',
                    migrada: false
                },
                {
                    _id: '110',
                    ArcSectionId: '/polo',
                    name: 'Polo',
                    migrada: false
                },
                {
                    _id: '111',
                    ArcSectionId: '/remo',
                    name: 'Remo',
                    migrada: false
                },
                {
                    _id: '112',
                    ArcSectionId: '/remo',
                    name: 'Remo',
                    migrada: false
                },
                {
                    _id: '118',
                    ArcSectionId: '/turf',
                    name: 'Turf',
                    migrada: false
                },
                {
                    _id: '120',
                    ArcSectionId: '/vela',
                    name: 'Vela',
                    migrada: false
                },
                {
                    _id: '121',
                    ArcSectionId: '/voley',
                    name: 'Voley',
                    migrada: false
                },
                {
                    _id: '122',
                    ArcSectionId: '/diario-el-pais',
                    name: 'Diario El País',
                    migrada: false
                },
                {
                    _id: '149',
                    ArcSectionId: '/ovbrik',
                    name: 'Ovrik',
                    migrada: false
                },
                {
                    _id: '155',
                    ArcSectionId: '/estilo-hola',
                    name: 'Estilo ¡HOLA!',
                    migrada: false
                },
                {
                    _id: '158',
                    ArcSectionId: '/agenda-living',
                    name: 'Agenda Living',
                    migrada: false
                },
                {
                    _id: '159',
                    ArcSectionId: '/banos',
                    name: 'Baños',
                    migrada: false
                },
                {
                    _id: '160',
                    ArcSectionId: '/cocinas',
                    name: 'Cocinas',
                    migrada: false
                },
                {
                    _id: '161',
                    ArcSectionId: '/comedores',
                    name: 'Comedores',
                    migrada: false
                },
                {
                    _id: '162',
                    ArcSectionId: '/dormitorios',
                    name: 'Dormitorios',
                    migrada: false
                },
                {
                    _id: '163',
                    ArcSectionId: '/espacios-exteriores',
                    name: 'Espacios exteriores',
                    migrada: false
                },
                {
                    _id: '164',
                    ArcSectionId: '/fachadas',
                    name: 'Fachadas',
                    migrada: false
                },
                {
                    _id: '165',
                    ArcSectionId: '/home-office',
                    name: 'Home Office',
                    migrada: false
                },
                {
                    _id: '166',
                    ArcSectionId: '/inspiracion',
                    name: 'Inspiración',
                    migrada: false
                },
                {
                    _id: '167',
                    ArcSectionId: '/living',
                    name: 'Living',
                    migrada: false
                },
                {
                    _id: '168',
                    ArcSectionId: '/playroom',
                    name: 'Playroom',
                    migrada: false
                },
                {
                    _id: '169',
                    ArcSectionId: '/soluciones',
                    name: 'Soluciones',
                    migrada: false
                },
                {
                    _id: '171',
                    ArcSectionId: '/revista-lugares/tapas',
                    name: 'Tapas Lugares',
                    migrada: false
                },
                {
                    _id: '173',
                    ArcSectionId: '/fabrica-ohlala',
                    name: 'Fábrica OHLALÁ!',
                    migrada: false
                },
                {
                    _id: '174',
                    ArcSectionId: '/ohlala-fest',
                    name: 'OHLALÁ! Fest',
                    migrada: false
                },
                {
                    _id: '175',
                    ArcSectionId: '/ohlala-makers',
                    name: 'OHLALÁ! Makers',
                    migrada: false
                },
                {
                    _id: '176',
                    ArcSectionId: '/ohlala-viaja',
                    name: 'OHLALÁ! Viaja',
                    migrada: false
                },
                {
                    _id: '178',
                    ArcSectionId: '/criticas',
                    name: 'Críticas',
                    migrada: false
                },
                {
                    _id: '179',
                    ArcSectionId: '/entrevistas',
                    name: 'Entrevistas RS',
                    migrada: false
                },
                {
                    _id: '180',
                    ArcSectionId: '/tapas',
                    name: 'RS Tapas',
                    migrada: false
                },
                {
                    _id: '181',
                    ArcSectionId: '/sabado',
                    name: 'Sábado',
                    migrada: false
                },
                {
                    _id: '186',
                    ArcSectionId: '/the-new-york-times',
                    name: 'The New York Times',
                    migrada: false
                },
                {
                    _id: '190',
                    ArcSectionId: '/ohlala-moda',
                    name: 'OHLALA! Moda',
                    migrada: false
                },
                {
                    _id: '192',
                    ArcSectionId: '/revistas',
                    name: 'Revistas',
                    migrada: false
                },
                {
                    _id: '193',
                    ArcSectionId: '/videos',
                    name: 'Videos',
                    migrada: false
                },
                {
                    _id: '194',
                    ArcSectionId: '/ultimas-noticias',
                    name: 'Últimas noticias',
                    migrada: false
                }
            ]
        }
    };
});

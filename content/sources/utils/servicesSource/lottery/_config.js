export const games = {
    Quiniela_Nacional: {
        url: '/loterias/quiniela-nacional/',
        component: 'Quinielas'
    },
    Quiniela_Provincia: {
        url: '/loterias/quiniela-provincia/',
        component: 'Quinielas'
    },
    Quiniela_de_Cordoba: {
        url: '/loterias/quiniela-cordoba/',
        rules: [
            {
                text: '¿Cómo jugar a la Quiniela de Córdoba?',
                description: `El apostador puede elegir si desea jugar con una, dos o tres Loterías.
                Si elige a una Lotería todo lo apostado se tomará como apuesta para ese sorteo exclusivamente y será premiado si el número sale en esa Lotería solamente.
                Si en cambio elige jugar a tres Loterías, el monto de la apuesta realizada se divide en tres, para cada Lotería`
            },
            {
                text: 'Tipos de apuestas',
                description: `A primera: significa que sólo se apuesta que el número saldrá a primera. Puede apostarse una cifra, dos cifras, tres cifras o cuatro cifras.
                A los premios: Se apuesta que el número, puede ser de una a cuatro cifras elegido saldrá de segundo a quinto, décimo, décimo quinto, ó vigésimo lugar. Puede ser una cifra (solo hasta el quinto lugar), dos cifras, tres cifras o cuatro cifras. Cabe aclarar que se apuesta no a la posición, sino al rango elegido. Por ejemplo en el caso del décimo, se está apostando a que el número salga en las diez primeras posiciones.
                Redoblona: Significa que se apostó a que dos números (de dos cifras exclusivamente) saldrán en lugares determinados.`
            }
        ],
        component: 'Quinielas'
    },
    Quiniela_de_Santa_Fe: {
        url: '/loterias/quiniela-santa-fe/',
        component: 'Quinielas'
    },
    Quiniela_Uruguaya: {
        url: '/loterias/quiniela-montevideo/',
        component: 'Quinielas'
    },
    Quini_6: {
        url: '/loterias/quini-6/',
        rules: [
            {
                text: '¿Cómo jugar al Quini 6? ¿Qué es el Quini 6?',
                description: `Es un juego poceado de monto variable en relación a lo recaudado, que consiste en seleccionar seis números de cuarenta y seis.
                    Cuenta con cuatro variantes: Sorteo Tradicional, la Segunda del Quini, Revancha, y Siempre Sale. En las modalidades Tradicional y Segunda del Quini, se considerará ganador del primer premio, 
                    aquellas apuestas cuyos 6 números apostados coincidan con la totalidad de los números favorecidos en el sorteo. 
                    Del segundo premio aquellos que obtengan 5 aciertos y del tercer premio, los que obtengan 4 aciertos. En este último caso, como mínimo percibirán un premio equivalente al valor de la apuesta. 
                    El pozo quedará vacante e incrementará el premio del concurso siguiente, cuando no se registren apuestas ganadoras del primer premio.`
            }
        ],
        component: 'Quini6'
    },
    Telekino: { url: '/loterias/telekino/', component: 'Telekino' },
    Loto: {
        url: '/loterias/loto/',
        rules: [
            {
                text: '¿Cómo jugar al Loto?',
                description: `Es un juego poceado, en el que el apostante elige seis números entre 0 y 41. 
                    Obtendrán premio aquellas apuestas que aciertan a tres, cuatro, cinco o seis números de la combinación ganadora.`
            }
        ],
        component: 'LotoPlus'
    },
    Loto_5: { url: '/loterias/loto-5/', component: 'Loto5' },
    Quiniela_Poceada: {
        url: '/loterias/quiniela-poceada/',
        rules: [
            {
                text: '¿Cómo jugar a la Quiniela Poceada?',
                description:
                    'De un extracto de veinte (20) números de dos cifras, el apostador debe seleccionar 8 números. Obtienen premio las apuestas con ocho (8), siete (7) o seis (6) aciertos.'
            }
        ],
        component: 'QuinielaPoceada'
    },
    Quiniela_Plus: {
        url: '/loterias/quiniela-plus/',
        component: 'QuinielaPlus'
    },
    Brinco: { url: '/loterias/brinco/', component: 'Brinco' }
};

export const LOTERIES_IDS = {
    'quiniela-nacional': 'Quiniela_Nacional',
    'quiniela-provincia': 'Quiniela_Provincia',
    'quiniela-cordoba': 'Quiniela_de_Cordoba',
    'quiniela-santa-fe': 'Quiniela_de_Santa_Fe',
    'quiniela-montevideo': 'Quiniela_Uruguaya',
    'quini-6': 'Quini_6',
    telekino: 'Telekino',
    loto: 'Loto',
    'loto-5': 'Loto_5',
    'quiniela-poceada': 'Quiniela_Poceada',
    'quiniela-plus': 'Quiniela_Plus',
    brinco: 'Brinco'
};

export const LOCATIONS = {
    'Quiniela Nacional': 'Buenos Aires',
    'Quiniela Provincia': 'Buenos Aires',
    'Quiniela de Cordoba': 'Cordoba',
    'Quiniela de Santa Fe': 'Santa Fe',
    'Quiniela Uruguaya': 'Montevideo',
    'Quini 6': 'Buenos Aires',
    Telekino: 'Buenos Aires',
    Loto: 'Buenos Aires',
    'Loto 5': 'Buenos Aires',
    'Quiniela Poceada': 'Buenos Aires',
    'Quiniela Plus': 'Buenos Aires',
    Brinco: 'Buenos Aires',
    default: 'Buenos Aires'
};

export const meanings = {
    Tradicional: {
        title: 'Tradicional',
        link:
            'https://www.lanacion.com.ar/loterias/significado-de-los-numeros-tradicional-nidNNNNNN/',
        linkTitle:
            'Ver el significado de sueños y números para loterías y quinielas',
        icon: 'traditional'
    },
    Nombres: {
        title: 'Nombres',
        link:
            'https://www.lanacion.com.ar/loterias/significado-de-los-numeros-nombres-nidNNNNNN/',
        linkTitle:
            'Ver el significado de sueños según los animales y números para loterías y quinielas',
        icon: 'names'
    },
    Animales: {
        title: 'Animales',
        link:
            'https://www.lanacion.com.ar/loterias/significado-de-los-numeros-animales-nidNNNNNN/',
        linkTitle:
            'Ver el significado de sueños según los nombres y números para loterías y quinielas',
        icon: 'animals'
    },
    LoteriaNacional: {
        title: 'Loteria Nacional',
        link:
            'https://www.lanacion.com.ar/loterias/significado-de-los-numeros-loteria-nacional-nidNNNNNN/',
        linkTitle:
            'Ver el significado de los sueños y números según la lotería nacional',
        icon: 'national'
    }
};

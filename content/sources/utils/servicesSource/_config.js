export const games = {
    quiniela_nacional: {},
    quiniela_provincia: {},
    quiniela_de_cordoba: {
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
        ]
    },
    quiniela_de_santa_fe: {},
    quiniela_uruguaya: {},
    quini_6: {
        rules: [
            {
                text: '¿Cómo jugar al Quini 6? ¿Qué es el Quini 6?',
                description: `Es un juego poceado de monto variable en relación a lo recaudado, que consiste en seleccionar seis números de cuarenta y seis.
                    Cuenta con cuatro variantes: Sorteo Tradicional, la Segunda del Quini, Revancha, y Siempre Sale. En las modalidades Tradicional y Segunda del Quini, se considerará ganador del primer premio, 
                    aquellas apuestas cuyos 6 números apostados coincidan con la totalidad de los números favorecidos en el sorteo. 
                    Del segundo premio aquellos que obtengan 5 aciertos y del tercer premio, los que obtengan 4 aciertos. En este último caso, como mínimo percibirán un premio equivalente al valor de la apuesta. 
                    El pozo quedará vacante e incrementará el premio del concurso siguiente, cuando no se registren apuestas ganadoras del primer premio.`
            }
        ]
    },
    telekino: {},
    loto: {
        rules: [
            {
                text: '¿Cómo jugar al Loto?',
                description: `Es un juego poceado, en el que el apostante elige seis números entre 0 y 41. 
                    Obtendrán premio aquellas apuestas que aciertan a tres, cuatro, cinco o seis números de la combinación ganadora.`
            }
        ]
    },
    loto_5: {},
    quiniela_poceada: {
        rules: [
            {
                text: '¿Cómo jugar a la Quiniela Poceada?',
                description:
                    'De un extracto de veinte (20) números de dos cifras, el apostador debe seleccionar 8 números. Obtienen premio las apuestas con ocho (8), siete (7) o seis (6) aciertos.'
            }
        ]
    },
    quiniela_plus: {},
    brinco: {}
};

export const meanings = {
    Tradicional: {
        title: 'Tradicional',
        link: '',
        linkTitle:
            'Ver el significado de sueños y números para loterías y quinielas',
        labeled: 'Significado de numeros',
        icon: 'traditional'
    },
    Nombres: {
        title: 'Nombres',
        link: '',
        linkTitle:
            'Ver el significado de sueños según los animales y números para loterías y quinielas',
        labeled: 'Significado de numeros',
        icon: 'names'
    },
    Animales: {
        title: 'Animales',
        link: '',
        linkTitle:
            'Ver el significado de sueños según los nombres y números para loterías y quinielas',
        labeled: 'Significado de numeros',
        icon: 'animals'
    },
    LoteriaNacional: {
        title: 'Loteria Nacional',
        link: '',
        linkTitle:
            'Ver el significado de los sueños y números según la lotería nacional',
        labeled: 'Significado de numeros',
        icon: 'national'
    }
};

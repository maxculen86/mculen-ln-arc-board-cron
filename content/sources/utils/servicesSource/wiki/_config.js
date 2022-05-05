const wikiTypes = {
    person: {
        creation_date: 'ISO DATE_TIME',
        type: 1,
        description:
            'Lionel Andrés Messi Cuccittini , conocido como Leo Messi, es un futbolista argentino que juega como delantero o centrocampista. Jugador histórico del Fútbol Club Barcelona, al que estuvo ligado veinte años, desde 2021 integra el plantel del Paris Saint-Germain de la Ligue 1 de Francia. Es también internacional con la selección de Argentina, equipo del que es capitán y máximo goleador histórico. Considerado con frecuencia el mejor jugador del mundo y uno de los mejores de todos los tiempos, es el único futbolista en la historia que ha ganado, entre otras distinciones, siete veces el Balón de Oro, seis premios de la FIFA al mejor jugador del mundo y seis Botas de Oro. En 2020, se convirtió en el primer futbolista y el primer argentino en recibir un premio Laureus, además de ser incluido en el Dream Team del Balón de Oro. Con el Barcelona ha ganado 35 títulos, entre ellos.',
        image: {
            url:
                'https://resizer.glanacion.com/resizer/Gznpo_A-53BruruApPNBWCesfGY=/608x407/smart/filters:format(webp):quality(80)/text',
            width: '295',
            height: '440',
            alt: 'text'
        },
        social_networks: [
            {
                type: 'text',
                name: 'instagram',
                url: 'text'
            },
            {
                type: 'text',
                name: 'facebook',
                url: 'text'
            },
            {
                type: 'text',
                name: 'twitter',
                url: 'text'
            }
        ],
        related_tags: [
            {
                text: 'etiqueta',
                slug: 'text'
            },
            {
                text: 'tag',
                slug: 'text'
            },
            {
                text: 'tag tag',
                slug: 'text'
            },
            {
                text: 'esto es un tag',
                slug: 'text'
            },
            {
                text: 'este es otro tag pero mas largo',
                slug: 'text'
            }
        ],
        schemas_info: {
            additional_name: 'leo',
            birth_date: '2022-05-01T19:00:002022-05-01T19:00:00',
            family_name: '',
            given_name: 'Lionel Andrés Messi Cuccittini',
            job_title: 'Futbolista',
            birth_place: 'Rosario, Santa Fe, Argentina',
            founding_date: '',
            founding_location: '',
            location: '',
            address: '',
            legal_name: ''
        }
    },

    organization: {
        creation_date: 'ISO DATE_TIME',
        type: 2,
        description: 'text',
        logo_url: 'text',
        image: {
            url: 'text',
            width: 'text',
            height: 'text',
            alt: 'text'
        },
        social_networks: [
            {
                type: 'text',
                name: 'text',
                url: 'text'
            }
        ],
        related_tags: [
            {
                text: 'text',
                slug: 'slug'
            },
            {
                text: 'text',
                slug: 'slug'
            }
        ],
        schemas_info: {
            address: 'text',
            founding_date: '2022-05-01T19:00:00',
            founding_location: 'text',
            legal_name: 'text',
            location: 'text'
        }
    }
};

export default wikiTypes;

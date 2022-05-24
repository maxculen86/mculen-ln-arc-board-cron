const wikiTypes = {
    person: {
        creation_date: 'ISO DATE_TIME',
        type: 1,
        description:
            '<p><strong>Lionel Andrés Messi Cuccittini</strong>. Nació el 24/6/87 en Rosario, Santa Fe, <a href="https://www.lanacion.com.ar/tema/argentina-tid434/" title="Noticias de Argentina">Argentina</a>. Apodos: La Pulga o Leo. Se inició en <u>Newell`s Old Boys</u> y emigró de chico a <u>Barcelona</u>, donde debutó en Primera el 16/10/2004 ante el <u>Espanyol</u>. Entre sus trofeos: Ligas españolas, <strong>Copas del Rey</strong>, <strong>Supercopas de España</strong>, <strong>Champions League</strong>, <strong>Supercopas de Europa</strong> y <strong>Mundiales de Clubes</strong>. Con la <a href="https://www.lanacion.com.ar/tema/seleccion-argentina-tid46732/" title="Noticias de Selección argentina">Selección</a> ganó el <strong>Mundial Sub-20 de Holanda 2005</strong>, el oro en los <strong>JJOO</strong> de <strong>Beijing 2008</strong> y participó de los <em>Mundiales Alemania 2006</em>, <em>Sudáfrica 2010</em>, <em>Brasil 2014</em> y <em>Rusia 2018</em>.</p>',
        image: {
            url:
                'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/GZUF7GDQYVCK5FG454PDT5RH64.jpg',
            width: 'text',
            height: 'text',
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

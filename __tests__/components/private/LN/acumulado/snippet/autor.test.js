import React from 'react';
import { render, mount } from 'enzyme';
import SnippetAutor from '../../../../../../components/private/LN/acumulado/snippet/autor';

describe('Private - LN - nota - snippet - noticia ', () => {
    const props = {
        globalContent: {
            affiliations: ' Academia de Periodismo.',
            author_type: 'Estándar',
            awards: [
                {
                    name:
                        'Condecorado por el gobierno de la República de Brasil con la Orden de Río Branco, 2002.'
                },
                {
                    name:
                        'Condecorado por el gobierno de la República de Brasil con la Orden de Río Branco, 2002.'
                }
            ],
            bio_page: '/autor/javier-blanco-170/',
            books: [
                {
                    publisher: 'Editorial',
                    title: 'Carlos Pagni en Odisea Argentina',
                    url: 'https://google.com'
                }
            ],
            byline: 'Javier Blanco',
            canonical_url: '/autor/javier-blanco-170/',
            education: [
                {
                    name: 'Periodismo, Universidad de Buenos Aires, 1989.'
                },
                {
                    name: 'Periodismo, Universidad de Buenos Aires, 1995.'
                }
            ],
            email: 'javier_blanco@lanacion.com.ar',
            image: {
                url:
                    'https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/JQRxXq2iDva6pauwin-CdNwiWD8=/80x80/smart/filters:quality(100)/s3.amazonaws.com/arc-authors/lanacionar/ded21cfd-b9a6-4cee-9a7b-22ad1fb00d1a.png'
            },
            languages: 'Ingles, Frances',
            longBio:
                'Columnista político del diario LA NACION. Es profesor de Historia en la Universidad Nacional de Mar del Plata y fue docente de la cátedra de Historia de las Ideas Políticas de la Facultad de Derecho de la Universidad Nacional de Mar del Plata, e investigador del Instituto Emilio Ravignani de la Facultad de Filosofía y Letras de la UBA. Presta servicios de consultoría política para instituciones y empresas del país y el exterior. En 2002 fue condecorado por el gobierno de la República de Brasil con la Orden de Río Branco.',
            name: 'Javier Blanco',
            node_type: 'author',
            personal_website: 'https://google.com',
            podcasts: [
                {
                    name: 'Un podcast',
                    url: 'https://google.com'
                },
                {
                    name: 'Segundo Podcast',
                    url: 'https://google.com'
                }
            ],
            role: 'LA NACION',
            slug: 'javier-blanco-170',
            facebook: 'facebook.com.ar',
            instagram: 'https://instagram.com',
            medium: 'https://medium.com.ar',
            linkedin: 'https://linkedIn.com',
            reddit: 'https://reddit.com.ar',
            snapchat: 'https://snapchat.com.ar',
            pinterest: 'https://pinterest.com.ar',
            soundcloud: 'https://soundcloud.com.ar',
            tumblr: 'https://tumblr.com.ar',
            twitter: '@javierblancook',
            whatsapp: 'https://whatsapp.com.ar',
            youtube: 'https://youtube.com',
            _id: 'javier-blanco-170'
        }
    };

    const component = mount(<SnippetAutor {...props} />);

    it('<SnippetAutor/> definido', () => {
        expect(component).toBeDefined();
        expect(component.find('script')).toBeDefined();
    });

    it('Validar props enviadas', () => {
        expect(component.props()).toEqual(props);
    });

    it('Validar valores del squema', () => {
        const {
            dangerouslySetInnerHTML: { __html: data }
        } = component.find('script').props();

        const {
            globalContent: {
                byline = '',
                email = '',
                author_type: authorType = '',
                role,
                longBio = '',
                location = '',
                image: { url },
                books = [],
                podcasts = [],
                education = [],
                awards = [],
                personal_website: personalWebsite,
                languages = '',
                affiliations = ''
            }
        } = props;

        const {
            '@context': context,
            '@type': type,
            name,
            image,
            workLocation: { name: workLocation },
            description,
            contactPoint: {
                contactType: contactAuthorType,
                email: authorEmail
            },
            knowsLanguage,
            award: authorAward,
            sameAs: socialNetworks
        } = JSON.parse(data);

        expect(context).toBe('http://schema.org');
        expect(type).toBe('Person');
        expect(name).toBe(byline);
        expect(image).toBe(url);
        expect(workLocation).toBe(location);
        expect(description).toBe(longBio);
        expect(contactAuthorType).toBe(authorType);
        expect(authorEmail).toBe(email);
        expect(knowsLanguage).toStrictEqual([
            {
                '@type': 'Language',
                name: 'Ingles'
            },
            {
                '@type': 'Language',
                name: 'Frances'
            }
        ]);
        expect(authorAward).toStrictEqual([
            'Condecorado por el gobierno de la República de Brasil con la Orden de Río Branco, 2002.',
            'Condecorado por el gobierno de la República de Brasil con la Orden de Río Branco, 2002.'
        ]);
        expect(socialNetworks).toStrictEqual([
            '@javierblancook',
            'facebook.com.ar',
            'https://youtube.com',
            'https://instagram.com',
            'https://linkedIn.com',
            'https://medium.com.ar',
            'https://reddit.com.ar',
            'https://pinterest.com.ar',
            'https://soundcloud.com.ar',
            'https://snapchat.com.ar',
            'https://whatsapp.com.ar',
            'https://tumblr.com.ar'
        ]);
    });

    it('Snapshot Snippet Autor', () => {
        expect(component.find('script')).toMatchSnapshot();
    });
});

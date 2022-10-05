import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
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

    it('<SnippetAutor/> definido', () => {
        const { container } = render(<SnippetAutor {...props} />);
        const script = container.querySelector('script');
        expect(script).toBeDefined();
    });

    it('Snapshot Snippet Autor', () => {
        const { container } = render(<SnippetAutor {...props} />);
        expect(container.innerHTML).toMatchSnapshot();
    });
});

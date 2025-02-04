import { getTrustProject } from '../../../../../../components/private/LN/nota/snippet/noticia';

describe('Tests getTrustProject() function', () => {
    const data = {
        ...data,
        '@type': 'AdvertiserContentArticle',
        publishingPrinciples:
            'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/'
    };

    const trust = [
        'Noticia Original',
        'Noticia',
        'Análisis',
        'Opinión',
        'Explicativo',
        'Contribución de la audiencia',
        'Review',
        'No mostrar Trust'
    ];

    const sponsored = 'LN';

    it('should return the same data if trust and sponsored args are undefined', () => {
        const _data = { url: '/any' };
        const _trust = undefined;
        const _sponsored = undefined;
        expect(getTrustProject(_trust)(_data)(_sponsored)).toStrictEqual(_data);
    });

    it.each(trust)('Checks the return for each %p case', trust => {
        expect(getTrustProject(trust)(data)(sponsored)).toStrictEqual(data);
    });

    const dataNote = [
        {
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples:
                'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/',
            articleSection: 'Espectáculos',
            sections: [{ name: 'Espectáculos' }, { name: 'Show' }]
        },
        {
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples:
                'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/',
            articleSection: 'Tecnología',
            sections: [{ name: 'Tecnología' }, { name: 'eaSports' }]
        },
        {
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples:
                'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/',
            articleSection: 'Sociedad',
            sections: [{ name: 'Sociedad' }, { name: 'Comunidad' }]
        },
        {
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples:
                'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/',
            articleSection: 'El Mundo',
            sections: [{ name: 'El Mundo' }, { name: 'Comunidad' }]
        },
        {
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples:
                'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/',
            articleSection: 'Opinión',
            sections: [{ name: 'Opinión' }, { name: 'Comunidad' }]
        },
        {
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples:
                'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/',
            articleSection: 'Lifestyle',
            sections: [{ name: 'Lifestyle' }, { name: 'Comunidad' }]
        },
        {
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples:
                'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/',
            articleSection: 'Autos',
            sections: [{ name: 'Autos' }, { name: 'Comunidad' }]
        },
        {
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples:
                'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/',
            articleSection: 'Seguridad',
            sections: [{ name: 'Seguridad' }, { name: 'Comunidad' }]
        }
    ];

    it.each(dataNote)(
        'For notes from certain sections, the type must be NewsArticle',
        data => {
            expect(getTrustProject('Noticia')(data)(false)['@type']).toBe(
                'NewsArticle'
            );
        }
    );

    it('If the section is not found in the NewsArticle set, its type must be ReportNewsArticle', () => {
        expect(
            getTrustProject('Noticia')({
                '@type': 'AdvertiserContentArticle',
                publishingPrinciples:
                    'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/',
                articleSection: 'Deportes'
            })(false)['@type']
        ).toBe('ReportageNewsArticle');
    });
});

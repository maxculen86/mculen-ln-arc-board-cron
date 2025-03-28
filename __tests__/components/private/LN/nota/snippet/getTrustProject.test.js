import { getTrustProject } from '../../../../../../components/private/LN/nota/snippet/noticia';

describe('Tests getTrustProject() function', () => {
    const publishingPrinciples =
        'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/';
    const data = {
        ...data,
        '@type': 'AdvertiserContentArticle',
        publishingPrinciples
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

    describe('For trust "Noticia"', () => {
        const randomSections = [
            'Espectáculos',
            'Tecnología',
            'Sociedad',
            'El Mundo',
            'Opinión',
            'Lifestyle',
            'Autos',
            'Seguridad',
            'Deportes',
            'Otra'
        ];
        const dataNote = randomSections.map(section => ({
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples,
            articleSection: section
        }));

        it.each(dataNote)(
            'Given a note from section "%s", it should return @type as "NewsArticle"',
            ({ articleSection, ...data }) => {
                const result = getTrustProject('Noticia')(data)(false);
                expect(result['@type']).toBe('NewsArticle');
            }
        );
    });
});

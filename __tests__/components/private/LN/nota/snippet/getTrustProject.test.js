import {
    getTrustProject,
    sectionsWithTypeNewsArticle
} from '../../../../../../components/private/LN/nota/snippet/noticia';

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

    const sections = sectionsWithTypeNewsArticle.map(section => ({
        name: section
    }));

    const dataNote = [
        {
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples,
            articleSection: 'Espectáculos'
        },
        {
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples,
            articleSection: 'Tecnología'
        },
        {
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples,
            articleSection: 'Sociedad'
        },
        {
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples,
            articleSection: 'El Mundo'
        },
        {
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples,
            articleSection: 'Opinión'
        },
        {
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples,
            articleSection: 'Lifestyle'
        },
        {
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples,
            articleSection: 'Autos'
        },
        {
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples,
            articleSection: 'Seguridad'
        }
    ];

    it.each(dataNote)(
        'For notes from certain sections, the type must be NewsArticle',
        data => {
            expect(
                getTrustProject('Noticia')(data, sections)(false)['@type']
            ).toBe('NewsArticle');
        }
    );

    it('If the section is not found in the NewsArticle set, its type must be ReportNewsArticle', () => {
        expect(
            getTrustProject('Noticia')({
                '@type': 'AdvertiserContentArticle',
                publishingPrinciples,
                articleSection: 'Deportes'
            })(false)['@type']
        ).toBe('ReportageNewsArticle');
    });
});

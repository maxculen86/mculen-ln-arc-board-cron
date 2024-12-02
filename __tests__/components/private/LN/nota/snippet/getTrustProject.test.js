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
            articleSection: 'Espectáculos'
        },
        {
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples:
                'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/',
            articleSection: 'Tecnología'
        },
        {
            '@type': 'AdvertiserContentArticle',
            publishingPrinciples:
                'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/',
            articleSection: 'Sociedad'
        }
    ];

    it.each(dataNote)(
        'Type for trust noticia and section equals to Sociedad, Tecnología or Espectaculos must be NewsArticle',
        data => {
            expect(getTrustProject('Noticia')(data)(false)['@type']).toBe(
                'NewsArticle'
            );
        }
    );

    it('If another section different from Sociedad, Tecnología or Espectaculos and trust noticia type must be ReportageNewsArticle', () => {
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

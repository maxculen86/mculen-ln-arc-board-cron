import { setTLArticles } from '../../../../../../components/private/LN/common/utils/timeline';
import { addHours } from '../../../../../../components/private/common/utils/dateAndTimeUtil';
import { LIVEBLOG } from '../../../../../../components/private/common/utils/subtypes/subtypeHelper';

describe('Private - Common - Utils - timeline - setTLArticles', () => {
    const globalMock = {
        articles: [
            {
                _id: 'N2LUMWIX2RGEBIP7DQLO5MNQVY',
                content_restrictions: {
                    content_code: 'comun'
                },
                display_date: '2022-07-14T11:58:43',
                headlines: {
                    basic:
                        'Dólar hoy y Dólar blue hoy: la cotización minuto a minuto del 14 de julio'
                },
                subtype: '1',
                website_url:
                    '/economia/dolar-hoy-y-dolar-blue-hoy-la-cotizacion-minuto-a-minuto-del-14-de-julio-nid14072022/'
            },
            {
                _id: 'HEOLVFFJDFGRBHWODCNQZFXN5M',
                content_restrictions: {
                    content_code: 'comun'
                },
                display_date: '2022-07-14T11:49:43',
                headlines: {
                    basic:
                        '¿Qué es el dólar turista y cuál es el dólar solidario?'
                },
                subtype: '1',
                website_url:
                    '/economia/que-es-el-dolar-turista-y-cual-es-el-dolar-solidario-nid14072022/'
            },
            {
                _id: 'O6TYGUJ26JFADAO6X4U4TE4XBE',
                content_restrictions: {
                    content_code: 'comun'
                },
                display_date: '2022-07-14T11:45:11',
                headlines: {
                    basic:
                        'Dólar turista: se desató una polémica porque la nueva retención supera la alícuota'
                },
                subtype: '1',
                website_url:
                    '/economia/dolar-turista-se-desato-una-polemica-porque-la-nueva-retencion-supera-la-alicuota-nid14072022/'
            },
            {
                _id: 'PH47D7NWGJAK5KSKIHCHG65S6I',
                content_restrictions: {
                    content_code: 'comun'
                },
                display_date: '2022-07-14T11:38:32',
                headlines: {
                    basic:
                        'El Fondo respaldó los primeros anuncios de Batakis y reiteró que los objetivos siguen igual'
                },
                subtype: '1',
                website_url:
                    '/economia/el-fondo-respaldo-los-primeros-anuncios-de-batakis-y-reitero-que-los-objetivos-siguen-igual-nid14072022/'
            },
            {
                _id: 'LP6E575MRFEXXLAO3Z4XWELQ3M',
                content_restrictions: {
                    content_code: 'comun'
                },
                display_date: '2022-07-14T11:35:35',
                headlines: {
                    basic:
                        'Dólar hoy: el blue sube y supera su récord histórico, tras las nuevas medidas del Gobierno'
                },
                subtype: '1',
                website_url:
                    '/economia/dolar/dolar-hoy-el-blue-sube-y-supera-su-record-historico-tras-las-nuevas-medidas-del-gobierno-nid14072022/'
            }
        ],
        source: 'byLastNews'
    };

    const { articles: articlesMock } = globalMock;
    const articlesToLiveblog = articlesMock.map(article => ({
        ...article,
        subtype: LIVEBLOG
    }));

    it('works in regular case', () => {
        const articles = setTLArticles(...Object.values(globalMock));
        const labels = articles.map(article => article.label);

        articles.forEach((article, index) => {
            const {
                _id: mockId,
                display_date: mockDisplayDate,
                website_url: mockWebsiteUrl,
                articleData,
                headlines,
                content_restrictions
            } = articlesMock[index];

            const { basic: mockTtitle } = headlines;
            const { content_code: mockContentCode } = content_restrictions;
            const newDisplayDate = addHours(3, mockDisplayDate);

            expect(article.artPosition).toEqual(`0${index + 1}`);
            expect(article.key).toEqual(mockId);
            expect(article.titleText).toEqual(mockTtitle);
            expect(article.hour.props.display_date).toEqual(newDisplayDate);
            expect(article.link).toEqual(mockWebsiteUrl);
            expect(article.articleData._id).toEqual(mockId);
            expect(
                article.articleData.content_restrictions.content_code
            ).toEqual(mockContentCode);
            expect(article.label).toEqual({});
        });

        expect(articles).toHaveLength(articlesMock.length);
    });

    it('returns label "En Vivo" in liveblog articles', () => {
        const props = {
            ...globalMock,
            articles: articlesToLiveblog
        };

        const articles = setTLArticles(...Object.values(props));

        articles.forEach(article => {
            expect(article.label.className).toBeFalsy();
            expect(article.label.text).toEqual('En Vivo');
        });
    });

    it('does not return hour when source is collection', () => {
        const props = {
            ...globalMock,
            source: 'byCollection'
        };

        const articles = setTLArticles(...Object.values(props));

        articles.forEach(article => {
            expect(article.hour).toBeFalsy();
        });
    });

    it('adds specific class on label when source is collection', () => {
        const props = {
            articles: articlesToLiveblog,
            source: 'byCollection'
        };

        const articles = setTLArticles(...Object.values(props));

        articles.forEach(article => {
            expect(article.hour).toBeFalsy();
            expect(article.label.className).toEqual('--withoutHour');
        });
    });
});

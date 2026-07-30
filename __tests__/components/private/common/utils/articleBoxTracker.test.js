import { fireEvent } from '@testing-library/react';
import { articleBoxesTracker } from '../../../../../components/private/common/utils/noteTracker/articleBoxesTracker';
import { scheduleTask } from '../../../../../components/private/common/utils/scheduleTask';

jest.mock('../../../../../components/private/common/utils/scheduleTask');

const mockScheduleTask = jest.fn(callback => callback());
scheduleTask.mockImplementation(mockScheduleTask);

const appendArticlesBox = (blockName, articles) => {
    const section = document.createElement('section');
    const div = document.createElement('div');

    section.setAttribute('data-block-name', blockName);
    articles.forEach(article => div.appendChild(article));
    section.appendChild(div);
    document.body.appendChild(section);
};

const setArticleRowTop = (article, top) => {
    article.getBoundingClientRect = jest.fn(() => ({ top }));
    return article;
};

const createArticle = (id, text, rowTop = 0) => {
    const article = document.createElement('article');
    article.dataset.id = id;
    article.dataset.notaid = id;
    article.innerHTML = text;

    return setArticleRowTop(article, rowTop);
};

const intersect = (callback, targets) => {
    callback(
        targets.map(target => ({
            isIntersecting: true,
            target
        }))
    );
};

describe('articleBoxesTracker funtion for all article boxes', () => {
    let observe;
    let unobserve;
    let intersectionCallback;

    beforeEach(() => {
        document.body.innerHTML = '';
        window.dataLayer = [];

        Object.defineProperty(window, 'performance', {
            configurable: true,
            value: {
                getEntriesByType: jest
                    .fn()
                    .mockReturnValue([{ type: 'navigate' }]),
                measure: jest.fn()
            }
        });

        observe = jest.fn();
        unobserve = jest.fn();
        window.IntersectionObserver = jest.fn(callback => {
            intersectionCallback = callback;
            return {
                observe,
                unobserve
            };
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    test('otras noticias sends combo impression and clicknota', () => {
        const articles = [
            createArticle('AKJATRDLYFHATIZLFE236AMKMQ', 'articulo1'),
            createArticle('LAWNXRYRFB27CWAZ7YVIKOEKO', 'articulo2'),
            createArticle('FXX3UTIX7ZBUME4337K54OVOM', 'articulo3')
        ];

        appendArticlesBox('n_otras_noticias', articles);

        articleBoxesTracker({
            boxType: 'masNotas',
            diagramation: 3,
            sectionTitle: 'OtrasNoticias'
        });

        intersect(intersectionCallback, [articles[0]]);
        fireEvent.click(articles[1]);

        expect(observe).toBeCalledTimes(3);
        expect(unobserve).toBeCalledTimes(3);
        expect(window.dataLayer).toStrictEqual([
            {
                event: 'impressioncajanota',
                ctr_brand: 'otrasNoticias',
                ctr_position: '060001,060002,060003',
                combo_notas:
                    'AKJATRDLYFHATIZLFE236AMKMQ, LAWNXRYRFB27CWAZ7YVIKOEKO, FXX3UTIX7ZBUME4337K54OVOM'
            },
            {
                event: 'clicknota',
                nota_id_arc: 'LAWNXRYRFB27CWAZ7YVIKOEKO',
                ctr_brand: 'otrasNoticias',
                ctr_position: '060002'
            }
        ]);
    });

    test('ultimas noticias sends combo impression and clicknota', () => {
        const articles = [
            createArticle('JLOPWY7WHRDSBAWJCOLGTH2HRM', 'articulo1'),
            createArticle('3JUXSTTEVDODB4XQXAZ7VJF7A', 'articulo2'),
            createArticle('E3GPRH2GPJAHTIAT4FLVLWGXKY', 'articulo3')
        ];

        appendArticlesBox('n_ultimas_noticias', articles);

        articleBoxesTracker({
            boxType: 'masNotas',
            diagramation: 9,
            sectionTitle: 'UltimasNoticias'
        });

        intersect(intersectionCallback, [articles[0]]);
        fireEvent.click(articles[2]);

        expect(window.dataLayer).toStrictEqual([
            {
                event: 'impressioncajanota',
                ctr_brand: 'ultimasNoticias',
                ctr_position: '100001,100002,100003',
                combo_notas:
                    'JLOPWY7WHRDSBAWJCOLGTH2HRM, 3JUXSTTEVDODB4XQXAZ7VJF7A, E3GPRH2GPJAHTIAT4FLVLWGXKY'
            },
            {
                event: 'clicknota',
                nota_id_arc: 'E3GPRH2GPJAHTIAT4FLVLWGXKY',
                ctr_brand: 'ultimasNoticias',
                ctr_position: '100003'
            }
        ]);
    });

    test('ranking sends individual impression and clicknota', () => {
        const articles = [
            createArticle('KA5BE6UKKBCKNHPPQ6RXV5M5XI', 'articulo1', 0),
            createArticle('4XXALT63UZBZFCFMLD7LXPNAXQ', 'articulo2', 100),
            createArticle('WR3E7FBVFREBFFIVS2F6EPN3DQ', 'articulo3', 200),
            createArticle('GOP4IEYOSVHZJBDHB2E7OOISYY', 'articulo4', 300)
        ];

        articles.forEach(article => {
            article.dataset.articleBox = 'Ranking';
            document.body.appendChild(article);
        });

        articleBoxesTracker({
            boxType: 'ranking'
        });

        intersect(intersectionCallback, [articles[0]]);
        fireEvent.click(articles[3]);

        expect(window.dataLayer).toStrictEqual([
            {
                event: 'impressioncajanota',
                ctr_brand: 'ranking',
                ctr_position: '070001',
                combo_notas: 'KA5BE6UKKBCKNHPPQ6RXV5M5XI'
            },
            {
                event: 'clicknota',
                nota_id_arc: 'GOP4IEYOSVHZJBDHB2E7OOISYY',
                ctr_brand: 'ranking',
                ctr_position: '070004'
            }
        ]);
    });

    test('ranking sends one impression per visible article', () => {
        const articles = [
            createArticle('KA5BE6UKKBCKNHPPQ6RXV5M5XI', 'articulo1', 0),
            createArticle('4XXALT63UZBZFCFMLD7LXPNAXQ', 'articulo2', 100)
        ];

        articles.forEach(article => {
            article.dataset.articleBox = 'Ranking';
            document.body.appendChild(article);
        });

        articleBoxesTracker({
            boxType: 'ranking'
        });

        intersect(intersectionCallback, articles);

        expect(window.dataLayer).toStrictEqual([
            {
                event: 'impressioncajanota',
                ctr_brand: 'ranking',
                ctr_position: '070001',
                combo_notas: 'KA5BE6UKKBCKNHPPQ6RXV5M5XI'
            },
            {
                event: 'impressioncajanota',
                ctr_brand: 'ranking',
                ctr_position: '070002',
                combo_notas: '4XXALT63UZBZFCFMLD7LXPNAXQ'
            }
        ]);
    });

    test('apertura home sends combo impression with aperturaHome brand', () => {
        const articles = [
            createArticle('JLOPWY7WHRDSBAWJCOLGTH2HRM', 'articulo1'),
            createArticle('3JUXSTTEVDODB4XQXAZ7VJF7A', 'articulo2'),
            createArticle('E3GPRH2GPJAHTIAT4FLVLWGXKY', 'articulo3')
        ];

        appendArticlesBox('n_ultimas_noticias', articles);

        articleBoxesTracker({
            boxType: 'masNotas',
            diagramation: 9,
            sectionTitle: 'UltimasNoticias',
            isAperturaHome: true
        });

        intersect(intersectionCallback, [articles[0]]);
        fireEvent.click(articles[2]);

        expect(window.dataLayer).toStrictEqual([
            {
                event: 'impressioncajanota',
                ctr_brand: 'aperturaHome',
                ctr_position: '100001,100002,100003',
                combo_notas:
                    'JLOPWY7WHRDSBAWJCOLGTH2HRM, 3JUXSTTEVDODB4XQXAZ7VJF7A, E3GPRH2GPJAHTIAT4FLVLWGXKY'
            },
            {
                event: 'clicknota',
                nota_id_arc: 'E3GPRH2GPJAHTIAT4FLVLWGXKY',
                ctr_brand: 'aperturaHome',
                ctr_position: '100003'
            }
        ]);
    });

    test('groups impressions by the real DOM row', () => {
        const articles = [
            createArticle('JLOPWY7WHRDSBAWJCOLGTH2HRM', 'articulo1', 0),
            createArticle('3JUXSTTEVDODB4XQXAZ7VJF7A', 'articulo2', 0),
            createArticle('E3GPRH2GPJAHTIAT4FLVLWGXKY', 'articulo3', 100),
            createArticle('5KUHWIFE4NC5NGDKT3FDD22574', 'articulo4', 100)
        ];

        appendArticlesBox('n_ultimas_noticias', articles);

        articleBoxesTracker({
            boxType: 'masNotas',
            diagramation: 9,
            sectionTitle: 'UltimasNoticias'
        });

        intersect(intersectionCallback, [articles[0]]);
        intersect(intersectionCallback, [articles[2]]);

        expect(window.dataLayer).toStrictEqual([
            {
                event: 'impressioncajanota',
                ctr_brand: 'ultimasNoticias',
                ctr_position: '100001,100002',
                combo_notas:
                    'JLOPWY7WHRDSBAWJCOLGTH2HRM, 3JUXSTTEVDODB4XQXAZ7VJF7A'
            },
            {
                event: 'impressioncajanota',
                ctr_brand: 'ultimasNoticias',
                ctr_position: '100003,100004',
                combo_notas:
                    'E3GPRH2GPJAHTIAT4FLVLWGXKY, 5KUHWIFE4NC5NGDKT3FDD22574'
            }
        ]);
    });

    test('seguir leyendo sends combo impression and clicknota', () => {
        const articles = [
            createArticle('BB7YANOMI5F7FIAGDOVTPXS6BE', 'articulo1'),
            createArticle('E35HDINQKNHPPF6X564P7QX4NI', 'articulo2'),
            createArticle('MX4CTMSNXZDCZMIXXA74BP7MA', 'articulo3')
        ];

        appendArticlesBox('n_segui_leyendo', articles);

        articleBoxesTracker({
            boxType: 'seguirLeyendo'
        });

        intersect(intersectionCallback, [articles[0]]);
        fireEvent.click(articles[0]);

        expect(window.dataLayer).toStrictEqual([
            {
                event: 'impressioncajanota',
                ctr_brand: 'seguiLeyendo',
                ctr_position: '060101,060102,060103',
                combo_notas:
                    'BB7YANOMI5F7FIAGDOVTPXS6BE, E35HDINQKNHPPF6X564P7QX4NI, MX4CTMSNXZDCZMIXXA74BP7MA'
            },
            {
                event: 'clicknota',
                nota_id_arc: 'BB7YANOMI5F7FIAGDOVTPXS6BE',
                ctr_brand: 'seguiLeyendo',
                ctr_position: '060101'
            }
        ]);
    });

    test('te puede interesar sends acceptance combo format and clicknota', () => {
        const articles = [
            createArticle('KDHF4LW4LVFNDE73HNJPOWNK3I', 'articulo1'),
            createArticle('KCBAXPR54RBR3LAWS7G4VMHZOU', 'articulo2'),
            createArticle('LQA37X3MUZFXPIGISVDGAWZG7A', 'articulo3')
        ];

        articleBoxesTracker({
            boxType: 'tePuedeInteresar',
            articles
        });

        intersect(intersectionCallback, [articles[0]]);
        fireEvent.click(articles[0]);

        expect(window.dataLayer).toStrictEqual([
            {
                event: 'impressioncajanota',
                ctr_brand: 'cajaTePuedeinteresar',
                ctr_position: '101101,101102,101103',
                combo_notas:
                    'KDHF4LW4LVFNDE73HNJPOWNK3I, KCBAXPR54RBR3LAWS7G4VMHZOU, LQA37X3MUZFXPIGISVDGAWZG7A'
            },
            {
                event: 'clicknota',
                nota_id_arc: 'KDHF4LW4LVFNDE73HNJPOWNK3I',
                ctr_brand: 'cajaTePuedeinteresar',
                ctr_position: '101101'
            }
        ]);
    });

    test('does not send events on reload', () => {
        Object.defineProperty(window, 'performance', {
            configurable: true,
            value: {
                getEntriesByType: jest
                    .fn()
                    .mockReturnValue([{ type: 'reload' }]),
                measure: jest.fn()
            }
        });

        const articles = [
            createArticle('KDHF4LW4LVFNDE73HNJPOWNK3I', 'articulo1')
        ];

        articleBoxesTracker({
            boxType: 'tePuedeInteresar',
            articles
        });

        expect(window.IntersectionObserver).not.toHaveBeenCalled();
        fireEvent.click(articles[0]);
        expect(window.dataLayer).toStrictEqual([]);
    });
});

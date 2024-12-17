import { screen, fireEvent } from '@testing-library/react';
import { articleBoxesTracker } from '../../../../../components/private/common/utils/noteTracker/articleBoxesTracker';
import { scheduleTask } from '../../../../../components/private/common/utils/scheduleTask';

jest.mock('../../../../../components/private/common/utils/scheduleTask');

const mockScheduleTask = jest.fn(callback => callback());
scheduleTask.mockImplementation(mockScheduleTask);

Object.defineProperty(window, 'performance', {
    value: {
        getEntriesByType: jest.fn().mockReturnValue([{ type: 'navigate' }]),
        measure: jest.fn()
    }
});

window.IntersectionObserver = jest.fn();
const takeRecords = jest.fn();

afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
});

describe('articleBoxTracker funtion for all article boxes', () => {
    global.window.dataLayer = [];
    let section = global.document.createElement('section');
    let div = global.document.createElement('div');
    let article = global.document.createElement('article');
    div.appendChild(article);
    article.ctr_brand = 'otrasNoticias_diag3';
    article.ctr_position = '060001';
    article.innerHTML = 'articulo1';
    section.setAttribute('data-block-name', 'n_otras_noticias');
    section.appendChild(div);

    global.document.body.appendChild(section);

    const cajaNotas = global.document;

    const mockedEntries = [
        {
            isIntersecting: true,
            target: article
        }
    ];
    const mockedSection = [cajaNotas];

    const observe = jest.fn();
    const unobserve = jest.fn();
    takeRecords.mockImplementationOnce(() => ({ mockedEntries }));

    window.IntersectionObserver.mockImplementationOnce(() => ({
        observe,
        unobserve,
        takeRecords
    }));

    jest.spyOn(document, 'querySelectorAll').mockReturnValueOnce(mockedSection);

    const observer = articleBoxesTracker({
        boxType: 'masNotas',
        diagramation: 3,
        sectionTitle: 'OtrasNoticias'
    });

    const [callback] = window.IntersectionObserver.mock.calls[0];
    callback(mockedEntries, observer);
    test('otras noticias case, must observe, unobserve and send event to dataLayer', () => {
        expect(observe).toBeCalledTimes(1);
        expect(unobserve).toBeCalledTimes(1);
        expect(window.dataLayer).toStrictEqual([
            {
                event: 'impressionNota',
                ctr_brand: 'otrasNoticias_diag3',
                ctr_position: '060001'
            }
        ]);
    });
    test('otras noticias click event', () => {
        const Article = screen.getByText('articulo1');
        fireEvent.click(Article);
        expect(window.dataLayer).toStrictEqual([
            {
                event: 'impressionNota',
                ctr_brand: 'otrasNoticias_diag3',
                ctr_position: '060001'
            },
            {
                event: 'productClickNota',
                ctr_brand: 'otrasNoticias_diag3',
                ctr_position: '060001'
            }
        ]);
    });
    test('ultimas noticias case, observer and click event', () => {
        global.window.dataLayer = [];
        let section2 = global.document.createElement('section');
        let div2 = global.document.createElement('div');
        let article2 = global.document.createElement('article');
        article2.innerHTML = 'articulo2';
        div2.appendChild(article2);
        article2.ctr_brand = 'ultimasNoticias_diag9';
        article2.ctr_position = '100001';
        section2.setAttribute('data-block-name', 'n_ultimas_noticias');
        section2.appendChild(div2);

        global.document.body.appendChild(section2);

        const cajaNotas2 = global.document;

        const mockedEntries2 = [
            {
                isIntersecting: true,
                target: article2
            }
        ];
        const mockedSection2 = [cajaNotas2];

        takeRecords.mockImplementationOnce(() => ({ mockedEntries2 }));

        window.IntersectionObserver.mockImplementationOnce(() => ({
            observe,
            unobserve,
            takeRecords
        }));

        jest.spyOn(document, 'querySelectorAll').mockReturnValueOnce(
            mockedSection2
        );

        const observer2 = articleBoxesTracker({
            boxType: 'masNotas',
            diagramation: 9,
            sectionTitle: 'UltimasNoticias'
        });

        const [callback2] = window.IntersectionObserver.mock.calls[0];
        callback2(mockedEntries2, observer2);
        const Article2 = screen.getByText('articulo2');
        fireEvent.click(Article2);
        expect(window.dataLayer).toStrictEqual([
            {
                event: 'impressionNota',
                ctr_brand: 'ultimasNoticias_diag9',
                ctr_position: '100001'
            },
            {
                event: 'productClickNota',
                ctr_brand: 'ultimasNoticias_diag9',
                ctr_position: '100001'
            }
        ]);
    });
    test('ranking case, observer and click event', () => {
        global.window.dataLayer = [];
        let section3 = global.document.createElement('section');
        let div3 = global.document.createElement('div');
        let article3 = global.document.createElement('article');
        article3.innerHTML = 'articulo3';
        div3.appendChild(article3);
        article3.ctr_brand = 'ranking_diag4';
        article3.ctr_position = '070001';
        section3.setAttribute('data-block-name', 'n_ranking');
        section3.appendChild(div3);

        global.document.body.appendChild(section3);

        const cajaNotas3 = global.document;

        const mockedEntries3 = [
            {
                isIntersecting: true,
                target: article3
            }
        ];
        const mockedSection3 = [cajaNotas3];

        takeRecords.mockImplementationOnce(() => ({ mockedEntries3 }));

        window.IntersectionObserver.mockImplementationOnce(() => ({
            observe,
            unobserve,
            takeRecords
        }));

        jest.spyOn(document, 'querySelectorAll').mockReturnValueOnce(
            mockedSection3
        );

        const observer3 = articleBoxesTracker({
            boxType: 'ranking'
        });

        const [callback3] = window.IntersectionObserver.mock.calls[0];
        callback3(mockedEntries3, observer3);
        const Article3 = screen.getByText('articulo3');
        fireEvent.click(Article3);
        expect(window.dataLayer).toStrictEqual([
            {
                event: 'impressionNota',
                ctr_brand: 'ranking_diag4',
                ctr_position: '070001'
            },
            {
                event: 'productClickNota',
                ctr_brand: 'ranking_diag4',
                ctr_position: '070001'
            }
        ]);
    });
    test('seguir leyendo case, observer and click event', () => {
        global.window.dataLayer = [];
        let section4 = global.document.createElement('section');
        let div4 = global.document.createElement('div');
        let article4 = global.document.createElement('article');
        article4.innerHTML = 'articulo4';
        div4.appendChild(article4);
        article4.ctr_brand = 'seguiLeyendo_diag3';
        article4.ctr_position = '060101';
        section4.setAttribute('data-block-name', 'h_SeguiLeyendotema-toi');
        section4.appendChild(div4);

        global.document.body.appendChild(section4);

        const cajaNotas4 = global.document;

        const mockedEntries4 = [
            {
                isIntersecting: true,
                target: article4
            }
        ];
        const mockedSection4 = [cajaNotas4];

        takeRecords.mockImplementationOnce(() => ({ mockedEntries4 }));

        window.IntersectionObserver.mockImplementationOnce(() => ({
            observe,
            unobserve,
            takeRecords
        }));

        jest.spyOn(document, 'querySelectorAll').mockReturnValueOnce(
            mockedSection4
        );

        const observer4 = articleBoxesTracker({
            boxType: 'seguirLeyendo'
        });

        const [callback4] = window.IntersectionObserver.mock.calls[0];
        callback4(mockedEntries4, observer4);
        const Article4 = screen.getByText('articulo4');
        fireEvent.click(Article4);
        expect(window.dataLayer).toStrictEqual([
            {
                event: 'impressionNota',
                ctr_brand: 'seguiLeyendo_diag3',
                ctr_position: '060101'
            },
            {
                event: 'productClickNota',
                ctr_brand: 'seguiLeyendo_diag3',
                ctr_position: '060101'
            }
        ]);
    });
    test('te puede interesar case, observer and click event', () => {
        global.window.dataLayer = [];
        let section5 = global.document.createElement('section');
        let div5 = global.document.createElement('div');
        let article5 = global.document.createElement('article');
        article5.innerHTML = 'articulo5';
        div5.appendChild(article5);
        article5.ctr_brand = 'puedeInteresar_diag15';
        article5.ctr_position = '101101';
        section5.setAttribute('data-block-name', 'n_te_puede_interesar');
        section5.appendChild(div5);

        global.document.body.appendChild(section5);

        const cajaNotas5 = global.document;

        const mockedEntries5 = [
            {
                isIntersecting: true,
                target: article5
            }
        ];
        const mockedSection5 = [cajaNotas5];

        takeRecords.mockImplementationOnce(() => ({ mockedEntries5 }));

        window.IntersectionObserver.mockImplementationOnce(() => ({
            observe,
            unobserve,
            takeRecords
        }));

        jest.spyOn(document, 'querySelectorAll').mockReturnValueOnce(
            mockedSection5
        );

        const observer5 = articleBoxesTracker({
            boxType: 'tePuedeInteresar',
            articles: [article5]
        });

        const [callback4] = window.IntersectionObserver.mock.calls[0];
        callback4(mockedEntries5, observer5);
        const Article5 = screen.getByText('articulo5');
        fireEvent.click(Article5);
        expect(window.dataLayer).toStrictEqual([
            {
                event: 'impressionNota',
                ctr_brand: 'puedeInteresar_diag15',
                ctr_position: '101101'
            },
            {
                event: 'productClickNota',
                ctr_brand: 'puedeInteresar_diag15',
                ctr_position: '101101'
            }
        ]);
    });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
    createIntersectionObserver,
    getDataSetProps,
    productClickFromClient,
    updateIndexOfItems
} from '../../../../components/private/common/utils/viewability';
import CajaTema from '../../../../components/private/LN/common/cajaTema';
import articles from '../../../../__mocks__/data/articles/articles.json';
import renderables1 from '../../../../__mocks__/data/renderables/data1';
import Context from 'fusion:context';
import { findPositionInsideSection } from '../../../../components/private/LN/common/utils/cajaTemasHelper';

jest.mock('fusion:consumer', component => {
    return function (component) {
        return component;
    };
});

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {
            outputType: 'default',
            arcSite: 'la-nacion-ar'
        };

        return props.children(mockAvailableProps);
    },
    useComponentContext: jest.fn(() => ({}))
}));

jest.mock('fusion:properties', () => () => ({
    getProperties: () => {
        return {
            cajaTemaConfig: {
                opinion4: {
                    className: '--opinion',
                    articles: {
                        0: {
                            titleSize: '--l',
                            withChapita: true,
                            imageConfig: 'featuredOpinion'
                        },
                        1: {
                            titleSize: '--xs',
                            authorSize: '--fourxs',
                            isRenderAuthorOpinion: true,
                            imageConfig: 'featuredOpinion'
                        },
                        2: {
                            titleSize: '--xs',
                            authorSize: '--fourxs',
                            isRenderAuthorOpinion: true,
                            imageConfig: 'featuredOpinion'
                        },
                        3: {
                            titleSize: '--l',
                            authorSize: '--fourxs',
                            isRenderAuthorOpinion: true,
                            imageConfig: 'featuredOpinion'
                        }
                    }
                }
            }
        };
    }
}));

describe('Viewability', () => {
    beforeAll(() => {
        window.dataLayer = [];
    });

    describe('Evento productClick del script viewability', () => {
        Context.useAppContext = jest.fn(() => ({
            outputType: 'default',
            arcSite: 'la-nacion-ar'
        }));

        it('when clicks in article with layout grilla should save in dataLayer data attr from article', () => {
            const props = {
                title: 'Titulo de Nota',
                articles,
                layout: 'grilla3',
                notesQuantity: 3,
                position: '01',
                positionInsideSection: '01',
                sectionName: 'propiedades',
                handleClick: productClickFromClient
            };

            const { container } = render(<CajaTema {...props} />);
            expect(container).toBeTruthy();
            expect(container.children.length).toBe(1);

            const grillaSection = container.querySelector(
                '[data-diagramacion-id="grilla3"]'
            );

            expect(grillaSection).toBeInTheDocument();

            const _articles = container.querySelectorAll('.mod-article');
            expect(_articles.length).toBe(3);
            expect(window.dataLayer.length).toBe(0);

            fireEvent.click(_articles[0]);
            expect(window.dataLayer.length).toBe(1);
            expect(window.dataLayer[0].event).toBe('productClickScore');
            expect(window.dataLayer[0].item.item_list_id).toBe('010101');
            expect(window.dataLayer[0].item.item_id).toBe(
                'K2FFK3J6DNCX3D76BQ6D7FLQNE'
            );
            expect(window.dataLayer[0].item.item_variant).toBe('editor');
            expect(window.dataLayer[0].item.item_brand).toBe('_grilla3');
            expect(window.dataLayer[0].item.item_list_name).toBe(
                'h_propiedadestema-01'
            );
            expect(window.dataLayer[0].item.item_name).toBe('');
            expect(window.dataLayer[0].item.item_category).toBe('N/A');
            expect(window.dataLayer[0].item.price).toBe(1);
            expect(window.dataLayer[0].item.quantity).toBe(1);

            fireEvent.click(_articles[2]);
            expect(window.dataLayer.length).toBe(2);
            expect(window.dataLayer[1].event).toBe('productClickScore');
        });

        it('should test viewability for different section ', () => {
            const propsSeccionCampo = {
                title: 'Seccion Campo',
                articles,
                layout: 'grilla6',
                notesQuantity: 3,
                position: '02',
                positionInsideSection: '03',
                sectionName: 'campo',
                handleClick: productClickFromClient
            };

            const { container } = render(<CajaTema {...propsSeccionCampo} />);

            const _articlesCampo = container.querySelectorAll('.mod-article');

            fireEvent.click(_articlesCampo[0]);
            expect(window.dataLayer.length).toBe(3);
            expect(window.dataLayer[2].event).toBe('productClickScore');

            fireEvent.click(_articlesCampo[2]);
            expect(window.dataLayer.length).toBe(4);
            expect(window.dataLayer[3].event).toBe('productClickScore');

            expect(container).toMatchSnapshot();
        });

        it('when clicks in article with layout focalRight should save in dataLayer data attr from article', () => {
            const propsFocalRight = {
                title: 'Titulo de Nota',
                articles,
                layout: 'focalRight2',
                notesQuantity: 2,
                position: '01',
                positionInsideSection: '01',
                sectionName: 'economia',
                handleClick: productClickFromClient
            };

            const { container } = render(<CajaTema {...propsFocalRight} />);
            expect(container).toBeTruthy();

            const articlesFocalRight =
                container.querySelectorAll('.mod-article');

            const layout = container.querySelector(
                '[data-diagramacion-id="focalRight2"]'
            );

            expect(layout).toBeDefined();
            expect(articlesFocalRight.length).toBe(2);

            fireEvent.click(articlesFocalRight[1]);
            expect(window.dataLayer.length).toBe(5);
            expect(window.dataLayer[4].event).toBe('productClickScore');

            expect(window.dataLayer[4].item.item_list_id).toBe('010102');
            expect(window.dataLayer[4].item.item_id).toBe(
                'AQCXKYK4XJCVFNFNZ2IQ7SUCA4'
            );
            expect(window.dataLayer[4].item.item_variant).toBe('editor');
            expect(window.dataLayer[4].item.item_brand).toBe('_focalRight2');
            expect(window.dataLayer[4].item.item_list_name).toBe(
                'h_economiatema-01'
            );
            expect(window.dataLayer[4].item.item_name).toBe('');
            expect(window.dataLayer[4].item.item_category).toBe('N/A');
            expect(window.dataLayer[4].item.price).toBe(1);
            expect(window.dataLayer[4].item.quantity).toBe(1);
        });

        it('when clicks in article with layout OPINION should save in dataLayer data attr from article', () => {
            const propsOpinion = {
                title: 'Titulo de Nota',
                articles: [
                    ...articles,
                    {
                        _id: 'KEBOPEQGFASKHASFSFAFSF',
                        display_date: '2020-04-24T16:10:43.235Z',
                        headlines: {
                            basic: 'Ansiedad por separación: cómo evitar que los perros sufran cuando vuelvan a quedarse solos',
                            mobile: ''
                        },
                        promo_items: {
                            basic: {
                                height: 513,
                                type: 'image',
                                url: 'https://resizer.glanacion.com/resizer/pyiWe6lOY0IToc9Qn7DqM0fOY84=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/HWSYUPWYQ5DKDON4ZV74I6MWZU.jpg',
                                width: 768
                            }
                        },
                        publish_date: '2021-01-07T12:56:01.989Z',
                        subheadlines: {
                            basic: 'A los perros no les gusta estar solos . Tanto es así que incluso pueden llegar a experimentar ataques de pánico cuando los dueños salen de sus casas . '
                        },
                        subtype: '1',
                        website_url:
                            '/lifestyle/ansiedad-por-separacion-como-evitar-que-los-perros-sufran-cuando-vuelvan-a-quedarse-solos-nid24042020/'
                    }
                ],
                layout: 'opinion4',
                notesQuantity: 4,
                position: '01',
                positionInsideSection: '01',
                sectionName: 'politica',
                handleClick: productClickFromClient
            };

            const { container } = render(<CajaTema {...propsOpinion} />);
            expect(container).toBeTruthy();

            const layout = container.querySelector(
                '[data-diagramacion-id="opinion4"]'
            );

            expect(layout).toBeDefined();

            const articlesOpinion = container.querySelectorAll('.mod-article');
            expect(articlesOpinion.length).toBe(4);

            fireEvent.click(articlesOpinion[3]);
            expect(window.dataLayer.length).toBe(6);
            expect(window.dataLayer[5].event).toBe('productClickScore');

            fireEvent.click(articlesOpinion[0]);
            expect(window.dataLayer.length).toBe(7);
            expect(window.dataLayer[6].event).toBe('productClickScore');
            expect(window.dataLayer[6].item.item_category).toBe('N/A');
        });

        it('when clicks in article with layout EDITORIALES should save in dataLayer data attr from article', () => {
            const articlesEditorial = [articles[0], articles[1]];
            const propsOpinion = {
                title: 'Titulo de Nota',
                articles: articlesEditorial,
                layout: 'editoriales2',
                notesQuantity: 2,
                position: '01',
                positionInsideSection: '01',
                sectionName: 'editorial',
                url: 'lanacion.com',
                handleClick: productClickFromClient
            };

            const { container } = render(<CajaTema {...propsOpinion} />);

            expect(container).toBeTruthy();

            const layout = container.querySelector(
                '[data-diagramacion-id="editoriales2"]'
            );

            expect(layout).toBeDefined();

            const _articlesOpinion = container.querySelectorAll('.mod-article');

            expect(_articlesOpinion.length).toBe(2);

            fireEvent.click(_articlesOpinion[1]);
            expect(window.dataLayer.length).toBe(8);
            expect(window.dataLayer[7].event).toBe('productClickScore');
            expect(window.dataLayer[6].item.item_category).toBe('N/A');
        });

        it('It should increase the index of the items', () => {
            const items = [
                {
                    item_id: 'ILXGTYXUWNF3HKJ3ROQQCQPRVE',
                    index: 1
                },
                {
                    item_id: 'BBU3ZCWFBRALRO4FZAHJ5XGW74',
                    index: 1
                },
                {
                    item_id: 'ILXGTYXUWNF3HKJ3ROQQCQPRVE',
                    index: 1
                }
            ];

            const newItems = [
                {
                    item_id: 'ILXGTYXUWNF3HKJ3ROQQCQPRVE',
                    index: 1
                },
                {
                    item_id: 'BBU3ZCWFBRALRO4FZAHJ5XGW74',
                    index: 2
                },
                {
                    item_id: 'ILXGTYXUWNF3HKJ3ROQQCQPRVE',
                    index: 3
                }
            ];

            expect(updateIndexOfItems(items)).toEqual(newItems);
            expect(updateIndexOfItems(undefined)).toEqual([]);
            expect(updateIndexOfItems([])).toEqual([]);
        });

        it('getDataSetProps should return excSuscriptor_[diagramacionId] for product.brand and item.item_brand when subscriptor = true', () => {
            const element = {
                dataset: {},
                closest: () => {
                    return {
                        dataset: {
                            blockName: 'h_tema-10',
                            chainPosition: '10',
                            diagramacionId: 'bn_2_1_2_grid',
                            section: 'breaking1',
                            isSubscriptor: true
                        }
                    };
                },
                querySelectorAll: jest.fn()
            };

            const result = getDataSetProps(element);

            expect(result.product.brand).toEqual('excSuscriptor_bn_2_1_2_grid');
            expect(result.item.item_brand).toEqual(
                'excSuscriptor_bn_2_1_2_grid'
            );
        });

        it('getDataSetProps should return an specific object when diagramationId is enVivo', () => {
            const element = {
                dataset: {
                    pos: '9703',
                    id: '2CKE7WFVBNHR7C4ZPD2W2M4O2I',
                    notaid: '2CKE7WFVBNHR7C4ZPD2W2M4O2I',
                    source: 'editor'
                },
                closest: () => {
                    return {
                        dataset: {
                            blockName: 'h_enVivo',
                            diagramacionId: 'enVivo',
                            isBlock: 'true',
                            chainPosition: '01',
                            chainId: 'f0fg9n1PSOm71Ue',
                            mrfRecirculation: 'h_enVivo',
                            section: 'apertura'
                        }
                    };
                },
                querySelectorAll: jest.fn(() => [
                    {
                        innerText: 'mock title'
                    }
                ])
            };

            const result = getDataSetProps(element);

            expect(result.product).toMatchObject({
                position: 'lv9703',
                id: '2CKE7WFVBNHR7C4ZPD2W2M4O2I',
                variant: 'editor',
                brand: 'apertura_enVivo',
                list: 'h_enVivo',
                name: 'mock title'
            });

            expect(result.item).toMatchObject({
                item_list_id: 'lv9703',
                item_id: '2CKE7WFVBNHR7C4ZPD2W2M4O2I',
                item_variant: 'editor',
                item_brand: 'apertura_enVivo',
                item_list_name: 'h_enVivo',
                item_name: 'mock title',
                item_category: 'enVivo',
                price: 1,
                quantity: 1
            });
        });
    });

    describe('find position in renderables', () => {
        it('Deberia encontrar la posicion de una chain en una seccion de PB', () => {
            expect(
                findPositionInsideSection('c0fHtl7v5ebsyz', renderables1)
            ).toBe('01');
            expect(
                findPositionInsideSection('c0fBGa0V5ebsvH', renderables1)
            ).toBe('02');
            expect(
                findPositionInsideSection('c0fBGa0V5ebs', renderables1)
            ).toBe('00');
            expect(findPositionInsideSection(undefined, undefined)).toBe('00');
        });
    });
});

describe('IntersectionObserver', () => {
    beforeAll(() => {
        window.dataLayer = [];
    });

    beforeEach(() => {
        jest.spyOn(window.sessionStorage.__proto__, 'getItem');
        jest.spyOn(window.sessionStorage.__proto__, 'setItem');
    });

    afterEach(() => {
        sessionStorage.getItem.mockRestore();
        sessionStorage.setItem.mockRestore();
    });

    it('should observe elements, call the callback, and unobserve', () => {
        const h2DOM = document.createElement('h2');
        h2DOM.innerText = 'Nota de Prueba';

        const article = document.createElement('article');
        article.dataset.pos = '0203';
        article.dataset.id = '2R6O5TWUGJDYJAVGNHXCD5OZTQ';
        article.dataset.source = 'editor';
        article.dataset.notaid = '2R6O5TWUGJDYJAVGNHXCD5OZTQ';
        article.appendChild(h2DOM);

        const section = document.createElement('section');
        section.dataset.blockName = 'h_opinion';
        section.setAttribute('data-block-name', 'h_opinion');
        section.setAttribute('data-is-block', 'true');
        section.appendChild(article);

        const mockedEntries = [
            {
                isIntersecting: true,
                target: article
            }
        ];
        const mockedArticle = [article];

        const observe = jest.fn();
        const unobserve = jest.fn();
        const takeRecords = jest.fn(() => mockedEntries);

        window.IntersectionObserver = jest.fn(() => ({
            observe,
            unobserve,
            takeRecords
        }));

        jest.spyOn(document, 'querySelectorAll').mockReturnValueOnce(
            mockedArticle
        );

        const observer = createIntersectionObserver();
        expect(observe).toBeCalledTimes(1);

        const [callback] = window.IntersectionObserver.mock.calls[0];
        callback(mockedEntries, observer);
        expect(unobserve).toBeCalledTimes(1);

        expect(window.sessionStorage.getItem).toHaveBeenCalledTimes(1);
        expect(window.sessionStorage.setItem).toHaveBeenCalledTimes(1);
        expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
            'seenArticlesScore',
            '[{"id":"2R6O5TWUGJDYJAVGNHXCD5OZTQ","name":"Nota de Prueba","list":"h_opinion"}]'
        );

        // Call again with the same article that has already been registered
        callback(mockedEntries, observer);
        expect(unobserve).toBeCalledTimes(1);
        expect(window.sessionStorage.getItem).toHaveBeenCalledTimes(2);
        expect(window.sessionStorage.setItem).toHaveBeenCalledTimes(1);

        // Call with a new article
        const h2DOM2 = document.createElement('h2');
        h2DOM2.innerText = 'Nota de Prueba 2';

        const article2 = document.createElement('article');
        article2.dataset.pos = '0401';
        article2.dataset.id = 'AAAAAAAAAAAAAAAAAaa';
        article2.dataset.source = 'editor';
        article2.dataset.notaid = 'AAAAAAAAAAAAAAAAAaa';
        article2.appendChild(h2DOM2);

        const mockedEntries2 = [
            {
                isIntersecting: true,
                target: article2
            }
        ];

        callback(mockedEntries2, observer);
        expect(unobserve).toBeCalledTimes(2);
        expect(window.sessionStorage.getItem).toHaveBeenCalledTimes(3);
        expect(window.sessionStorage.setItem).toHaveBeenCalledTimes(2);
        expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
            'seenArticlesScore',
            '[{"id":"2R6O5TWUGJDYJAVGNHXCD5OZTQ","name":"Nota de Prueba","list":"h_opinion"},{"id":"AAAAAAAAAAAAAAAAAaa","name":"Nota de Prueba 2","list":""}]'
        );

        // Test adding with a different list
        const h2DOM3 = document.createElement('h2');
        h2DOM3.innerText = 'Nota de Prueba 3';

        const article3 = document.createElement('article');
        article3.dataset.pos = '0204';
        article3.dataset.id = '2R6O5TWUGJDYJAVGNHXCD5OZTQ';
        article3.dataset.source = 'editor';
        article3.dataset.notaid = '2R6O5TWUGJDYJAVGNHXCD5OZTQ';
        article3.appendChild(h2DOM);

        const section2 = document.createElement('section');
        section2.dataset.blockName = 'h_otro';
        section2.setAttribute('data-block-name', 'h_otro');
        section2.setAttribute('data-is-block', 'true');
        section2.appendChild(article3);

        const mockedEntries3 = [
            {
                isIntersecting: true,
                target: article3
            }
        ];

        callback(mockedEntries3, observer);
        expect(unobserve).toBeCalledTimes(3);
        expect(window.sessionStorage.getItem).toHaveBeenCalledTimes(4);
        expect(window.sessionStorage.setItem).toHaveBeenCalledTimes(3);
        expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
            'seenArticlesScore',
            '[{"id":"2R6O5TWUGJDYJAVGNHXCD5OZTQ","name":"Nota de Prueba","list":"h_opinion"},{"id":"AAAAAAAAAAAAAAAAAaa","name":"Nota de Prueba 2","list":""},{"id":"2R6O5TWUGJDYJAVGNHXCD5OZTQ","name":"Nota de Prueba","list":"h_otro"}]'
        );
    });
});

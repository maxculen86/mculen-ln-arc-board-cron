import React from 'react';
import { mount, render, shallow } from 'enzyme';
import { productClickFromClient } from '../../../../components/private/common/utils/viewability';
import CajaTema from '../../../../components/private/LN/common/cajaTema';
import Consumer from 'fusion:consumer';
import ModArticle from '../../../../components/private/common/mod-article';
import Article from '../../../../components/private/common/mod-article';
import ArticleAcum from '../../../../components/private/LN/acumulado/articleAcum';
import BombaFeature from '../../../../components/features/LN-common/bomba/default';
import articles from '../../../../__mocks__/data/articles/articles.json';
import { useContent } from 'fusion:content';

jest.mock('fusion:consumer', component => {
    return function(component) {
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
    }
}));

jest.mock('fusion:static', () => 'mock-static');

// jest.mock(
//     '../../../../components/private/common/mod-article',
//     () => 'mock-mod-article'
// );

// jest.mock(
//     '../../../../components/private/LN/common/cajaTema',
//     () => 'mock-caja-tema'
// );

// jest.mock(
//     '../../../../components/private/LN/acumulado/articleAcum',
//     () => 'mock-article-acum'
// );

import Context from 'fusion:context';

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
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.clearAllTimers();
    });

    describe('Evento productClick del script viewability', () => {
        Context.useAppContext = jest.fn(() => ({
            outputType: 'default',
            arcSite: 'la-nacion-ar'
        }));

        it('Cuando se hace click en un articulo con layout grilla debe guardar en dataLayer datos attr del articulo', () => {
            const props = {
                title: 'Titulo de Nota',
                articles,
                layout: 'grilla3',
                notesQuantity: 3,
                position: '01',
                sectionName: 'propiedades',
                handleClick: productClickFromClient
            };

            const seccion1 = mount(<CajaTema {...props} />);
            //const componentMod = shallow(<ModArticle {...props} />);
            expect(seccion1).toBeTruthy();
            expect(seccion1.length).toBe(1);
            expect(seccion1.props()).toEqual(props);
            expect(seccion1.props().layout).toBe('grilla3');
            expect(seccion1.containsMatchingElement(ArticleAcum)).toEqual(true);
            expect(seccion1.containsMatchingElement(ModArticle)).toEqual(true);

            const arts = seccion1.find(ModArticle);
            expect(arts.length).toBe(3);
            expect(arts.first().props().titleText).toBe(
                'Prueba Newsletter de propiedades'
            );
            expect(window.dataLayer.length).toBe(0);

            arts.first().simulate('click');
            expect(window.dataLayer.length).toBe(1);
            expect(window.dataLayer[0].event).toBe('productClickLocal');
            expect(window.dataLayer[0].product).toBeTruthy();
            expect(window.dataLayer[0].product.position).toBe('0101');
            expect(window.dataLayer[0].product.id).toBe(
                'K2FFK3J6DNCX3D76BQ6D7FLQNE'
            );
            expect(window.dataLayer[0].product.variant).toBe('editor');
            expect(window.dataLayer[0].product.brand).toBe('grilla3');
            expect(window.dataLayer[0].product.list).toBe(
                'h_propiedadestema-01'
            );
            expect(window.dataLayer[0].product.name).toBe('');

            arts.last().simulate('click');
            expect(window.dataLayer.length).toBe(2);
            expect(window.dataLayer[1].event).toBe('productClickLocal');
            expect(window.dataLayer[1].product).toBeTruthy();
            expect(window.dataLayer[1].product.position).toBe('0103');
            expect(window.dataLayer[1].product.id).toBe(
                'KEBYELHATJHPRNAWO24GRV6YCQ'
            );
            expect(window.dataLayer[1].product.variant).toBe('editor');
            expect(window.dataLayer[1].product.brand).toBe('grilla3');
            expect(window.dataLayer[1].product.list).toBe(
                'h_propiedadestema-01'
            );
            expect(window.dataLayer[1].product.name).toBe('');

            const propsSeccionCampo = {
                title: 'Seccion Campo',
                articles,
                layout: 'grilla6',
                notesQuantity: 3,
                position: '02',
                sectionName: 'campo',
                handleClick: productClickFromClient
            };

            const seccion2 = mount(<CajaTema {...propsSeccionCampo} />);

            const artsSeccion2 = seccion2.find(ModArticle);

            artsSeccion2.first().simulate('click');
            expect(window.dataLayer.length).toBe(3);
            expect(window.dataLayer[2].event).toBe('productClickLocal');
            expect(window.dataLayer[2].product).toBeTruthy();
            expect(window.dataLayer[2].product.position).toBe('0201');
            expect(window.dataLayer[2].product.id).toBe(
                'K2FFK3J6DNCX3D76BQ6D7FLQNE'
            );
            expect(window.dataLayer[2].product.variant).toBe('editor');
            expect(window.dataLayer[2].product.brand).toBe('grilla6');
            expect(window.dataLayer[2].product.list).toBe('h_campotema-02');
            expect(window.dataLayer[2].product.name).toBe('');

            artsSeccion2.last().simulate('click');
            expect(window.dataLayer.length).toBe(4);
            expect(window.dataLayer[3].event).toBe('productClickLocal');
            expect(window.dataLayer[3].product).toBeTruthy();
            expect(window.dataLayer[3].product.position).toBe('0203');
            expect(window.dataLayer[3].product.id).toBe(
                'KEBYELHATJHPRNAWO24GRV6YCQ'
            );
            expect(window.dataLayer[3].product.variant).toBe('editor');
            expect(window.dataLayer[3].product.brand).toBe('grilla6');
            expect(window.dataLayer[3].product.list).toBe('h_campotema-02');
            expect(window.dataLayer[3].product.name).toBe('');

            expect(seccion1).toMatchSnapshot();
            /*
            (layout.includes('opinion4') && 'Opinion') ||
            (layout.includes('editoriales2') && 'Editoriales') ||
            (layout.includes('focal') && 'Focal') ||
            */
        });

        it('Cuando se hace click en un articulo con layout focalRight debe guardar en dataLayer datos attr del articulo', () => {
            const propsFocalRight = {
                title: 'Titulo de Nota',
                articles,
                layout: 'focalRight2',
                notesQuantity: 2,
                position: '01',
                sectionName: 'economia',
                handleClick: productClickFromClient
            };

            const seccionFocalRight = mount(<CajaTema {...propsFocalRight} />);
            //const componentMod = shallow(<ModArticle {...props} />);
            expect(seccionFocalRight).toBeTruthy();
            expect(seccionFocalRight.props()).toEqual(propsFocalRight);
            expect(seccionFocalRight.props().layout).toBe('focalRight2');
            const artsFocalRight = seccionFocalRight.find(ModArticle);
            expect(artsFocalRight.length).toBe(2);
            artsFocalRight.last().simulate('click');
            expect(window.dataLayer.length).toBe(5);
            expect(window.dataLayer[4].event).toBe('productClickLocal');
            expect(window.dataLayer[4].product.position).toBe('0102');
            expect(window.dataLayer[4].product.id).toBe(
                'AQCXKYK4XJCVFNFNZ2IQ7SUCA4'
            );
            expect(window.dataLayer[4].product.variant).toBe('editor');
            expect(window.dataLayer[4].product.brand).toBe('focalRight2');
            expect(window.dataLayer[4].product.list).toBe('h_economiatema-01');
            expect(window.dataLayer[4].product.name).toBe('');
        });

        it('Cuando se hace click en un articulo con layout OPINION debe guardar en dataLayer datos attr del articulo', () => {
            const propsOpinion = {
                title: 'Titulo de Nota',
                articles: [
                    ...articles,
                    {
                        _id: 'KEBOPEQGFASKHASFSFAFSF',
                        display_date: '2020-04-24T16:10:43.235Z',
                        headlines: {
                            basic:
                                'Ansiedad por separación: cómo evitar que los perros sufran cuando vuelvan a quedarse solos',
                            mobile: ''
                        },
                        promo_items: {
                            basic: {
                                height: 513,
                                type: 'image',
                                url:
                                    'https://resizer.glanacion.com/resizer/pyiWe6lOY0IToc9Qn7DqM0fOY84=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/HWSYUPWYQ5DKDON4ZV74I6MWZU.jpg',
                                width: 768
                            }
                        },
                        publish_date: '2021-01-07T12:56:01.989Z',
                        subheadlines: {
                            basic:
                                'A los perros no les gusta estar solos . Tanto es así que incluso pueden llegar a experimentar ataques de pánico cuando los dueños salen de sus casas . '
                        },
                        subtype: '1',
                        website_url:
                            '/lifestyle/ansiedad-por-separacion-como-evitar-que-los-perros-sufran-cuando-vuelvan-a-quedarse-solos-nid24042020/'
                    }
                ],
                layout: 'opinion4',
                notesQuantity: 4,
                position: '01',
                sectionName: 'politica',
                handleClick: productClickFromClient
            };

            const seccionOpinion = mount(<CajaTema {...propsOpinion} />);
            //const componentMod = shallow(<ModArticle {...props} />);
            expect(seccionOpinion).toBeTruthy();
            expect(seccionOpinion.props()).toEqual(propsOpinion);
            expect(seccionOpinion.props().layout).toBe('opinion4');
            const artsOpinion = seccionOpinion.find(Article);
            expect(artsOpinion.length).toBe(4);
            artsOpinion.last().simulate('click');
            expect(window.dataLayer.length).toBe(6);
            expect(window.dataLayer[5].event).toBe('productClickLocal');
            expect(window.dataLayer[5].product.position).toBe('9804');
            expect(window.dataLayer[5].product.id).toBe(
                'KEBOPEQGFASKHASFSFAFSF'
            );
            expect(window.dataLayer[5].product.variant).toBe('editor');
            expect(window.dataLayer[5].product.brand).toBe('0');
            expect(window.dataLayer[5].product.list).toBe('h_opinion');
            expect(window.dataLayer[5].product.name).toBe('');

            artsOpinion.first().simulate('click');
            expect(window.dataLayer.length).toBe(7);
            expect(window.dataLayer[6].event).toBe('productClickLocal');
            expect(window.dataLayer[6].product.position).toBe('9801');
            expect(window.dataLayer[6].product.id).toBe(
                'K2FFK3J6DNCX3D76BQ6D7FLQNE'
            );
            expect(window.dataLayer[6].product.variant).toBe('editor');
            expect(window.dataLayer[6].product.brand).toBe('0');
            expect(window.dataLayer[6].product.list).toBe('h_opinion');
            expect(window.dataLayer[6].product.name).toBe('');
        });

        it('Cuando se hace click en un articulo con layout EDITORIALES debe guardar en dataLayer datos attr del articulo', () => {
            const articlesEditorial = [articles[0], articles[1]];
            const propsOpinion = {
                title: 'Titulo de Nota',
                articles: articlesEditorial,
                layout: 'editoriales2',
                notesQuantity: 2,
                position: '01',
                sectionName: 'editorial',
                handleClick: productClickFromClient
            };

            const seccionOpinion = mount(<CajaTema {...propsOpinion} />);
            //const componentMod = shallow(<ModArticle {...props} />);
            expect(seccionOpinion).toBeTruthy();
            expect(seccionOpinion.props()).toEqual(propsOpinion);
            expect(seccionOpinion.props().layout).toBe('editoriales2');
            const artsOpinion = seccionOpinion.find('article');
            expect(artsOpinion.length).toBe(2);
            artsOpinion.last().simulate('click');
            expect(window.dataLayer.length).toBe(8);
            expect(window.dataLayer[7].event).toBe('productClickLocal');
            expect(window.dataLayer[7].product.position).toBe('9902');
            expect(window.dataLayer[7].product.id).toBe(
                'AQCXKYK4XJCVFNFNZ2IQ7SUCA4'
            );
            expect(window.dataLayer[7].product.variant).toBe('editor');
            expect(window.dataLayer[7].product.brand).toBe('0');
            expect(window.dataLayer[7].product.list).toBe('h_editoriales');
            expect(window.dataLayer[7].product.name).toBe('');
        });

        it('Cuando se hace click en una bomba debe guardar en dataLayer datos attr del articulo', () => {
            useContent.mockImplementation(() => articles[0]);
            const articlesBomba = [articles[0]];
            const propsBomba = {
                // articles: articlesBomba,
                // notesQuantity: 2,
                // position: '01',
                customFields: {
                    title: 'Titulo de Nota',
                    noteId: 'K2FFK3J6DNCX3D76BQ6D7FLQNE'
                },
                sectionName: 'bomba',
                handleClick: productClickFromClient
            };

            const seccionBomba = mount(<BombaFeature {...propsBomba} />);
            //const componentMod = shallow(<ModArticle {...props} />);
            expect(seccionBomba).toBeTruthy();
            expect(seccionBomba.props()).toEqual(propsBomba);
            // expect(seccionBomba.props().layout).toBe('h_00');
            const artBomba = seccionBomba.find(ModArticle);
            expect(artBomba.length).toBe(1);
            artBomba.first().simulate('click');
            expect(window.dataLayer.length).toBe(9);
            expect(window.dataLayer[8].event).toBe('productClickLocal');
            expect(window.dataLayer[8].product.position).toBe('0001');
            expect(window.dataLayer[8].product.id).toBe(
                'K2FFK3J6DNCX3D76BQ6D7FLQNE'
            );
            expect(window.dataLayer[8].product.variant).toBe('editor');
            expect(window.dataLayer[8].product.brand).toBe('h_00');
            expect(window.dataLayer[8].product.list).toBe('h_tema-01');
            expect(window.dataLayer[8].product.name).toBe('');
        });
    });

    // describe('when subscritor is not present', () => {
    //     it('Does not reload when videos are present', () => {
    //         const props = {
    //             arcSite: 'la-nacion-ar',
    //             globalContent: {
    //                 type: 'story',
    //                 content_elements: [
    //                     {
    //                         type: 'video'
    //                     }
    //                 ]
    //             },
    //             screenUtils: {
    //                 device: 'desktop'
    //             }
    //         };

    //         mount(<Component {...props} />);
    //         jest.advanceTimersByTime(40000);
    //         expect(window.location.reload).not.toBeCalled();
    //     });

    //     it('Does not reload when spotify audio is present', () => {
    //         const props = {
    //             arcSite: 'la-nacion-ar',
    //             globalContent: {
    //                 type: 'story',
    //                 content_elements: [
    //                     {
    //                         subtype: 'spotify',
    //                         type: 'raw_html'
    //                     }
    //                 ]
    //             },
    //             screenUtils: {
    //                 device: 'desktop'
    //             }
    //         };

    //         mount(<Component {...props} />);
    //         jest.advanceTimersByTime(40000);
    //         expect(window.location.reload).not.toBeCalled();
    //     });

    //     it('Does not reload when any element of the content elements is type oembed_response', () => {
    //         const props = {
    //             arcSite: 'la-nacion-ar',
    //             globalContent: {
    //                 type: 'story',
    //                 content_elements: [
    //                     {
    //                         subtype: 'instagram',
    //                         type: 'oembed_response'
    //                     }
    //                 ]
    //             },
    //             screenUtils: {
    //                 device: 'desktop'
    //             }
    //         };

    //         mount(<Component {...props} />);
    //         jest.advanceTimersByTime(40000);
    //         expect(window.location.reload).not.toBeCalled();
    //     });

    //     it('Does not reload on accelerated mobile pages', () => {
    //         const props = {
    //             arcSite: 'la-nacion-ar',
    //             globalContent: {
    //                 type: 'story',
    //                 content_elements: []
    //             },
    //             outputType: 'amp',
    //             screenUtils: {
    //                 device: 'desktop'
    //             }
    //         };

    //         mount(<Component {...props} />);
    //         jest.advanceTimersByTime(40000);
    //         expect(window.location.reload).not.toBeCalled();
    //     });

    //     it('Reload when required conditions are met', () => {
    //         const props = {
    //             arcSite: 'la-nacion-ar',
    //             globalContent: {
    //                 type: 'story',
    //                 content_elements: [{ type: 'text' }],
    //                 promo_items: {
    //                     basic: {}
    //                 }
    //             },
    //             screenUtils: {
    //                 device: 'desktop'
    //             }
    //         };

    //         mount(<Component {...props} />);
    //         jest.advanceTimersByTime(1000);
    //         expect(window.location.reload).not.toBeCalled();
    //         jest.advanceTimersByTime(30000);
    //         expect(window.location.reload).toHaveBeenCalledTimes(1);
    //     });
    // });
});

/*

            //jest.advanceTimersByTime(40000);
            // const dom = render(
            //     `<section 
            //     data-block-name="h_tema-01" 
            //     data-diagramacion-id="focalLeft3" 
            //     data-is-block="true" 
            //     id="tema_01" 
            //     class="box-articles  --focal --left --apertura"
            // >
            //     <div class="row ">
            //         <div class="col-tablet-8">
            //             <article 
            //                 id="D4T4N2GAO5FABOWANPT33E6CXI"
            //                 class="mod-article toi0101 nidD4T4N2GAO5FABOWANPT33E6CXI" 
            //                 data-pos="0101" 
            //                 data-id="D4T4N2GAO5FABOWANPT33E6CXI" 
            //                 data-notaid="D4T4N2GAO5FABOWANPT33E6CXI" 
            //                 data-source="editor" 
            //                 onclick=""
            //             />
            //         </div>
            //     </div>
            // </section>`
            // );
            // document.body.innerHTML =
            // `<section 
            //     data-block-name="h_tema-01" 
            //     data-diagramacion-id="focalLeft3" 
            //     data-is-block="true" 
            //     id="tema_01" 
            //     class="box-articles  --focal --left --apertura"
            // >
            //     <div class="row ">
            //         <div class="col-tablet-8">
            //             <article 
            //                 id="D4T4N2GAO5FABOWANPT33E6CXI"
            //                 class="mod-article toi0101 nidD4T4N2GAO5FABOWANPT33E6CXI" 
            //                 data-pos="0101" 
            //                 data-id="D4T4N2GAO5FABOWANPT33E6CXI" 
            //                 data-notaid="D4T4N2GAO5FABOWANPT33E6CXI" 
            //                 data-source="editor" 
            //                 onclick=""
            //             />
            //         </div>
            //     </div>
            // </section>`;
            // const domElement = {
            //     currentTarget: (
            //         <section data-block-name="h_tema-01" data-diagramacion-id="focalLeft3" data-is-block="true" id="tema_01" class="box-articles  --focal --left --apertura">
            //             <div class="row ">
            //                 <div class="col-tablet-8">
            //                     <article class="mod-article toi0101 nidD4T4N2GAO5FABOWANPT33E6CXI" data-pos="0101" data-id="D4T4N2GAO5FABOWANPT33E6CXI" data-notaid="D4T4N2GAO5FABOWANPT33E6CXI" data-source="editor">
            //                         <div class="content-media"></div>
            //                     </article>
            //                 </div>
            //             </div>
            //         </section>
            //     )
            // };

*/

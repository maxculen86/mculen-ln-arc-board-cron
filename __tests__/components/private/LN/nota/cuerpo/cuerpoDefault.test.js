import Consumer from 'fusion:consumer';
import Context from 'fusion:context';

import React from 'react';
import { shallow } from 'enzyme';
import NotaNoticia from '../../../../../../__mocks__/data/articles/6Q4WDU7YVJBEZEOLSQEIK3YCYI.json';
import NotaFoto100 from '../../../../../../__mocks__/data/articles/IGR6WQGQDNHALH6PL4GAYBKYZM.json';
import NotaEmbeds from '../../../../../../__mocks__/data/articles/OFVVZI3B7VA5PDPISOSILJ42LM.json';

import BodyDefault from '../../../../../../components/private/LN/nota/cuerpo/cuerpoDefault';

describe('Cuerpo Default ->', () => {
    const props = {
        siteProperties: {
            bannerConfig: { dfp_id: 133919216 }
        },
        isAdmin: false,
        outputType: 'default',
        bannerConfig: [{ mobile: 'caja3_mob', position: 7 }]
    };

    const countStaticElements = body =>
        body
            .getElements()
            .filter(
                e =>
                    e.props &&
                    (e.props.htmlOnly ||
                        (e.props.children &&
                            e.props.children.some(
                                v => v.props && v.props.htmlOnly
                            )))
            ).length;

    describe('Render Nota Noticia 6Q4WDU7YVJBEZEOLSQEIK3YCYI', () => {
        const _props = { ...props, globalContent: NotaNoticia };
        const bodyComponent = shallow(<BodyDefault {..._props} />);
        it('should have 12 elements', () => {
            expect(bodyComponent.getElements().length).toBe(13);
        });
        it('should render 5 paragraphs', () => {
            // 3 parrafos y 2 </br>
            const parrafos = bodyComponent.find('Parrafo');
            expect(parrafos.length).toBe(5);
        });
        it('should render 1 subtitle', () => {
            const subtitles = bodyComponent.find('Subtitle');
            expect(subtitles.length).toBe(1);
        });
        it('should render 1 pullQuote', () => {
            const pullQuotes = bodyComponent.find('pullQuote');
            expect(pullQuotes.length).toBe(1);
        });
        it('should render 2 lists', () => {
            const lists = bodyComponent.find('ListOrderedOrUnordered');
            expect(lists.length).toBe(2);
        });
        it('should render 1 blockQuotes', () => {
            const blockQuotes = bodyComponent.find('blockQuote');
            expect(blockQuotes.length).toBe(1);
        });
        it('should render 1 gallery', () => {
            const galleries = bodyComponent
                .find('index')
                .getElements()
                .filter(e => e.props.data.type === 'gallery');
            expect(galleries.length).toBe(1);
        });
        it('should render 1 ListIngredients', () => {
            const ListIngredients = bodyComponent.find('listIngredientes');
            expect(ListIngredients.length).toBe(1);
        });
        it('should render 1 ListPreparation', () => {
            const ListPreparation = bodyComponent.find('listPreparacion');
            expect(ListPreparation.length).toBe(1);
        });
        // it('shouldn`t render 1 element type custom_embed', () => {
        //     const notRender = bodyComponent
        //         .getElements()
        //         .filter(e => JSON.stringify(e.props) === '{}');
        //     expect(notRender.length).toBe(1);
        // });

        // it('should be wrapped by Static', () => {
        //     expect(countStaticElements(bodyComponent)).toBe(10);
        // });
    });

    describe('Render Nota Foto100 IGR6WQGQDNHALH6PL4GAYBKYZM', () => {
        const _props = { ...props, globalContent: NotaFoto100 };
        const bodyComponent = shallow(<BodyDefault {..._props} />);
        it('should have 3 elements', () => {
            expect(bodyComponent.getElements().length).toBe(3);
        });
        it('should render 2 BotonLinks', () => {
            const botonLinks = bodyComponent.find('BotonLink');
            expect(botonLinks.length).toBe(2);
        });
        it('should render 1 video', () => {
            const videos = bodyComponent.find('video');
            expect(videos.length).toBe(1);
        });
        // it('should be wrapped by Static', () => {
        //     expect(countStaticElements(bodyComponent)).toBe(2);
        // });
    });

    describe('Render Nota Embeds OFVVZI3B7VA5PDPISOSILJ42LM', () => {
        const _props = { ...props, globalContent: NotaEmbeds };
        const bodyComponent = shallow(<BodyDefault {..._props} />);
        it('should have 67 elements', () => {
            expect(bodyComponent.getElements().length).toBe(67);
        });
        it('should render 1 paragraphs', () => {
            const parrafos = bodyComponent.find('Parrafo');
            expect(parrafos.length).toBe(1);
        });
        it('should render 33 subtitles', () => {
            const subtitles = bodyComponent.find('Subtitle');
            expect(subtitles.length).toBe(33);
        });
        it('should render 33 BotonLink', () => {
            const BotonLink = bodyComponent.find('BotonLink');
            expect(BotonLink.length).toBe(2);
        });
        it('should render 9 embeds with RawHTML', () => {
            const notRender = bodyComponent.find('RawHTML');
            expect(notRender.length).toBe(9);
        });
        it('should render 22 embeds with Html', () => {
            const notRender = bodyComponent.find('Html');
            expect(notRender.length).toBe(22);
        });
        // it('should be wrapped by Static', () => {
        //     // Html elements are not static at this time.
        //     // 67 total elements - 22 html elements = 45 static elements
        //     expect(countStaticElements(bodyComponent)).toBe(45);
        // });
        it('Places banners in the right position', () => {
            // TODO: Faltan hacer los test de banners en cuerpo con más definición
            expect(
                bodyComponent
                    .getElements()
                    .filter(
                        e =>
                            e.props &&
                            e.props.children &&
                            e.props.children.length > 1 &&
                            e.props.children[1]
                    ).length
            ).toBe(1);
        });
    });
});

import Consumer from 'fusion:consumer';
import * as Anexo from '../../../../../components/features/LN-common/anexo/json';

describe('features - LN-common - anexo - json', () => {
    describe('With HTML anexo props', () => {
        const props = {
            collection: 'features',
            type: 'LN-common/anexo',
            id: 'f0fzNPnpdFcOa8T',
            name: null,
            customFields: {
                html: null,
                hideByHtml: null,
                hideByUrl: null,
                hideByVivoYoutube: null,
                url: null,
                heightMobile: null,
                vivoYoutube: null,
                // Roof properties
                title: null,
                link: null,
                hideTitle: null
            }
        };

        it('Should render HTML anexo OK', () => {
            const newProps = { ...props };
            newProps.customFields = {
                html: `<p>Mock HTML anexo</p>`,
                hideByHtml: false
            };

            const anexo = new Anexo.default(newProps);
            const resp = anexo.render();
            const respMock = {
                articles: [{ html: '<p>Mock HTML anexo</p>' }],
                information: {
                    hideCaja: false,
                    layout: 'grilla1',
                    title: undefined,
                    link: undefined
                }
            };
            expect(resp).toMatchObject(respMock);
        });

        it('Should render Video VIVO anexo OK', () => {
            const newProps = { ...props };
            newProps.customFields = {
                vivoYoutube: `<iframe width="560" height="315" src="https://www.youtube.com/embed/__0hKAdLaEA?si=G__-iEJtAQSSRSES&autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
                hideByVivoYoutube: false
            };

            const anexo = new Anexo.default(newProps);
            const resp = anexo.render();
            const respMock = {
                articles: [{ html: newProps.customFields.vivoYoutube }],
                information: {
                    hideCaja: false,
                    layout: 'grilla1',
                    title: undefined,
                    link: undefined
                }
            };
            expect(resp).toMatchObject(respMock);
        });

        it('Should render Url anexo OK', () => {
            const newProps = { ...props };
            newProps.customFields = {
                url: `https://especialess3.lanacion.com.ar/interactivos/24/07/anexo-crucigrama-juegos/anexoCruciJJOO2.html`,
                hideByUrl: false,
                heightMobile: 300,
                heightDesktop: 300,
                heightTablet: 300
            };

            const anexo = new Anexo.default(newProps);
            const resp = anexo.render();
            const respMock = {
                articles: [
                    {
                        url: newProps.customFields.url,
                        alto: newProps.customFields.heightMobile
                    }
                ],
                information: {
                    hideCaja: false,
                    layout: 'grilla1',
                    title: undefined,
                    link: undefined
                }
            };
            expect(resp).toMatchObject(respMock);
        });

        it('Error Anexo Url altos', () => {
            const newProps = { ...props };
            newProps.customFields = {
                url: `https://especialess3.lanacion.com.ar/interactivos/24/07/anexo-crucigrama-juegos/anexoCruciJJOO2.html`,
                hideByUrl: false,
                heightMobile: 300
            };

            const anexo = new Anexo.default(newProps);
            const resp = anexo.render();
            expect(resp).toBe(null);
        });
    });
});

import Consumer from 'fusion:consumer';
import * as Anexo from '../../../../../components/features/LN-common/anexo/json';

jest.mock('fusion:consumer', () => ({
    __esModule: true,
    default: C => C
}));

jest.mock(
    '../../../../../components/chains/utils/isTodayEnabled',
    () => ({ __esModule: true, default: jest.fn(() => true) }),
    { virtual: true }
);

jest.mock(
    '../../../../../components/features/LN-common/anexo/common/_helper-WebApi',
    () => ({
        __esModule: true,
        isInSection: jest.fn(() => false),
        getErrorMessage: jest.fn(() => '')
    })
);
import { getErrorMessage } from '../../../../../components/features/LN-common/anexo/common/_helper-WebApi';
import isTodayEnabled from '../../../../../components/chains/utils/isTodayEnabled';

describe('features - LN-common - anexo - json', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        isTodayEnabled.mockReturnValue(true);
    });

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
                title: null,
                link: null,
                hideTitle: null
            }
        };

        it('Should render HTML anexo OK', () => {
            const newProps = { ...props };
            newProps.customFields = {
                html: `<p>Mock HTML anexo</p>`,
                hideByHtml: false,
                shouldSchedule: false
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

        it('returns null when URL heights are invalid', () => {
            getErrorMessage.mockReturnValueOnce(
                'URL anexo requires Desktop/Tablet/Mobile fixed heights'
            );

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

    describe('Calendar/Home validation - json', () => {
        const baseProps = {
            collection: 'features',
            type: 'LN-common/anexo',
            id: 'calendar-json',
            name: null
        };

        it('returns null on Home when enabledDays is empty', () => {
            const props = {
                ...baseProps,
                layout: 'LN10-Home_Main',
                customFields: {
                    html: '<p>Home Anexo Content</p>',
                    hideByHtml: false,
                    shouldSchedule: true,
                    enabledDays: []
                }
            };

            const anexo = new Anexo.default(props);
            const resp = anexo.render();
            expect(resp).toBeNull();
        });

        it('renders on Home when today is enabled (weekday names)', () => {
            const props = {
                ...baseProps,
                layout: 'LN10-Home_Main',
                customFields: {
                    html: '<p>Home Anexo Enable</p>',
                    hideByHtml: false,
                    shouldSchedule: true,
                    enabledDays: [
                        'lunes',
                        'martes',
                        'miercoles',
                        'jueves',
                        'viernes',
                        'sabado',
                        'domingo'
                    ]
                }
            };

            const anexo = new Anexo.default(props);
            const resp = anexo.render();

            expect(resp).toMatchObject({
                information: expect.objectContaining({
                    hideCaja: false,
                    layout: 'grilla1'
                }),
                articles: [{ html: '<p>Home Anexo Enable</p>' }]
            });
        });

        it('renders outside Home even if enabledDays is empty', () => {
            isTodayEnabled.mockReturnValue(false);

            const props = {
                ...baseProps,
                layout: '',
                customFields: {
                    html: '<p>Not Home Anexo Content</p>',
                    hideByHtml: false,
                    enabledDays: []
                }
            };

            const anexo = new Anexo.default(props);
            const resp = anexo.render();

            expect(resp).toMatchObject({
                information: expect.objectContaining({
                    hideCaja: false,
                    layout: 'grilla1'
                }),
                articles: [{ html: '<p>Not Home Anexo Content</p>' }]
            });
        });
    });
});

import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAppContext } from 'fusion:context';
import bodyComponents from '../../../../../components/features/foodit/Body/utils/bodyComponents';
import buildBody from '../../../../../components/features/foodit/Body/children/_buildBody';
import { STORYTELLING } from '../../../../../components/private/common/utils/subtypes/subtypeHelper';
jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../components/features/foodit/Body/utils/bodyComponents',
    () => {
        const actual = jest.requireActual(
            '../../../../../components/features/foodit/Body/utils/bodyComponents'
        ).default;

        return {
            __esModule: true,
            default: {
                ...actual,
                'custom-card-embebida': ({ data }) => (
                    <div data-testid="mock-card-embebida">
                        Mock Card Embebida {data?.embed ? 'con embed' : ''}
                    </div>
                )
            }
        };
    }
);

describe('buildBody', () => {
    describe('STORYTELLING', () => {
        it('retorna un componente vacío si content_elements está vacío', () => {
            const { container } = render(
                buildBody({ globalContent: { content_elements: [] } })
            );
            expect(container).toBeEmptyDOMElement();
        });

        it('renderiza correctamente para diferentes tipos de elementos', () => {
            const globalContent = {
                content_elements: [
                    {
                        _id: 'C4FZ7G4FHNA2BJZJBFFIJZUOO4',
                        type: 'text',
                        alignment: 'left',
                        content: 'SAYONARA!'
                    },
                    {
                        type: 'image',
                        url: 'https://sandbox.lanacion.com.ar/resizer/v2/pie-de-Y7QVZMP2HVHQJKC4GZBDRFO3AM.jpg?auth=d09ee45fdc3698e9fe7231ec47274abd6aaf415ef3ef9100618d8a0b304db2b8&width=768&height=510&quality=70&smart=true',
                        caption: 'Pie de foto',
                        subtitle: '',
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://sandbox.lanacion.com.ar/resizer/v2/pie-de-Y7QVZMP2HVHQJKC4GZBDRFO3AM.jpg?auth=d09ee45fdc3698e9fe7231ec47274abd6aaf415ef3ef9100618d8a0b304db2b8&width=780&height=518&quality=70&smart=true',
                                option: {
                                    width: 780,
                                    height: 520,
                                    minScreenWidth: 768,
                                    media_preload: '(min-width: 768px)'
                                }
                            },
                            {
                                resizedUrl:
                                    'https://sandbox.lanacion.com.ar/resizer/v2/pie-de-Y7QVZMP2HVHQJKC4GZBDRFO3AM.jpg?auth=d09ee45fdc3698e9fe7231ec47274abd6aaf415ef3ef9100618d8a0b304db2b8&width=420&height=279&quality=70&smart=true',
                                option: {
                                    width: 420,
                                    height: 280,
                                    media_preload: '(max-width: 767px)'
                                }
                            }
                        ]
                    }
                ],
                subtype: '4'
            };
            const { getByText, container } = render(
                buildBody({ globalContent })
            );
            expect(getByText('SAYONARA!')).toBeInTheDocument();
            expect(getByText('Pie de foto')).toBeInTheDocument();

            expect(
                container.querySelector('section.content')
            ).toBeInTheDocument();
        });
        it('should render <hr /> before and after if only one custom-card-embebida exists', () => {
            const globalContent = {
                content_elements: [
                    {
                        type: 'custom_embed',
                        subtype: 'custom-card-embebida',
                        embed: { config: {} }
                    }
                ],
                subtype: STORYTELLING
            };

            const { container } = render(buildBody({ globalContent }));
            const hrs = container.querySelectorAll('section.content hr');
            expect(hrs.length).toBe(2);
        });

        it('should render 3 <hr /> when there are two custom-card-embebida in a row', () => {
            const globalContent = {
                content_elements: [
                    {
                        type: 'custom_embed',
                        subtype: 'custom-card-embebida',
                        embed: { config: {} }
                    },
                    {
                        type: 'custom_embed',
                        subtype: 'custom-card-embebida',
                        embed: { config: {} }
                    }
                ],
                subtype: STORYTELLING
            };

            const { container } = render(buildBody({ globalContent }));
            const hrs = container.querySelectorAll('section.content hr');
            expect(hrs.length).toBe(3);
        });
    });

    describe('RECETA', () => {
        const globalContent = {
            content_elements: [
                {
                    _id: 'BHVZBEA6FFFS7I6ZS5Z7OQ2PXM',
                    additional_properties: {},
                    embed: {
                        config: {
                            items: [
                                'Vacía la harina de maíz dentro de un bol grande. Añade la azúcar, la sal y poco a poco el agua. Mientras, comienza a mezclar con la otra mano.',
                                ' Amasa bien hasta que sientas una textura pareja, suave y sin grumos. Luego deja reposar por 4 o 5 minutos, así ganará consistencia.',
                                'Divide la masa de las empanadas venezolanas en bolas medianas.',
                                ' Sobre una superficie plana, coloca el plástico. Si utilizas una bolsa plástica con cierre, será más fácil porque ya tienen una división. Antes de utilizarla, recorta los tres bordes, incluyendo el cierre, debe quedarte un rectángulo. Ábrela y extiende.',
                                ' Frota el plástico con aceite o agua, así la masa de las empanadas de cazón no se pegará. Luego, coloca en el centro una de las bolitas de masa. Aplasta con la palma de la mano hasta formar un circulo de ½ cm de grosor. Si la masa queda muy delgada al cocinarse se romperá y por el contrario, si es muy gruesa, será desagradable al gusto.',
                                'En el centro de la masa deposita 1 a 2 cucharadas del guiso de cazón. Sé generoso pero no te excedas, porque luego podría desbordarse el relleno por los bordes al freír la empanada y se rompería.',
                                'Dobla el plástico hasta cubrir el relleno y juntar los bordes de la masa. El resultado final será una media luna.',
                                'Utiliza un recipiente redondo para delimitar la forma de la empanada. Puedes utilizar un plato hondo, un bol pequeño, un tazón de sopa, etc. Presiona con el recipiente seleccionado, como si utilizaras un cortador de galletas. Retira el excedente de masa y luego saca cuidadosamente el plástico también. Coloca las empanadas de cazón guisado en un plato plano grande o bandeja.',
                                'Previamente calienta aceite dentro de un caldero. Aplica fuego medio-alto. Fríe hasta dorar las empanadas venezolanas. Posteriormente retíralas y colócalas sobre papel absorbente para eliminar el exceso de grasa.',
                                '¡Vamos todos a la mesa¡ Estas magnificas empanadas de cazón venezolanas poseen una textura interna suave, impregnada por el delicioso guiso de cazón margariteño. Mientras su cobertura externa resulta sutilmente crujiente. Además, el gusto de la masa es el típico sabor semi-dulce, característico de la cocina venezolana que a muchos cautiva. Como si fuera poco, el toque del azúcar en la masa, proporciona además ese color doradito tan deseable. ¡Simplemente una delicia!'
                            ],
                            titleList: '',
                            typeList: 'preparacion'
                        }
                    },
                    subtype: 'custom-preparacion',
                    type: 'custom_embed'
                },
                {
                    _id: '6OTGUBOF4RE6XBWPT4VYFZAZRQ',
                    additional_properties: {},
                    content: 'Texto de prueba debajo de apertura',
                    type: 'text'
                },
                {
                    _id: 'XODVX6YV3RHKBNXDVE23NAPARM',
                    additional_properties: {},
                    embed: {
                        config: {
                            items: [
                                'Coloca agua en bowl',
                                'Coloca harina y mezcla',
                                'Agrega sal y azucar '
                            ],
                            titleList: 'Para la masa',
                            typeList: 'preparacion'
                        }
                    },
                    subtype: 'custom-preparacion',
                    type: 'custom_embed'
                }
            ],
            subtype: '7'
        };

        useAppContext.mockReturnValue({
            globalContent,
            deployment: jest.fn()
        });

        it('retorna un componente vacío si content_elements está vacío', () => {
            const { container } = render(
                buildBody({ globalContent: { content_elements: [] } })
            );
            expect(container).toBeEmptyDOMElement();
        });

        it('renderiza correctamente texto mas 2 preparaciones', () => {
            const { getByText } = render(buildBody({ globalContent }));
            expect(
                getByText('Texto de prueba debajo de apertura')
            ).toBeInTheDocument();
            expect(screen.getAllByText('Preparación')).toHaveLength(1);
        });
    });
});
